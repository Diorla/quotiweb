import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import { useUser } from "context/userContext";
import useActivities from "hooks/useActivities";
import Activity from "interfaces/Activity";
import Category from "interfaces/Category";
import { useMemo, useState } from "react";
import Link from "./Link";

const ActivityItem = (activity: Activity) => {
  return (
    <div style={{ marginLeft: 8, marginBottom: 2 }}>
      <Link href={`/activity/${activity.slug}`} sx={{ textDecoration: "none" }}>
        {activity.name}
      </Link>
    </div>
  );
};

const ActivityRender = ({
  loading,
  error,
  activities,
}: {
  loading: boolean;
  error: Error | null;
  activities: Activity[];
}) => {
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (activities.length)
    return (
      <div>
        {activities.map((item) => (
          <ActivityItem {...item} key={item.id} />
        ))}
      </div>
    );
  return <div>No activities added yet</div>;
};

export default function CategoryCard(category: Category) {
  const {
    user: { uid },
  } = useUser();
  const { name, description, slug, id, color } = category;
  const [open, setOpen] = useState(false);

  const memo = useMemo(() => useActivities, [uid, id]);

  const { loading, error, activities } = memo(uid, id);
  return (
    <Accordion expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
        sx={{ backgroundColor: `${color}1a` }}
      >
        <Typography
          sx={{ width: "33%", flexShrink: 0, textOverflow: "ellipsis" }}
        >
          <Link
            href={`/category/${slug}`}
            sx={{ color: "palette.primary.text", textDecoration: "none" }}
          >
            {name}
          </Link>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">{description}</Typography>
        <Divider />
        <ActivityRender
          loading={loading}
          error={error}
          activities={activities}
        />
      </AccordionDetails>
    </Accordion>
  );
}
