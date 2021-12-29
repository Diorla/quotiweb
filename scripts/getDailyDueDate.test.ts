import dayjs from "dayjs";
import faker from "faker";
import getDailyDueDate from "./getDailyDueDate";
import mockdate from "mockdate";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

describe("should get daily due date", () => {
  mockdate.set(faker.datatype.datetime());

  const hour = faker.datatype.number(23);
  const minute = faker.datatype.number(59);
  test("every day", () => {
    const startDate = dayjs().subtract(faker.datatype.number(), "day");

    const dueDate = getDailyDueDate(startDate.toString(), 1, hour, minute);
    expect(dueDate.isToday()).toBe(true);
    expect(dueDate.hour()).toBe(hour);
    expect(dueDate.minute()).toBe(minute);
  });
  test("every 2 days", () => {
    const daysToSubtract = faker.datatype.number(100) * 2;
    const startDate = dayjs().subtract(daysToSubtract, "day");
    const dueDate = getDailyDueDate(startDate.toString(), 2, hour, minute);

    const datesToSubtract = faker.datatype.number(100);

    // ensure it's not divisible by 2
    const compatibleDate =
      datesToSubtract % 2 ? datesToSubtract : datesToSubtract + 1;
    const newStartDate = dayjs().subtract(compatibleDate, "day");

    const newDueDate = getDailyDueDate(
      newStartDate.toString(),
      2,
      hour,
      minute
    );

    expect(dueDate.isToday()).toBe(true);
    expect(dueDate.hour()).toBe(hour);
    expect(dueDate.minute()).toBe(minute);

    expect(newDueDate.isToday()).toBe(false);
  });

  test("every 3 days", () => {
    const daysToSubtract = faker.datatype.number(100) * 3;
    const startDate = dayjs().subtract(daysToSubtract, "day");
    const dueDate = getDailyDueDate(startDate.toString(), 3, hour, minute);

    const datesToSubtract = faker.datatype.number(100);

    // ensure it's not divisible by 3
    const compatibleDate =
      datesToSubtract % 3 ? datesToSubtract : datesToSubtract + 1;
    const newStartDate = dayjs().subtract(compatibleDate, "day");

    const newDueDate = getDailyDueDate(
      newStartDate.toString(),
      3,
      hour,
      minute
    );

    expect(dueDate.isToday()).toBe(true);
    expect(dueDate.hour()).toBe(hour);
    expect(dueDate.minute()).toBe(minute);

    expect(newDueDate.isToday()).toBe(false);
  });

  test("every 6 days", () => {
    const daysToSubtract = faker.datatype.number(100) * 6;
    const startDate = dayjs().subtract(daysToSubtract, "day");
    const dueDate = getDailyDueDate(startDate.toString(), 6, hour, minute);

    const datesToSubtract = faker.datatype.number(100);

    // ensure it's not divisible by 6
    const compatibleDate =
      datesToSubtract % 6 ? datesToSubtract : datesToSubtract + 1;
    const newStartDate = dayjs().subtract(compatibleDate, "day");

    const newDueDate = getDailyDueDate(
      newStartDate.toString(),
      6,
      hour,
      minute
    );

    expect(dueDate.isToday()).toBe(true);
    expect(dueDate.hour()).toBe(hour);
    expect(dueDate.minute()).toBe(minute);

    expect(newDueDate.isToday()).toBe(false);
  });

  test("every 17 days", () => {
    const daysToSubtract = faker.datatype.number(100) * 17;
    const startDate = dayjs().subtract(daysToSubtract, "day");
    const dueDate = getDailyDueDate(startDate.toString(), 17, hour, minute);

    const datesToSubtract = faker.datatype.number(100);

    // ensure it's not divisible by 17
    const compatibleDate =
      datesToSubtract % 17 ? datesToSubtract : datesToSubtract + 1;
    const newStartDate = dayjs().subtract(compatibleDate, "day");

    const newDueDate = getDailyDueDate(
      newStartDate.toString(),
      17,
      hour,
      minute
    );

    expect(dueDate.isToday()).toBe(true);
    expect(dueDate.hour()).toBe(hour);
    expect(dueDate.minute()).toBe(minute);

    expect(newDueDate.isToday()).toBe(false);
  });

  test("every random days", () => {
    const randomDays = faker.datatype.number(18);
    const daysToSubtract = faker.datatype.number(100) * randomDays;
    const startDate = dayjs().subtract(daysToSubtract, "day");
    const dueDate = getDailyDueDate(
      startDate.toString(),
      randomDays,
      hour,
      minute
    );

    const datesToSubtract = faker.datatype.number(100);

    // ensure it's not divisible by randomDays
    const compatibleDate =
      datesToSubtract % randomDays ? datesToSubtract : datesToSubtract + 1;
    const newStartDate = dayjs().subtract(compatibleDate, "day");

    const newDueDate = getDailyDueDate(
      newStartDate.toString(),
      randomDays,
      hour,
      minute
    );

    console.log({
      today: dayjs().toString(),
      dd: dueDate.toString(),
      sd: startDate.toString(),
    });

    expect(dueDate.isToday()).toBe(true);
    expect(dueDate.hour()).toBe(hour);
    expect(dueDate.minute()).toBe(minute);

    expect(newDueDate.isToday()).toBe(false);
  });

  test("should return future date", () => {
    const randomNumber = 1 + faker.datatype.number(100);
    const randomCount = faker.datatype.number(10);
    const randomHour = faker.datatype.number(23);
    const randomMinute = faker.datatype.number(59);
    const futureDate = dayjs().add(randomNumber, "day");
    const date = getDailyDueDate(
      futureDate.toString(),
      randomCount,
      randomHour,
      randomMinute
    );
    expect(date.isToday()).toBe(false);
    expect(date.isSame(futureDate, "date")).toBe(true);
  });
});
