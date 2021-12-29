import generateColor from "./generateColor";
import * as matchers from "jest-extended";
expect.extend(matchers);

describe("should return colour", () => {
  test("should start with #", () => {
    expect(generateColor().charAt(0)).toBe("#");
  });
  test("should return hex colour", () => {
    expect(generateColor().length).toBe(7);
  });

  test("should return values between 0 and f", () => {
    const arr: string[] = [];
    arr.length = 16;
    arr.fill("");
    const possibleValues = arr.map((_item, idx) => idx.toString(16));
    const isHexValue = (item: string) => possibleValues.includes(item);
    const arrayIsMatch = (items: string[]) => items.every(isHexValue);
    const colour = generateColor().slice(1);
    expect(colour.split("")).toSatisfy(arrayIsMatch);
  });
});
