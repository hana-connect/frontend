"use client";
import Image from "next/image";

type BubbleProps = {
  message: string;
  parentProfile: {
    src: string;
    alt: string;
  };
};

const Bubble = ({ message, parentProfile }: BubbleProps) => {
  return (
    <div
      className="w-full h-46.25 flex items-center justify-end px-5"
      style={{
        background: "linear-gradient(135deg, #FFF3FF 12%, #F1F8FF 88%)",
      }}
    >
      <div className="flex items-start gap-4">
        <div className="relative max-w-60 bg-[#E5D7FF] px-4 py-3 rounded-[20px] rounded-tr-none flex items-center justify-center">
          <p className="text-[16px] text-[#555555] font-medium leading-[1.4] text-left break-all">
            {message}
          </p>
          <div className="absolute top-0 -right-[12.5px] w-4 h-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M0 0H10.5C12 0 13 1 12 2L0 13V0Z" fill="#E5D7FF" />
            </svg>
          </div>
        </div>

        <div className="relative w-13 h-13 shrink-0">
          <Image
            src={parentProfile.src}
            alt={parentProfile.alt}
            fill
            sizes="52px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Bubble;
