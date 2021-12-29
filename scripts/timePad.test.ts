import faker from "faker";
import timePad from "./timePad";

describe("should padding number", () => {
  test("should format number", () => {
    const singleDigit = faker.datatype.number(9);
    expect(timePad(singleDigit)).toBe(`0${singleDigit}`);
    expect(timePad(singleDigit + 10)).toBe(`${singleDigit + 10}`);
  });
});
