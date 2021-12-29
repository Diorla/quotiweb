import dayjsToMS from "scripts/dayjsToMs";
import faker from "faker";
import dayjs from "dayjs";

describe("convert dayjs to time", () => {
  test("should extract time from dayjs", () => {
    const hour = faker.datatype.number(23);
    const minute = faker.datatype.number(59);
    const second = faker.datatype.number(59);
    const randomDate = dayjs().hour(hour).minute(minute).second(second);
    const total = hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000;
    const result = dayjsToMS(randomDate);
    expect(total).toBe(result);
  });
});
