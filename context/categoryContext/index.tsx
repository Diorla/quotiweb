import React, { useState, useEffect, createContext, useContext } from "react";
import CategoriesProps from "./CategoriesProps";
import { useUser } from "context/userContext";
import getCategories from "./getCategories";
import Category from "interfaces/Category";

export const CategoriesContext = createContext<CategoriesProps>({
  loading: true,
  error: null,
  categoryList: [],
  categoryMap: {},
});

export default function CategoriesProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    user: { uid },
  } = useUser();
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    let mounted = true;
    if (mounted && uid)
      getCategories(uid, setCategoryList, setCategoryMap, setLoading, setError);
    return () => {
      mounted = false;
    };
  }, [uid]);

  return (
    <CategoriesContext.Provider
      value={{ categoryList, categoryMap, loading, error }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = (): CategoriesProps =>
  useContext<CategoriesProps>(CategoriesContext);
