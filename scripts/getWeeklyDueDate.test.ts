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

    console.log({
      date: date.toString(),
      today: dayjs().toString(),
      weekday,
      startWeek: startDate.week(),
      todayWeek: date.week(),
      weekDifference: date.week() - startDate.week(),
      randomNumber,
      totalWeeks,
    });

    expect(date.isAfter(dayjs(), "date")).toBe(true);
    expect(date.day()).toBe(weekday);
    expect(date.week() - startDate.week()).toBeLessThanOrEqual(totalWeeks);
  });

  test("should return today", () => {
    const startDate = dayjs();
    const dueDate = getWeeklyDueDate(
      [startDate.day()],
      startDate.toString(),
      1,
      hour,
      minute
    );
    expect(startDate.isSame(dueDate, "date")).toBe(true);

    const dueDate1 = getWeeklyDueDate(
      [startDate.day()],
      startDate.subtract(5).toString(),
      1,
      hour,
      minute
    );
    expect(dayjs().isSame(dueDate1, "date")).toBe(true);

    const extraDay = dayjs().day() < 6 ? dayjs().day() + 1 : 0;

    const dueDate2 = getWeeklyDueDate(
      [startDate.day(), extraDay],
      startDate.toString(),
      1,
      hour,
      minute
    );
    expect(dayjs().isSame(dueDate2, "date")).toBe(true);
  });

  test("should return next date", () => {
    const today = dayjs().day();
    // 0 or today+1 if today is 0, 1, 2, 3, 4, 5 => 1, 2, 3, 4, 5, 6
    const afterDay = today < 6 ? today + 1 : 0;
    // 6 or today-1 if today is 1, 2, 3, 4, 5, 6 => 0, 1, 2, 3, 4, 5
    const beforeDay = today > 0 ? today - 1 : 6;
    const startDate = dayjs(); // today;
    const dueDate = getWeeklyDueDate(
      [beforeDay, afterDay],
      startDate.toString(),
      1,
      hour,
      minute
    );
    expect(dueDate.day()).toBe(afterDay);
  });
});
