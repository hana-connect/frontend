"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/common/components/button/Button";

type RegisterCompleteProps = {
  accountNumber: string;
  linkedAt: string;
};

const RegisterComplete = ({
  accountNumber,
  linkedAt,
}: RegisterCompleteProps) => {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 w-full px-6 flex flex-col items-center pt-25 text-center">
        <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />
        <h1 className="text-body-20-m text-brand-black mt-6">
          계좌 등록이
          <br />
          완료되었어요!
        </h1>
        <div className="w-full h-[0.8px] bg-grey-5 mt-12" aria-hidden="true" />
        <div className="mt-6 w-full flex justify-between text-body-16-m text-grey-6 pb-4">
          <span>계좌번호</span>
          <span className="text-brand-black">{accountNumber}</span>
        </div>
        <div className="w-full flex justify-between text-body-16-m text-grey-6">
          <span>등록일</span>
          <span className="text-brand-black">{linkedAt}</span>
        </div>
      </div>

      <div className="w-full px-6 pb-9">
        <Button
          size="L"
          variant="active"
          onClick={() => router.push("/wallet")}
        >
          확인
        </Button>
      </div>
    </main>
  );
};

export default RegisterComplete;
