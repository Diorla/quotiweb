import { useEffect, useState } from "react";
import firebase from "firebase/clientApp";
import Category from "interfaces/Category";

export default function useCategories(userId: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = () => {
    try {
      const db = firebase.firestore();
      const collectionRef = db
        .collection(`users/${userId}/categories`)
        .orderBy("name", "asc");
      collectionRef.onSnapshot((querySnapshot) => {
        const categoryList: Category[] = [];
        querySnapshot.forEach((doc: any) => {
          categoryList.push(doc.data());
        });
        setCategories(categoryList);
        setLoading(false);
      });
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) load();
    return () => {
      mounted = false;
    };
  }, []);
  return { categories, loading, error };
}

const db = firebase.firestore();
