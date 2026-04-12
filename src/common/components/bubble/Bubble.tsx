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

          <div
            className="absolute top-0 -right-3.5 w-0 h-0"
            style={{
              borderTop: "15px solid #E5D7FF",
              borderRight: "15px solid transparent",
              borderLeft: "0px solid transparent",
            }}
          />
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
