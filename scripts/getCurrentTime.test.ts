import mockdate from "mockdate";
import currentRecordKey from "constants/currentRecordKey";
import getCurrentTime from "./getCurrentTime";
import faker from "faker";

describe("should return today's time", () => {
  mockdate.set(currentRecordKey);
  test("should return todays value", () => {
    const random = faker.datatype.float();
    const todayTime = getCurrentTime({
      [currentRecordKey]: random,
    });
    expect(todayTime).toBe(random);

    const emptyObj = getCurrentTime({});
    expect(emptyObj).toBe(0);

    const anotherDate = getCurrentTime({
      "1970-10-19": faker.datatype.float(),
    });
    expect(anotherDate).toBe(0);
  });
});
