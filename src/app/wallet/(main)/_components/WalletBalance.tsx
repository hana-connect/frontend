import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import Button from "@/common/components/button/Button";

function WalletBalance() {
  const amount = 1234567;
  const role = "PARENT";

  return (
    <>
      <div className="flex items-center justify-between rounded-2xl pt-5 pb-7 m-0">
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
      {role === "PARENT" && (
        <section className="flex items-center gap-2">
          <Button variant="smallGray" size="M" className="flex-1">
            송금
          </Button>
          <Button variant="smallGray" size="M" className="flex-1">
            용돈 지급
          </Button>
        </section>
      )}
      <div className="border-b-[1px] border-grey-5" />
    </>
  );
}

export default WalletBalance;
