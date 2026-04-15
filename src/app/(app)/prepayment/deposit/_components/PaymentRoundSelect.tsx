"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select";

type PaymentRoundSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function PaymentRoundSelect({
  value,
  onChange,
}: PaymentRoundSelectProps) {
  const rounds = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <p className="mb-6 text-xl font-bold leading-[1.4] text-brand-black">
        납입회차수 선택
      </p>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="
            w-full rounded-none border-0 border-b 
            px-0 pb-3 pt-0 h-auto min-h-0
            text-left shadow-none ring-0 outline-none
            focus:ring-0 focus:ring-offset-0 focus:outline-none
            focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent
            data-[placeholder]:text-[#CCCCCC]
            font-bold text-xl text-brand-black
          "
        >
          <SelectValue placeholder="선택" className="text-brand-black" />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={8}
          className="
            w-[var(--radix-select-trigger-width)]
            overflow-hidden rounded-[20px]
            border border-[#ECECEC] bg-white p-0
            shadow-[0_4px_16px_rgba(0,0,0,0.08)]
          "
        >
          <div className="max-h-[240px] overflow-y-auto">
            {rounds.map((num) => (
              <SelectItem
                key={num}
                value={String(num)}
                className="
                  h-[42px] cursor-pointer
                  border-b border-[#F2F2F2]
                  px-5 py-0
                  text-xl font-medium text-brand-black
                  outline-none
                  last:border-b-0
                  focus:bg-transparent
                "
              >
                {num}회
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
