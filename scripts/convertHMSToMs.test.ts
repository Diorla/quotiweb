import convertHMSToMs from "./convertHMSToMS";
import faker from "faker";
describe("should convert hour, minutes and seconds to milliseconds", () => {
  /**
   * input: { hh?: number, mm?: number, ss?: number, ms?: number }
   * If hh, mm or ss is not provided, it will be 0
   * ss * 1000; mm * 60*1000; hh * 60*60*1000
   * output: ms: number
   */

  test("should maintain the value of ms", () => {
    const random = faker.datatype.number();
    expect(convertHMSToMs({ ms: random })).toBe(random);
    expect(convertHMSToMs({ ms: 85 })).toBe(85);
  });

  test("should convert seconds to ms", () => {
    const ms1 = convertHMSToMs({ ss: 1 });
    expect(ms1).toBe(1000);

    const randomSecond = faker.datatype.number();
    expect(convertHMSToMs({ ss: randomSecond })).toBe(randomSecond * 1000);

    const randomMS = faker.datatype.number();
    const total = randomSecond * 1000 + randomMS;
    expect(convertHMSToMs({ ss: randomSecond, ms: randomMS })).toBe(total);
  });

  test("should convert minutes to ms", () => {
    expect(convertHMSToMs({ mm: 1 })).toBe(60 * 1000);

    const randomMS = faker.datatype.number();
    const randomSecond = faker.datatype.number();
    const randomMinute = faker.datatype.number();

    expect(convertHMSToMs({ mm: randomMinute })).toBe(randomMinute * 60 * 1000);
    const totalMinuteSecond = randomMinute * 60 * 1000 + randomSecond * 1000;
    expect(convertHMSToMs({ mm: randomMinute, ss: randomSecond })).toBe(
      totalMinuteSecond
    );
    expect(
      convertHMSToMs({ mm: randomMinute, ss: randomSecond, ms: randomMS })
    ).toBe(totalMinuteSecond + randomMS);
  });

  test("should convert hours to ms", () => {
    expect(convertHMSToMs({ hh: 1 })).toBe(3600000);

    const randomMS = faker.datatype.number();
    const randomSecond = faker.datatype.number();
    const randomMinute = faker.datatype.number();
    const randomHour = faker.datatype.number();

    expect(convertHMSToMs({ hh: randomHour })).toBe(
      randomHour * 60 * 60 * 1000
    );
    const hourMinute = randomHour * 60 * 60 * 1000 + randomMinute * 60 * 1000;
    expect(convertHMSToMs({ hh: randomHour, mm: randomMinute })).toBe(
      hourMinute
    );
    const hourMinuteSecond =
      randomHour * 60 * 60 * 1000 +
      randomMinute * 60 * 1000 +
      randomSecond * 1000;
    expect(
      convertHMSToMs({ hh: randomHour, mm: randomMinute, ss: randomSecond })
    ).toBe(hourMinuteSecond);
    expect(
      convertHMSToMs({
        hh: randomHour,
        mm: randomMinute,
        ss: randomSecond,
        ms: randomMS,
      })
    ).toBe(hourMinuteSecond + randomMS);
  });
});
