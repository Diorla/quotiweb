import { datatype } from "faker";
import Activity from "../interfaces/Activity";
import getScheduleTime from "./getScheduleTime";
import timePad from "./timePad";
describe("testing the return of time", () => {
  const activity: Activity = {
    id: "",
    name: "",
    category: "",
    schedule: "quantity",
    created: "",
    color: "",
    reminder: "morning",
    startDate: "",
    repeat: "day",
    repeatCount: 0,
    daysOfWeek: [],
    repeatId: "",
    repeatDoneCount: 0,
    runTime: 0,
    quantityRecord: {},
    timeRecord: {},
    checkedList: [],
    priority: 1,
    updated: "",
    slug: "",
  };
  /**
   * schedule === time => startTime
   * reminder === "morning" => 06:00
   * reminder === "afternoon" => 13:00
   * reminder === "evening" => 18:00
   * reminder === "night" => 20:00
   */
  test("should return startTime", () => {
    const timeBased: Activity = {
      ...activity,
      startTime: "11:23",
      schedule: "time",
    };
    expect(getScheduleTime(timeBased)).toBe("11:23");

    const hour = timePad(datatype.number(23));
    const minute = timePad(datatype.number(59));
    const randomTime: Activity = {
      ...activity,
      schedule: "time",
      startTime: hour + ":" + minute,
    };

    expect(getScheduleTime(randomTime)).toBe(hour + ":" + minute);
  });

  test("should return 06:00 for morning task", () => {
    expect(
      getScheduleTime({
        ...activity,
        schedule: "duration",
        reminder: "morning",
      })
    ).toBe("06:00");

    expect(
      getScheduleTime({
        ...activity,
        reminder: "morning",
      })
    ).toBe("06:00");
  });

  test("should return 13:00 for afternoon task", () => {
    expect(
      getScheduleTime({
        ...activity,
        schedule: "duration",
        reminder: "afternoon",
      })
    ).toBe("13:00");
    expect(
      getScheduleTime({
        ...activity,
        reminder: "afternoon",
      })
    ).toBe("13:00");
  });

  test("should return 18:00 for evening task", () => {
    expect(
      getScheduleTime({
        ...activity,
        schedule: "duration",
        reminder: "evening",
      })
    ).toBe("18:00");
    expect(
      getScheduleTime({
        ...activity,
        reminder: "evening",
      })
    ).toBe("18:00");
  });

  test("should return 20:00 for night task", () => {
    expect(
      getScheduleTime({
        ...activity,
        schedule: "duration",
        reminder: "night",
      })
    ).toBe("20:00");
    expect(
      getScheduleTime({
        ...activity,
        reminder: "night",
      })
    ).toBe("20:00");
  });
});
