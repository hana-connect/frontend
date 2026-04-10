"use client";

import type React from "react";

type ButtonSize = "L" | "M" | "S";
type ButtonVariant =
  | "outline"
  | "disabled"
  | "active"
  | "purpleOutline"
  | "gray"
  | "lightPurple"
  | "darkGray"
  | "smallPurple"
  | "smallGray";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size: ButtonSize;
  variant: ButtonVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

const Button = ({
  size,
  variant,
  icon,
  children,
  className = "",
  type = "button",
  disabled: disabledProp,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "flex items-center justify-center rounded-[20px] transition-all leading-none font-medium shrink-0";

  const sizeStyles = {
    L: "h-[60px] text-[20px] w-full",
    M: "h-[50px] text-[16px] w-full",
    S: "h-[28px] text-[16px] px-[10px] py-[6px] w-fit",
  };

  const variantStyles = {
    outline: "bg-white border border-[#ECECEC] text-[16px] text-[#777777]",
    disabled: "bg-[#DEDEDE] text-white",
    active: "bg-[#9C6FFE] text-white",
    purpleOutline: "bg-white border-[2px] border-[#9C6FFE] text-[#9C6FFE]",

    gray: "bg-[#F9F9F9] border border-[#ECECEC] text-[#777777]",
    lightPurple: "bg-[#9C6FFE] text-white text-[18px]",
    darkGray: "bg-[#F6F6F6] text-[#000000] text-[20px]",

    smallPurple: "bg-[#FCFCFC] text-[#493963]",
    smallGray: "bg-[#F6F6F6] text-[#555555]",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={variant === "disabled" || disabledProp}
      {...props}
    >
      <div
        className={`flex items-center ${variant === "outline" ? "gap-5" : "gap-0"}`}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </div>
    </button>
  );
};

export default Button;
