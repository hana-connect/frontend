import Image from "next/image";
import accountRegisterImage from "@/app/wallet/register/_assets/icons/account-register.svg";
import Header from "@/common/components/header/Header";
import IrpCard from "./components/irp-card";
import RegisterInfoBanner from "./components/register-info-banner";

type RegisterIntroProps = {
  onNext: () => void;
};

type ViewType = "child" | "parent";

const introViewContent: Record<
  ViewType,
  { bannerTitle: string; showIrpCard: boolean }
> = {
  child: {
    bannerTitle: "원픽 통장이란?",
    showIrpCard: false,
  },
  parent: {
    bannerTitle: "IRP의 장점은 무엇인가요?",
    showIrpCard: true,
  },
};

const RegisterIntro = ({ onNext }: RegisterIntroProps) => {
  const viewType: ViewType = "parent";

  const { bannerTitle, showIrpCard } = introViewContent[viewType];

  return (
    <>
      <Header type="sub" title="계좌 등록하기" />
      <RegisterInfoBanner title={bannerTitle} />
      <div className="flex flex-1 flex-col">
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
        {showIrpCard && (
          <div className="mt-2.75 px-6">
            <p className="text-body-16-m text-left text-brand-black">
              연금 계좌 등록하고 퀴즈 풀면
              <br />
              적립금 넣어드려요!
            </p>
          </div>
        )}
        {showIrpCard && (
          <div className="mt-auto px-6 pb-9">
            <div className="flex flex-col gap-2">
              <IrpCard />
              <p className="text-left text-[12px] text-grey-6">
                자세한 내용은 하나은행 퇴직연금 전용 고객센터 1599-2080
              </p>
            </div>
          </div>
        )}
        {!showIrpCard && (
          <div className="mt-14.25 pl-6">
            <div className="flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-2">
                <h2 className="text-body-16-m text-brand-black">
                  충전계좌 등록 안내
                </h2>
                <ul className="text-body-16-m list-disc pl-6 text-grey-6">
                  <li>입출금 계좌만 등록할 수 있어요.</li>
                  <li>만 14세 미만은 하나은행 계좌만 등록할 수 있어요.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <p className="text-body-16-m text-brand-black">
                  계좌가 없다면?
                </p>
                <p className="text-body-16-m pr-8.25 text-grey-6">
                  아이부자 앱에서{" "}
                  <span className="text-brand-purple-4">비대면 계좌개설</span>로
                  하나은행 계좌를 만들 수 있어요.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterIntro;
