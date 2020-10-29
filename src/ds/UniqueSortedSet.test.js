import UniqueSortedSet from './UniqueSortedSet.js';

test('unique values', () => {
  let sortedSet = new UniqueSortedSet();
  sortedSet.add(1);
  sortedSet.add(1);
  sortedSet.add(1);
  sortedSet.add(2);
  sortedSet.add(3);
  expect(sortedSet.length()).toBe(3)
});

test('Order', () => {
  let sortedSet = new UniqueSortedSet();
  sortedSet.add("Romeo");
  sortedSet.add("Alpha");
  sortedSet.add("Romeo");
  sortedSet.add("Bravo");
  console.log(sortedSet);
  expect(sortedSet.length()).toBe(3)
  expect(sortedSet.orderedValues[0]).toBe("Alpha");
  expect(sortedSet.orderedValues[1]).toBe("Bravo");
  expect(sortedSet.orderedValues[2]).toBe("Romeo");
});

test('Last Item Entry', () => {
  let sortedSet = new UniqueSortedSet();
  sortedSet.add("Romeo");
  sortedSet.add("Alpha");
  sortedSet.add("Romeo");
  sortedSet.add("Bravo");
  sortedSet.add("Umbrella");
  console.log(sortedSet);
  expect(sortedSet.length()).toBe(4)
  expect(sortedSet.orderedValues[0]).toBe("Alpha");
  expect(sortedSet.orderedValues[1]).toBe("Bravo");
  expect(sortedSet.orderedValues[2]).toBe("Romeo");
  expect(sortedSet.orderedValues[3]).toBe("Umbrella");
});