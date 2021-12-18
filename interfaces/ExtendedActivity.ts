import dayjs from "dayjs";
import Activity from "interfaces/Activity";
import ActivityStatus from "interfaces/ActivityStatus";

export default interface ExtendedActivity extends Activity {
  dueDate?: dayjs.Dayjs;
  status?: ActivityStatus;
  remaining?: number;
  categoryName?: string;
}
