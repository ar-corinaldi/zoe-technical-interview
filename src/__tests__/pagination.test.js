function canShowMore(arr, index) {
  return index < arr.length;
}

function showMore(index) {
  return index + 3;
}

const canShowLess = (arr, index) => {
  return !(index <= 3 || arr.length <= 3);
};

const showLess = (index) => {
  return index - 3;
};

test("Array is empty", () => {
  const arr = [];
  const index = 3;
  expect(canShowMore(arr, index)).toBe(false);
  expect(canShowLess(arr, index)).toBe(false);
});

test("Array has exactly three elements", () => {
  const arr = [
    { id: 1, avatar: "", income: 90000, name: "test1" },
    { id: 2, avatar: "", income: 80000, name: "test2" },
    { id: 3, avatar: "", income: 70000, name: "test3" },
  ];
  const index = 3;
  expect(canShowMore(arr, index)).toBe(false);
  expect(canShowLess(arr, index)).toBe(false);
});

test("Array has more than three with index 3", () => {
  const arr = [
    { id: 1, avatar: "", income: 90000, name: "test1" },
    { id: 2, avatar: "", income: 80000, name: "test2" },
    { id: 3, avatar: "", income: 70000, name: "test3" },
    { id: 4, avatar: "", income: 60000, name: "test4" },
  ];
  const index = 3;
  expect(canShowMore(arr, index)).toBe(true);
  expect(showMore(index)).toBe(6);
});

test("Array has more than three with index 6", () => {
  const arr = [
    { id: 1, avatar: "", income: 90000, name: "test1" },
    { id: 2, avatar: "", income: 80000, name: "test2" },
    { id: 3, avatar: "", income: 70000, name: "test3" },
    { id: 4, avatar: "", income: 60000, name: "test4" },
  ];
  const index = 6;
  expect(canShowLess(arr, index)).toBe(true);
  const resultShowLess = showLess(index);
  expect(resultShowLess).toBe(3);
  expect(canShowLess(arr, resultShowLess)).toBe(false);
});
