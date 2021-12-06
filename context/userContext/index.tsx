import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-toastify";
import firebase from "firebase/clientApp";
import UserProps from "./UserProps";
import getUserProps from "./getUser";
import user from "./initialUser";

const initialState = {
  user,
  loading: true,
};

export const UserContext = createContext(initialState);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { user: UserProps } = initialState;
  const [user, setUser] = useState(UserProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        getUserProps(user.uid, (data) => {
          const userData = {
            ...data,
            uid: user.uid,
            email: data.email || user.email || "",
          };
          setUser(userData);
          setLoading(false);
        }).catch((err) => toast.error(err));
      } else {
        setUser(UserProps);
        setLoading(false);
      }
    });
    return () => unsubscriber();
  }, [UserProps]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): {
  user: UserProps;
  loading: boolean;
} =>
  useContext<{
    user: UserProps;
    loading: boolean;
  }>(UserContext);
