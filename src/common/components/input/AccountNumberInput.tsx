"use client";

import type React from "react";
import { type ChangeEvent, useId } from "react";

type AccountNumberInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "onChange"
> & {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onVerify?: () => void;
  verifyLabel?: string;
  verifyDisabled?: boolean;
};

const AccountNumberInput = ({
  label,
  value,
  onChange,
  onVerify,
  verifyLabel = "계좌확인",
  verifyDisabled = false,
  placeholder,
  className = "",
  disabled = false,
  ...props
}: AccountNumberInputProps) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  const displayValue = value.replace(/\D/g, "").slice(0, 11);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value.replace(/\D/g, "").slice(0, 11);
    onChange(nextValue);
  };

  return (
    <div className="flex w-full flex-col">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-6 text-[20px] leading-none font-bold text-black"
        >
          {label}
        </label>
      )}

      <div className="flex items-end gap-3 border-b border-[#CCCCCC] pb-3">
        <input
          {...props}
          id={inputId}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          type="text"
          inputMode="numeric"
          maxLength={11}
          disabled={disabled}
          className={`min-w-0 flex-1 text-[20px] font-bold text-black placeholder:text-[#CCCCCC] outline-none ${className}`}
        />
        <button
          type="button"
          onClick={onVerify}
          disabled={verifyDisabled || disabled}
          className="h-9.25 w-21.5 shrink-0 rounded-[20px] bg-[#F6F6F6] text-[18px] leading-8.25 font-medium tracking-[-0.09px] text-[#585858]"
        >
          {verifyLabel}
        </button>
      </div>
    </div>
  );
};

export default AccountNumberInput;
