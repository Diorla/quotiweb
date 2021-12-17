import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Activity from "interfaces/Activity";
import ActivityStatus from "interfaces/ActivityStatus";
import { Postpone } from "./Postpone";
import currentRecordKey from "constants/currentRecordKey";
import updateActivity from "services/updateActivity";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";

/**
 * TODO: Reset
 * To reset, just set timeRecord[today] to zero, pretty straight forward
 */
export default function MoreMenu({
  activity,
  status,
  remaining = 0,
  showAddModal,
}: {
  activity: Activity;
  status: ActivityStatus;
  remaining?: number;
  showAddModal: () => void;
}) {
  const { schedule, unit, isPinned } = activity;
  const {
    user: { uid },
  } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const resetToday = () => {
    const { schedule } = activity;
    if (schedule === "quantity") resetQuantity();
    else resetDuration();
  };

  const resetDuration = () => {
    const { timeRecord = {}, id } = activity;
    const todayRecord = timeRecord[currentRecordKey];
    if (!todayRecord) {
      toast.warn("Nothing to reset");
      handleClose();
      return null;
    }
    const updatedTimeRecord = {
      ...timeRecord,
      [currentRecordKey]: 0,
    };
    updateActivity(uid, { id, timeRecord: updatedTimeRecord }, () => {
      toast.info("activity resets");
      handleClose();
    });
  };

  const resetQuantity = () => {
    const { quantityRecord = {}, id, unit, quantity } = activity;
    const todayRecord = quantityRecord[currentRecordKey];
    if (!todayRecord) {
      toast.warn("Nothing to reset");
      handleClose();
      return null;
    }
    const updatedQuantityRecord = {
      ...quantityRecord,
      [currentRecordKey]: 0,
    };
    updateActivity(uid, { id, quantityRecord: updatedQuantityRecord }, () => {
      toast.info(`activity resets to ${quantity} ${unit}`);
      handleClose();
    });
  };

  const pinActivity = () => {
    const { isPinned, id } = activity;
    updateActivity(uid, { id, isPinned: !isPinned }, () => {
      handleClose();
    });
  };
  const title = schedule === "quantity" ? `Add ${unit}` : "Add time";
  return (
    <div>
      <IconButton
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={pinActivity}>{isPinned ? "Unpin" : "Pin"}</MenuItem>
        <Postpone activity={activity} status={status} />
        <MenuItem
          onClick={() => {
            showAddModal();
            handleClose();
          }}
        >
          {title}
        </MenuItem>
        <MenuItem onClick={resetToday}>Reset</MenuItem>
      </Menu>
    </div>
  );
}
