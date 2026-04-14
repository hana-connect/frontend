import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";

function WalletBalance() {
  const amount = 1234567;

  return (
    <div className="flex items-center justify-between rounded-2xl py-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-heading-24-b">
          <span>내 지갑 잔액</span>
          <CircleQuestionMark size={18} className="text-[#333]" />
        </div>

        <span className="text-[32px] text-heading-24-b">
          {amount.toLocaleString()}원
        </span>
      </div>
      <Image
        src="/svg/wallet/ic_wallet.svg"
        alt="wallet"
        width={90}
        height={90}
        className="object-contain"
      />
    </div>
  );
}

export default WalletBalance;
