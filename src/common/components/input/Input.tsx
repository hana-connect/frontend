"use client";

import type React from "react";
import { type ChangeEvent, useId } from "react";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  rightLabel?: string;
  onRightLabelClick?: () => void;
  isNumber?: boolean;
};

const Input = ({
  label,
  rightLabel,
  onRightLabelClick,
  isNumber = false,
  value,
  onChange,
  placeholder,
  className = "",
  type,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  const formatNumber = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      const formattedValue = formatNumber(e.target.value);
      e.target.value = formattedValue;
    }
    if (onChange) onChange(e);
  };

  return (
    <div className="w-full flex flex-col">
      {(label || rightLabel) && (
        <div className="flex justify-between items-end mb-6">
          {label ? (
            <label
              htmlFor={inputId}
              className="text-[20px] font-bold text-black leading-none"
            >
              {label}
            </label>
          ) : (
            <div />
          )}

          {rightLabel && (
            <button
              type="button"
              onClick={onRightLabelClick}
              className="text-[16px] text-[#8D839D] border-b border-[#8D839D] pb-px leading-none"
            >
              [{rightLabel}]
            </button>
          )}
        </div>
      )}

      <div className="relative flex flex-col">
        <input
          {...props}
          id={inputId}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type={isNumber ? "text" : type || "text"}
          inputMode={isNumber ? "numeric" : "text"}
          className={`w-full text-[20px] text-black placeholder:text-[#CCCCCC] outline-none border-b border-[#CCCCCC] pb-3 font-bold ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;
