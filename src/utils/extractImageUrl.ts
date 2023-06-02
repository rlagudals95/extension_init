export function extractImageUrlFromBackground(background: string): string {
  const backgroundImageRegex = /url\(["']?(.*?)["']?\)/;
  const matches = background.match(backgroundImageRegex);
  const imageUrl = matches && matches.pop();
  return imageUrl || null;
}
