import Image from "next/image";
import wonderIcon from "@/app/wallet/register/_assets/icons/wonder.svg";

interface Props {
  title: string;
}

const RegisterInfoBanner = ({ title }: Props) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between bg-brand-purple-3 px-6 py-4"
    >
      <div className="flex items-center gap-3">
        <Image src={wonderIcon} alt="" width={19} height={19} />
        <span className="text-body-16-m text-brand-black">{title}</span>
      </div>
      <Image src="/svg/Chevron_Right.svg" alt="" width={20} height={20} />
    </button>
  );
};

export default RegisterInfoBanner;
