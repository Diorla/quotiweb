export default interface UserInfo {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid: string;
  language: string;
  isNew: boolean;
  created: string;
  lastUpdated: string;
  primaryTheme: string;
  secondaryTheme: string;
  remindOncomplete: boolean;
  /**
   * 24 hour or 12 hour
   */
  timeFormat: "hh:mm a" | "HH:mm";
  /**
   * e.g. 21-08-2021
   */
  dateFormat:
    | "DD-MM-YYYY"
    | "DD-MMM-YYYY"
    | "DD/MM/YYYY"
    | "DD/MMM/YYYY"
    | "MM-DD-YYYY"
    | "MMM-DD-YYYY"
    | "MM/DD/YYYY"
    | "MMM/DD/YYYY";
  /**
   * If user can go above max
   */
  allowOvertime: boolean;
  /**
   * Enable "add time" in timed activity
   */
  manualUpdate: boolean;
  /**
   * Affects streak
   */
  minimumPriority: 3;
  morningReminder: string;
  afternoonReminder: string;
  eveningReminder: string;
  nightReminder: string;
  activeDays: number[];
  excusedDate: string[];
  streak: number;
}
