import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import { useActivities } from "context/activityContext";
import { useUser } from "context/userContext";
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
  activityList,
}: {
  loading: boolean;
  error: Error | null;
  activityList: Activity[];
}) => {
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  if (activityList.length)
    return (
      <div>
        {activityList.map((item) => (
          <ActivityItem {...item} key={item.id} />
        ))}
      </div>
    );
  return <div>No activityList added yet</div>;
};

export default function CategoryCard(category: Category) {
  const { name, description, slug, color } = category;
  const [open, setOpen] = useState(false);

  const { loading, error, activityList } = useActivities();
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
            sx={{ color: "black", textDecoration: "none" }}
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
          activityList={activityList}
        />
      </AccordionDetails>
    </Accordion>
  );
}
