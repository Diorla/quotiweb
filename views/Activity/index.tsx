import { Button } from "@mui/material";
import Confirm from "components/Confirm";
import { useActivities } from "context/activityContext";
import { useUser } from "context/userContext";
import firebase from "firebase/clientApp";
import Activity from "interfaces/Activity";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActivityEdit from "./ActivityEdit";

export default function ActivityComp() {
  const {
    user: { uid },
  } = useUser();
  const {
    query: { slug },
    reload,
  } = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { activityList } = useActivities();

  useEffect(() => {
    let mounted = true;
    if (slug && mounted) {
      fetchActivity();
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, JSON.stringify(activityList)]);

  const fetchActivity = () => {
    const slugActivity = activityList.find((item) => item.slug === slug);
    if (slugActivity) {
      setActivity(slugActivity);
      setLoading(false);
    } else setLoading(false);
  };
  const deleteActivity = () => {
    if (loading) {
      toast.error("Network error");
      return null;
    }

    const db = firebase.firestore();
    const batch = db.batch();
    batch.delete(db.doc(`users/${uid}/activities/${activity?.id}`));

    batch.commit().then(() => {
      setOpen(false);
      toast.info("Activity deleted");
      reload();
    });
  };
  if (!slug) return <div>Loading page</div>;
  if (loading) return <div>Loading activity</div>;
  if (activity)
    return (
      <div>
        <Confirm
          open={open}
          onCancel={function () {
            setOpen(true);
          }}
          onAccept={deleteActivity}
          title="Delete activity"
          message="Activity will be deleted. This process is irreversible"
          acceptTitle="Delete"
        />
        <div>{activity.name}</div>
        {showEdit && activity ? (
          <ActivityEdit
            initialValue={activity}
            closeForm={() => setShowEdit(false)}
          />
        ) : null}
        <div>
          <Button onClick={() => setShowEdit(true)}>Edit</Button>
          <Button onClick={() => setOpen(!open)}>Delete</Button>
        </div>
      </div>
    );
  return <div>Activity does not exist!</div>;
}
