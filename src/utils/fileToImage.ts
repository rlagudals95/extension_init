export const fileToImage = async (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const fileUrl = URL.createObjectURL(file);
    image.onload = () => {
      // 메모리 Leak 방지
      resolve(image);
    };
    image.onerror = (e) => {
      reject(e);
    };
    image.src = fileUrl;
  });
};
