import { getTagCounts } from "../src/lib/timeline";

describe("getTagCounts", () => {
  it("counts tags and tolerates items without tags", () => {
    expect(
      getTagCounts([
        { tags: ["Architecture", "AI/LLM"] },
        { tags: ["Architecture"] },
        {},
      ]),
    ).toEqual({ Architecture: 2, "AI/LLM": 1 });
  });
});
