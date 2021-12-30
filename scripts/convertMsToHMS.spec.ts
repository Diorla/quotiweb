import convertMsToHMS from "./convertMSToHMS";

describe("should test convert milliseconds to hrs, minutes and seconds", () => {
  test("should return default value", () => {
    const strValue = convertMsToHMS(0);
    const numValue = convertMsToHMS(0, true);
    expect(strValue).toEqual({
      hh: "00",
      mm: "00",
      ss: "00",
    });
    expect(numValue).toEqual({
      hh: 0,
      mm: 0,
      ss: 0,
    });
  });

  test("should test for seconds", () => {
    const strValue = convertMsToHMS(2200);
    const numValue = convertMsToHMS(2200, true);
    expect(strValue).toEqual({
      hh: "00",
      mm: "00",
      ss: "02",
    });
    expect(numValue).toEqual({
      hh: 0,
      mm: 0,
      ss: 2,
    });
  });

  test("should test for minutes", () => {
    const strValue = convertMsToHMS(195000);
    const numValue = convertMsToHMS(195000, true);
    expect(strValue).toEqual({
      hh: "00",
      mm: "03",
      ss: "15",
    });
    expect(numValue).toEqual({
      hh: 0,
      mm: 3,
      ss: 15,
    });
  });

  test("should test for hours", () => {
    const strValue = convertMsToHMS(3905000);
    const numValue = convertMsToHMS(3905000, true);
    expect(strValue).toEqual({
      hh: "01",
      mm: "05",
      ss: "05",
    });
    expect(numValue).toEqual({
      hh: 1,
      mm: 5,
      ss: 5,
    });
  });
});
