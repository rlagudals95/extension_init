export const srcToBlob = async (src) => {
  const response = await fetch(src);
  return response.blob();
};
