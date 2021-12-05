import UserProps from "./UserProps";

const initialUser: UserProps = {
  uid: "",
  language: "en",
  isNew: true,
  created: "",
  lastUpdated: "",
  primaryTheme: "#a53f2b",
  secondaryTheme: "#4da167",
  remindOncomplete: false,
  timeFormat: "hh:mm a",
  dateFormat: "DD-MM-YYYY",
  allowOvertime: false,
  manualUpdate: false,
  minimumPriority: 3,
  morningReminder: "06:00",
  afternoonReminder: "13:00",
  eveningReminder: "18:00",
  nightReminder: "20:00",
  activeDays: [1, 2, 3, 4, 5],
  excusedDate: [],
  streak: 0,
  runningId: "",
  runningTaskStartTime: "",
};

export default initialUser;
