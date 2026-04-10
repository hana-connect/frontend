"use client";

import type React from "react";
import { type ChangeEvent, useId } from "react";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  rightLabel?: string;
  isNumber?: boolean;
};

const Input = ({
  label,
  rightLabel,
  isNumber = false,
  value,
  onChange,
  placeholder,
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
      <div className="flex justify-between items-end mb-6">
        <label
          htmlFor={inputId}
          className="text-[20px] font-bold text-black leading-none"
        >
          {label}
        </label>
        {rightLabel && (
          <span className="text-[16px] text-[#8D839D] border-b border-[#8D839D] pb-px leading-none">
            [{rightLabel}]
          </span>
        )}
      </div>

      <div className="relative flex flex-col">
        <input
          {...props}
          id={inputId}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          inputMode={isNumber ? "numeric" : "text"}
          className="w-full text-[20px] text-black placeholder:text-[#CCCCCC] outline-none border-b border-[#CCCCCC] pb-3 font-bold"
        />
      </div>
    </div>
  );
};

export default Input;
