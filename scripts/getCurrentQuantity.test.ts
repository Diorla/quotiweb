import mockdate from "mockdate";
import currentRecordKey from "constants/currentRecordKey";
import getCurrentQuantity from "./getCurrentQuantity";
import faker from "faker";

describe("should return today's quantity", () => {
  mockdate.set(currentRecordKey);
  test("should return todays value", () => {
    const random = faker.datatype.float();
    const todayQuantity = getCurrentQuantity({
      [currentRecordKey]: random,
    });
    expect(todayQuantity).toBe(random);

    const emptyObj = getCurrentQuantity({});
    expect(emptyObj).toBe(0);

    const anotherDate = getCurrentQuantity({
      "1970-10-19": faker.datatype.float(),
    });
    expect(anotherDate).toBe(0);
  });
});
