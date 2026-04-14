import { ChevronRight } from "lucide-react";
import Image from "next/image";
import wonderIcon from "@/app/wallet/register/_assets/icons/wonder.svg";

type RegisterInfoBannerProps = {
  title: string;
};

const RegisterInfoBanner = ({ title }: RegisterInfoBannerProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between bg-brand-purple-3 px-6 py-4"
    >
      <div className="flex items-center gap-3">
        <Image src={wonderIcon} alt="" width={19} height={19} />
        <span className="text-body-16-m text-brand-black">{title}</span>
      </div>
      <ChevronRight size={24} className="text-brand-black" />
    </button>
  );
};

export default RegisterInfoBanner;
