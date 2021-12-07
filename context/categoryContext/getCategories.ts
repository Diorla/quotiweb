import firebase from "firebase/clientApp";
import Category from "interfaces/Category";

export default async function getCategories(
  userId: string,
  setCategoryList: (arg0: Category[]) => void,
  setCategoryMap: (arg: { [key: string]: Category }) => void,
  setLoading: (isLoading: boolean) => void,
  setError: (error: Error) => void
) {
  try {
    const db = firebase.firestore();
    const categoryMap: { [key: string]: Category } = {};
    const collectionRef = db
      .collection(`users/${userId}/categories`)
      .orderBy("name", "asc");
    collectionRef.onSnapshot((querySnapshot) => {
      const categoryList: Category[] = [];
      querySnapshot.forEach((doc: any) => {
        categoryList.push(doc.data());
      });
      categoryList.forEach((item) => {
        categoryMap[item.id] = item;
      });
      setCategoryList(categoryList);
      setCategoryMap(categoryMap);
      setLoading(false);
    });
  } catch (err) {
    setError(err as Error);
  }
}
