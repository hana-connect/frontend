"use client";

import Image from "next/image";

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
      className="flex h-8 w-14 items-center justify-center rounded-full text-title-32-sb text-black transition disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function LogoPlaceholder() {
  return (
    <Image
      width={23}
      height={28}
      src="/svg/logo.svg"
      alt="Logo"
      className="grayscale opacity-20"
    />
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
    return item.variant === "logo" ? (
      <LogoPlaceholder key={index} />
    ) : (
      <HiddenPlaceholder key={index} />
    );
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
      ? "grid-cols-4 gap-x-6 gap-y-9"
      : "grid-cols-3 gap-x-8 gap-y-9";

  return (
    <div className={`grid ${gridClassName} place-items-center ${className}`}>
      {items.map((item, index) =>
        renderItem(item, index, onDigitPress, onBackspacePress),
      )}
    </div>
  );
}
