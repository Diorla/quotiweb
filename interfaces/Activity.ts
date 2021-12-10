import Priority from "interfaces/Priority";

export type scheduleType = "time" | "duration" | "quantity";
export type reminderType = "morning" | "afternoon" | "evening" | "night";
export type repeatType =
  | "day"
  | "week"
  | "month"
  | "year"
  | "category"
  | "activity";
export default interface Activity {
  id: string;
  name: string;
  category: string;
  schedule: scheduleType;
  created: string;
  color: string;
  /**
   * schedule type is time (start and end time)
   */
  startTime?: string;
  endTime?: string;
  /**
   * schedule type is duration
   */
  duration?: number; // in ms
  /**
   * schedule type is quantity (the quantity and unit)
   */
  quantity?: number;
  unit?: string;
  /**
   * if the schedule type is not time based
   */
  reminder: reminderType;
  startDate: string;
  repeat: repeatType;
  /**
   * Every 2 days: 2 will be the repeat count. If it is zero, then no repeat,
   * it will only run on the startDate
   */
  repeatCount: number;
  /**
   * when it is weekly
   */
  daysOfWeek: number[];
  /**
   * when repeat is condition, the id and count, the number of times it is activated
   */
  repeatId: string;
  repeatDoneCount: number;
  /**
   * How long the task has been running for time and duration based activity
   */
  runTime: number;
  /**
   * key as date, keeps record of all the number or value
   */
  quantityRecord: {
    [key: string]: number;
  };
  timeRecord: {
    [key: string]: number;
  };
  /**
   * Keeps record of the date that it was marked as done
   */
  checkedList: string[];
  // TODO: Remove this
  /**
   * It will be done in front end, and doesn't need updating all the time
   */
  priority: Priority;
  /**
   * The last the activity was updated
   */
  updated: string;
  slug: string;
  postponeDate?: string;
}
