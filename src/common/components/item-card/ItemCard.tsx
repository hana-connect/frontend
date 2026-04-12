"use client";

import type React from "react";

type ItemCardProps = {
  title: string;
  subTitle: string;
  isPurple?: boolean;
  className?: string;
  hasRadio?: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightContent?: React.ReactNode;
  onClickCard?: () => void;
};

const ItemCard = ({
  title,
  subTitle,
  isPurple = false,
  className = "",
  hasRadio = false,
  name,
  value,
  checked,
  onChange,
  rightContent,
  onClickCard,
}: ItemCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // 버튼이나 인풋을 직접 누른 거면 카드 클릭 핸들러는 무시함
    if (target.closest("button") || target.closest("input")) {
      return;
    }
    onClickCard?.();
  };

  const Component = hasRadio ? "label" : "div";

  return (
    <Component
      onClick={!hasRadio ? handleCardClick : undefined}
      className={`
        w-full h-19 flex items-center justify-between
        py-3 px-6 border border-[#ECECEC] rounded-3xl text-left
        ${isPurple ? "bg-[#F5F1FB]" : "bg-[#F9F9F9]"}
        ${className}
      `}
    >
      <div className="flex flex-col gap-1 pointer-events-none">
        <span className="text-[16px] text-[#000000] font-medium leading-none">
          {title}
        </span>
        <span className="text-[16px] text-[#777777] leading-none">
          {subTitle}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[16px] text-[#000000] font-medium">
        {rightContent}

        {hasRadio && (
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className={`
              relative appearance-none w-6 h-6 shrink-0
              border border-[#ECECEC] rounded-full bg-white
              checked:border-[7px] checked:border-[#9C6FFE]
              webkit-tap-highlight-color-transparent
            `}
          />
        )}
      </div>
    </Component>
  );
};

export default ItemCard;
