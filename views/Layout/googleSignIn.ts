import firebase from "firebase/clientApp";
import { toast } from "react-toastify";

export default function googleSignIn() {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      toast.success(`${result.user?.displayName} signed in`);
    })
    .catch((err) => toast.error(err.message));
}
