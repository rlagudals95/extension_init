import { hasDescImage, hasThumbImage } from "../src/utils/checkImageExist";

describe("hasThumbImage", () => {
  it("should return true if there is an image with imageType of 'thumb'", () => {
    const images = [
      { imageUrl: "thumb1.jpg", imageType: "thumb" },
      { imageUrl: "desc1.jpg", imageType: "desc" },
    ];
    expect(hasThumbImage(images)).toBe(true);
  });

  it("should return false if there is no image with imageType of 'thumb'", () => {
    const images = [
      { imageUrl: "desc1.jpg", imageType: "desc" },
      { imageUrl: "desc2.jpg", imageType: "desc" },
    ];
    expect(hasThumbImage(images)).toBe(false);
  });
});

describe("hasDescImage", () => {
  it("should return true if there is an image with imageType of 'desc'", () => {
    const images = [
      { imageUrl: "thumb1.jpg", imageType: "thumb" },
      { imageUrl: "desc1.jpg", imageType: "desc" },
    ];
    expect(hasDescImage(images)).toBe(true);
  });

  it("should return false if there is no image with imageType of 'desc'", () => {
    const images = [
      { imageUrl: "thumb1.jpg", imageType: "thumb" },
      { imageUrl: "thumb2.jpg", imageType: "thumb" },
    ];
    expect(hasDescImage(images)).toBe(false);
  });
});
