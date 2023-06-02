import { appendHttpsUrl } from "../src/utils/appendHttpsUrl";

describe("appendHttpsUrl", () => {
  test("returns the input URL if it starts with https://", () => {
    const url = "https://example.com";
    expect(appendHttpsUrl(url)).toEqual(url);
  });

  test("converts a URL that starts with // to https://", () => {
    const url = "//example.com";
    expect(appendHttpsUrl(url)).toEqual("https://example.com");
  });

  test("returns the input URL if it is falsy", () => {
    expect(appendHttpsUrl(undefined)).toBeUndefined();
    expect(appendHttpsUrl(null)).toBeNull();
    expect(appendHttpsUrl("")).toEqual("");
  });
});
