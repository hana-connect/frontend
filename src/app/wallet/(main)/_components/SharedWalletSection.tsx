import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import Button from "@/common/components/button/Button";

type SharedWallet = {
  id: number;
  name: string;
  imageSrc: string;
  statusText: string;
};

async function getSharedWallets(): Promise<SharedWallet[]> {
  return [
    {
      id: 1,
      name: "김엄마",
      imageSrc: "/images/profile.png",
      statusText: "잔액과 내역 공유 중",
    },
    {
      id: 2,
      name: "김엄마",
      imageSrc: "/images/profile.png",
      statusText: "잔액과 내역 공유 중",
    },
    {
      id: 3,
      name: "김엄마",
      imageSrc: "/images/profile.png",
      statusText: "잔액과 내역 공유 중",
    },
  ];
}

async function SharedWalletSection() {
  const wallets = await getSharedWallets();

  if (wallets.length === 0) {
    return null;
  }

  return (
    <section className="pb-8">
      <div className="flex items-center gap-3">
        <h2 className="text-heading-24-b">내 지갑 같이보기</h2>
        <CircleQuestionMark size={20} className="mt-1 text-grey-1" />
      </div>

      <div className="mt-6 space-y-5">
        {wallets.map((wallet) => (
          <SharedWalletRow key={wallet.id} wallet={wallet} />
        ))}
      </div>
    </section>
  );
}

type SharedWalletRowProps = {
  wallet: SharedWallet;
};

function SharedWalletRow({ wallet }: SharedWalletRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-full border border-grey-5">
          <Image
            src="/svg/ic_mom1.svg"
            alt={`${wallet.name} 프로필`}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="text-body-16-m text-black">{wallet.name}</p>
          <p className="mt-2 text-body-16-m text-brand-purple-1">
            {wallet.statusText}
          </p>
        </div>
      </div>

      <Button size="S" variant="smallGray" className="shrink-0">
        설정
      </Button>
    </div>
  );
}

export default SharedWalletSection;
