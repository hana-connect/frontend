"use client";

import type React from "react";
import { RadioGroupItem } from "../radio-group/RadioGroup";

type ItemCardProps = {
  title: string;
  subTitle: string;
  isPurple?: boolean;
  className?: string;
  hasRadio?: boolean;
  value?: string;
  rightContent?: React.ReactNode;
  onClickCard?: () => void;
};

const ItemCard = ({
  title,
  subTitle,
  isPurple = false,
  className = "",
  hasRadio = false,
  value,
  rightContent,
  onClickCard,
}: ItemCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input")) {
      return;
    }
    onClickCard?.();
  };

  const Component = "div";

  return (
    <Component
      onClick={handleCardClick}
      className={`
        w-full h-19 flex items-center justify-between
        py-3 px-6 border border-grey-5 rounded-3xl text-left text-body-16-m
        ${isPurple ? "bg-brand-purple-3" : "bg-grey-9"}
        ${className}
      `}
    >
      <div className="flex flex-col gap-1 pointer-events-none">
        <span className="text-black leading-none">{title}</span>
        <span className="text-grey-6 leading-none">{subTitle}</span>
      </div>

      <div className="flex items-center gap-2 text-black">
        {rightContent}
        {hasRadio && value && <RadioGroupItem value={value} id={value} />}
      </div>
    </Component>
  );
};

export default ItemCard;
