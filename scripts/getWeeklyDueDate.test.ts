import getWeeklyDueDate from "./getWeeklyDueDate";
import mockdate from "mockdate";
import faker from "faker";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

describe("should get weekly due date", () => {
  mockdate.set(faker.datatype.datetime());

  const hour = faker.datatype.number(23);
  const minute = faker.datatype.number(59);
  /**
   * if startDate is after today: return future date
   * if startDate is before today or today:
   * - if it's every week => check if it day includes today
   * - check if it is this week => check if it day includes today
   * -- if day doesn't include today
   *  --- if today > max day => week+repeatCount and set the date
   */
  test("should return future date", () => {
    const randomNumber = faker.datatype.number(20);
    // to be in the future
    const startDate = dayjs().add(randomNumber, "day");
    const weekday = faker.datatype.number(6);
    const date = getWeeklyDueDate(
      [weekday],
      startDate.toString(),
      1,
      hour,
      minute
    );

    const totalWeeks = Math.ceil(randomNumber / 7);
    expect(date.isAfter(dayjs(), "date")).toBe(true);
    expect(date.day()).toBe(weekday);
    expect(date.week() - startDate.week()).toBeLessThanOrEqual(totalWeeks);
  });
});
