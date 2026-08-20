import { getImageDimensions } from "../src/lib/markdownImage";

describe("getImageDimensions", () => {
  it("parses historical image metadata", () => {
    expect(getImageDimensions("Build time composition {800xx235}")).toEqual({
      width: 800,
      height: 235,
    });
  });

  it("uses defaults when metadata is missing or malformed", () => {
    expect(getImageDimensions("Image without dimensions")).toEqual({
      width: 768,
      height: 432,
    });
    expect(getImageDimensions("Malformed {800x235}")).toEqual({
      width: 768,
      height: 432,
    });
  });
});
