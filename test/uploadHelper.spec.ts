import { srcToBlob } from "../src/utils/srcToBlob";

describe("uploadHelper", () => {
  describe("scrToBlob", () => {
    test("scrToBlob result", (done) => {
      async function getBlob() {
        try {
          const src =
            "https://ae01.alicdn.com/kf/S05041d7d2f5d4ab6b7ecadd7a4e1320bb.jpg?width=800&height=800&hash=1600";
          const blob: Blob = await srcToBlob(src);
          console.log("result :", blob);
          done();
        } catch (error) {
          done();
        }
      }
      getBlob();
    });
  });
});
