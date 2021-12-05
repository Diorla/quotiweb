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
   * The number of the quantity that been updated
   */
  currentQuantity: number;
  /**
   * For timed and duration type, indicates the length of time recorded
   */
  currentTime: number;
  /**
   * The last time it was updated (played, stopped or add more)
   */
  updated: string;
  /**
   * Keeps record of the date that it was marked as done
   */
  checkedList: string[];
  priority: Priority;
}
