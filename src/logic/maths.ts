export interface MaxResult<T> {
  score: number;
  element: T;
}

export function maxBy<T>(array: T[], mapper: (t: T) => number): MaxResult<T> {
  let max = -Infinity;
  let maxElement = undefined;
  for (const element of array) {
    const result = mapper(element);
    if (result > max) {
      max = result;
      maxElement = element;
    }
  }
  return { element: maxElement!, score: max };
}
