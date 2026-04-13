import type { KeypadItem } from "@/common/types/keypad.types";

export function createAmountKeypadLayout(): KeypadItem[] {
  return [
    { type: "digit", value: "1" },
    { type: "digit", value: "2" },
    { type: "digit", value: "3" },

    { type: "digit", value: "4" },
    { type: "digit", value: "5" },
    { type: "digit", value: "6" },

    { type: "digit", value: "7" },
    { type: "digit", value: "8" },
    { type: "digit", value: "9" },

    { type: "digit", value: "00" },
    { type: "digit", value: "0" },
    { type: "backspace" },
  ];
}
