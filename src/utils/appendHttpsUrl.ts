export const appendHttpsUrl = (url): string => {
  if (!url) {
    return url;
  }

  if (url.startsWith("https://")) {
    return url;
  }

  const protocolPattern = /^\/\/(.*)/g;
  const match = url.match(protocolPattern);

  if (match) {
    return `https:${url}`;
  }

  return url;
};
