import assert from "node:assert";
import { describe, it } from "node:test";
import { sum } from "./index.js";

describe("sum()", () => {
  it("should return the sum of two positive numbers", () => {
    assert.strictEqual(sum(2, 3), 5);
  });

  it("should return the sum of negative and positive numbers", () => {
    assert.strictEqual(sum(-1, 4), 3);
  });

  it("should return 0 when both arguments are 0", () => {
    assert.strictEqual(sum(0, 0), 0);
  });
});
