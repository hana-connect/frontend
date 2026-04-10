"use client";

import type React from "react";

type TextButtonVariant = "gray" | "purple";

type TextButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: TextButtonVariant;
  children: React.ReactNode;
};

const TextButton = ({
  variant,
  children,
  className = "",
  ...props
}: TextButtonProps) => {
  const variantStyles = {
    gray: "border-[#8D839D] text-[#8D839D] text-[16px]",
    purple: "border-[#9C6FFE] text-[#9C6FFE] text-[18px]",
  };

  return (
    <button
      type="button"
      className={`flex items-center justify-center border-b pb-px transition-all w-fit leading-none ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;
