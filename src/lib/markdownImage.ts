export type ImageDimensions = {
  width: number;
  height: number;
};

const defaultDimensions: ImageDimensions = {
  width: 768,
  height: 432,
};

export function getImageDimensions(alt = ""): ImageDimensions {
  const dimensions = alt.match(/\{(\d+)xx(\d+)\}/);
  if (!dimensions) {
    return defaultDimensions;
  }

  return {
    width: Number(dimensions[1]),
    height: Number(dimensions[2]),
  };
}
