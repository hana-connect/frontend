"use client";

import Image from "next/image";

type CouponBannerProps = {
  totalCount: number;
};

export default function CouponBanner({ totalCount }: CouponBannerProps) {
  const totalYears = Math.floor(totalCount / 12);

  const currentCycleYears =
    totalYears > 0 && totalYears % 5 === 0 ? 5 : totalYears % 5;

  return (
    <div className="mt-4 flex flex-col gap-2 items-center justify-between rounded-2xl bg-grey-3 p-5">
      <div className="text-body-16-m">
        <span className="text-brand-purple-1">5년 연속 납입</span>
        마다 먹깨비 쿠폰을 드려요
      </div>

      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((step) => {
          const isFilled = step <= currentCycleYears;
          const isLast = step === 5;

          return (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-13 w-13 items-center justify-center rounded-full border-3 border-dotted
                  ${isFilled ? "border-brand-purple-1" : "border-grey-4"}`}
              >
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full text-title-20-sb
                    ${
                      isFilled
                        ? "bg-brand-purple-2 text-brand-purple-1"
                        : "bg-white text-grey-4"
                    }
                    ${!isLast ? "overflow-hidden" : ""}`}
                >
                  {isLast ? (
                    <div className="absolute top-1/2 left-1/2 w-11 h-11 -translate-x-1/2 -translate-y-1/2 drop-shadow-sm">
                      <Image
                        src="/svg/house/ic_coupon.svg"
                        width={33}
                        height={23}
                        alt="먹깨비 쿠폰"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    step
                  )}
                </div>
              </div>

              {!isLast && <div className="h-[1.8px] w-1.5 bg-grey-4" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
