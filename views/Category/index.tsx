import { Masonry } from "@mui/lab";
import { Box, Button } from "@mui/material";
import ActivityCard from "components/ActivityCard";
import Confirm from "components/Confirm";
import { useUser } from "context/userContext";
import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";
import Category from "interfaces/Category";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryEdit from "./CategoryEdit";

export default function CategoryComp() {
  const {
    user: { uid },
  } = useUser();
  const {
    query: { slug },
  } = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    let mounted = true;
    if (slug)
      db.collection(`users/${uid}/categories`)
        .limit(1)
        .where("slug", "==", slug)
        .onSnapshot((querySnapshot) => {
          const categoryList: Category[] = [];
          querySnapshot.forEach((doc: any) => {
            categoryList.push(doc.data());
          });
          // setCategories(categoryList);
          if (mounted) {
            setCategory(categoryList[0]);
            setLoading(false);
          }
        });
    return () => {
      mounted = false;
    };
  }, [slug, uid]);

  useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    if (category?.id)
      db.collection(`users/${uid}/activities`)
        .orderBy("name", "asc")
        .where("category", "==", category.id)
        .onSnapshot((querySnapshot) => {
          const activityList: Activity[] = [];
          querySnapshot.forEach((doc: any) => {
            activityList.push(doc.data());
          });
          setActivities(activityList);
          setActivityLoading(false);
        });
    return () => {
      mounted = false;
    };
  }, [category?.id, uid]);

  const deleteCategory = () => {
    if (loading && activityLoading) {
      toast.error("Network error");
      return null;
    }
    let count = 0;
    const db = firebase.firestore();
    const batch = db.batch();
    batch.delete(db.doc(`users/${uid}/categories/${category?.id}`));
    activities.forEach((activity) => {
      batch.delete(db.doc(`users/${uid}/activities/${activity.id}`));
      count++;
    });
    const message = (num: number) => (num > 1 ? "activities" : "activity");
    batch.commit().then(() => {
      setOpen(false);
      toast.info(`category and ${count} ${message(count)} deleted`);
    });
  };
  if (!slug) return <div>Loading page</div>;
  if (loading) return <div>Loading category</div>;
  if (category)
    return (
      <div>
        <Confirm
          open={open}
          onCancel={function () {
            setOpen(true);
          }}
          onAccept={deleteCategory}
          title="Delete category"
          message="Category and all activities under it will be deleted. This process is irreversible"
          acceptTitle="Delete"
        />
        <div>{category.name}</div>
        {showEdit && category ? (
          <CategoryEdit
            initialValue={category}
            closeForm={() => setShowEdit(false)}
          />
        ) : null}
        <div>
          <Button onClick={() => setShowEdit(true)}>Edit</Button>
          <Button onClick={() => setOpen(!open)}>Delete</Button>
        </div>
        {activityLoading ? (
          <div>Loading</div>
        ) : (
          <Masonry>
            {activities.map((item) => (
              <ActivityCard activity={item} key={item.id} />
            ))}
          </Masonry>
        )}
      </div>
    );
  return <div>Category does not exist!</div>;
}
