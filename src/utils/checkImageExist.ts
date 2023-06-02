import { ReturnImage } from "@src/functions/sendData";

export function hasThumbImage(images: ReturnImage[]): boolean {
  return images.some((image) => image.imageType === "thumb");
}

export function hasDescImage(images: ReturnImage[]): boolean {
  return images.some((image) => image.imageType === "desc");
}
