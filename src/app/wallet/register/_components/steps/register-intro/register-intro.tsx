import Image from "next/image";
import accountRegisterImage from "@/app/wallet/register/_assets/icons/account-register.svg";
import Header from "@/common/components/header/Header";
import IrpCard from "./components/irp-card";
import RegisterInfoBanner from "./components/register-info-banner";

interface Props {
  onNext: () => void;
}

const RegisterIntro = ({ onNext }: Props) => {
  return (
    <>
      <Header type="sub" title="계좌 등록하기" />
      <RegisterInfoBanner title="원픽 통장이란?" />
      <div className="mt-9 px-6">
        <button type="button" onClick={onNext} className="block w-full">
          <Image
            src={accountRegisterImage}
            alt="계좌 등록 안내"
            className="h-auto w-full"
            priority
          />
        </button>
      </div>
      <div className="mt-6 px-6">
        <IrpCard />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6"></div>
    </>
  );
};

export default RegisterIntro;
