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
          className="text-heading-20-b mb-6 leading-none text-brand-black"
        >
          {label}
        </label>
      )}

      <div className="flex items-end gap-3 border-b border-grey-4 pb-3">
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
          className={`text-heading-20-b min-w-0 flex-1 text-brand-black placeholder:text-grey-4 outline-none ${className}`}
        />
        <button
          type="button"
          onClick={onVerify}
          disabled={verifyDisabled || disabled}
          className="text-body-18-m h-[37px] w-[86px] shrink-0 rounded-[20px] bg-grey-7 leading-[33px] tracking-[-0.09px] text-grey-6"
        >
          {verifyLabel}
        </button>
      </div>
    </div>
  );
};

export default AccountNumberInput;
