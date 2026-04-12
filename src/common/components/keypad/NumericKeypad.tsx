"use client";

import type {
  KeypadItem,
  NumericKeypadProps,
} from "@/common/types/keypad.types";

function KeypadButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-14 w-14 items-center justify-center rounded-full text-[24px] font-medium text-black transition active:scale-95 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function LogoPlaceholder() {
  return (
    <div className="flex h-14 w-14 items-center justify-center">
      <div className="text-[28px] font-bold text-violet-300">B</div>
    </div>
  );
}

function HiddenPlaceholder() {
  return <div className="h-14 w-14" aria-hidden="true" />;
}

function renderItem(
  item: KeypadItem,
  index: number,
  onDigitPress: (value: string) => void,
  onBackspacePress: () => void,
) {
  if (item.type === "digit") {
    return (
      <KeypadButton key={index} onClick={() => onDigitPress(item.value)}>
        {item.value}
      </KeypadButton>
    );
  }

  if (item.type === "backspace") {
    return (
      <KeypadButton key={index} onClick={onBackspacePress}>
        ←
      </KeypadButton>
    );
  }

  if (item.type === "blank") {
    if (item.variant === "logo") {
      return <LogoPlaceholder key={index} />;
    }

    return <HiddenPlaceholder key={index} />;
  }

  return <HiddenPlaceholder key={index} />;
}

export default function NumericKeypad({
  items,
  columns,
  onDigitPress,
  onBackspacePress,
  className = "",
}: NumericKeypadProps) {
  const gridClassName =
    columns === 4
      ? "grid-cols-4 gap-x-6 gap-y-7"
      : "grid-cols-3 gap-x-8 gap-y-5";

  return (
    <div className={`grid ${gridClassName} justify-items-center ${className}`}>
      {items.map((item, index) =>
        renderItem(item, index, onDigitPress, onBackspacePress),
      )}
    </div>
  );
}
