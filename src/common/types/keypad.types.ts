export type KeypadItem =
  | {
      type: "digit";
      value: string;
    }
  | {
      type: "backspace";
    }
  | {
      type: "blank";
      variant?: "logo" | "empty";
    }
  | {
      type: "hidden";
    };

export type NumericKeypadProps = {
  items: KeypadItem[];
  columns: 3 | 4;
  onDigitPress: (value: string) => void;
  onBackspacePress: () => void;
  className?: string;
};
