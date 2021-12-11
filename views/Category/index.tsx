import { Masonry } from "@mui/lab";
import { Button } from "@mui/material";
import ActivityCard from "components/ActivityCard";
import CardSkeleton from "components/CardSkeleton";
import Confirm from "components/Confirm";
import masonryColumns from "constants/masonryColumns";
import { useActivities } from "context/activityContext";
import { useCategories } from "context/categoryContext";
import { useUser } from "context/userContext";
import firebase from "firebase/clientApp";
import Category from "interfaces/Category";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryEdit from "./CategoryEdit";

export default function CategoryComp() {
  const {
    user: { uid },
  } = useUser();
  const {
    query: { slug },
    reload,
  } = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { categoryList } = useCategories();
  const { loading: activityLoading, activityList } = useActivities();

  const list: any[] = [];
  list.length = 10;
  list.fill("");

  useEffect(() => {
    let mounted = true;
    if (slug && mounted) {
      const slugCategory = categoryList.find((item) => item.slug === slug);
      if (slugCategory) {
        setCategory(slugCategory);
        setLoading(false);
      } else setLoading(false);
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, JSON.stringify(categoryList)]);

  const activities = category?.id
    ? activityList.filter((item) => item.category === category.id)
    : [];
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
      reload();
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
          <Masonry columns={masonryColumns}>
            {list.map((_item, idx) => (
              <CardSkeleton key={idx} />
            ))}
          </Masonry>
        ) : (
          <Masonry columns={masonryColumns}>
            {activities.map((item) => (
              <ActivityCard activity={item} key={item.id} />
            ))}
          </Masonry>
        )}
      </div>
    );
  return <div>Category does not exist!</div>;
}
