import { PlusIcon } from "lucide-react";
import Image from "next/image";
import type {
  MainAccountInfo,
  UserRole,
} from "@/app/(app)/wallet/(main)/_types";
import Button from "@/common/components/button/Button";

type TopRegisterSectionProps = {
  role: UserRole;
  mainAccountInfo?: MainAccountInfo;
};

function TopRegisterSection({
  role,
  mainAccountInfo,
}: TopRegisterSectionProps) {
  const isChild = role === "KID";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full border border-grey-5 bg-white"
        >
          <PlusIcon className="text-brand-purple-1" strokeWidth={3} />
        </button>
        <p className="text-body-16-m text-grey-6">계좌 등록하기</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full border border-grey-5 bg-white">
            {isChild ? (
              <Image
                src="/svg/wallet/ic_card.svg"
                alt="아이부자카드"
                width={44}
                height={44}
              />
            ) : (
              <Image
                src="/svg/ic_hana_logo.svg"
                alt="하나은행"
                width={44}
                height={44}
              />
            )}
          </div>

          <div className="min-w-0">
            {isChild ? (
              <>
                <p className="text-body-16-m text-black">아이부자카드</p>
                <p className="mt-1 text-body-16-m text-grey-6">
                  아직 카드가 없어요.
                </p>
              </>
            ) : mainAccountInfo ? (
              <>
                <p className="text-body-16-m text-black">
                  충전계좌 {mainAccountInfo.bankName}
                </p>
                <p className="mt-1 text-body-16-m text-grey-6">
                  {mainAccountInfo.accountNumber}
                </p>
              </>
            ) : null}
          </div>
        </div>

        <Button size="S" variant="smallGray" className="shrink-0">
          {isChild ? "카드신청" : "충전"}
        </Button>
      </div>
    </div>
  );
}

export default TopRegisterSection;
