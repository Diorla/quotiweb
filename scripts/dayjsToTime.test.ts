import dayjsToTime from "scripts/dayjsToTime";
import faker from "faker";
import dayjs from "dayjs";
import timePad from "./timePad";

describe("convert dayjs to time", () => {
  const hour = faker.datatype.number(23);
  const minute = faker.datatype.number(59);
  const second = faker.datatype.number(59);
  const randomDate = dayjs().hour(hour).minute(minute).second(second);
  test("should extract time from dayjs with seconds", () => {
    const withSecond = dayjsToTime(randomDate, true);
    expect(withSecond).toBe(
      `${timePad(hour)}:${timePad(minute)}:${timePad(second)}`
    );
  });
  test("should extract time from dayjs without seconds", () => {
    const withoutSecond = dayjsToTime(randomDate);
    expect(withoutSecond).toBe(`${timePad(hour)}:${timePad(minute)}`);
  });
});
