import type { KeypadItem } from "@/common/types/keypad.types";

function getRandomUniqueIndexes(count: number, max: number): number[] {
  const result = new Set<number>();

  while (result.size < count) {
    const randomIndex = Math.floor(Math.random() * max);
    result.add(randomIndex);
  }

  return Array.from(result).sort((a, b) => a - b);
}

export function createPasswordKeypadLayout(): KeypadItem[] {
  const items: KeypadItem[] = new Array(16).fill(null).map(() => ({
    type: "hidden",
  }));

  const blankIndexes = getRandomUniqueIndexes(2, 12);
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  let digitCursor = 0;

  for (let index = 0; index < 12; index += 1) {
    if (blankIndexes.includes(index)) {
      items[index] = {
        type: "blank",
        variant: "logo",
      };
      continue;
    }

    items[index] = {
      type: "digit",
      value: digits[digitCursor],
    };
    digitCursor += 1;
  }

  items[12] = { type: "hidden" };
  items[13] = { type: "hidden" };
  items[14] = { type: "hidden" };
  items[15] = { type: "backspace" };

  return items;
}
