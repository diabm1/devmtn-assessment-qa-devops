const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  test("should return an array", () => {
    const result = shuffle(array);
    expect(Array.isArray(result)).toBeTruthy();
  });

  test("should return array of the same length", () => {
    const result = shuffle(array);
    expect(result).toHaveLength(array.length);
  });

  test("should contain all the same elements", () => {
    const result = shuffle(array);
    array.forEach((item) => {
      expect(result).toContain(item);
    });
  });

  test("should shuffle the items", () => {
    const result = shuffle(array);
    expect(result).not.toEqual(array);
  });
});
