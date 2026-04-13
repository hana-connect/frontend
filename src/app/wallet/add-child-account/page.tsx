"use client";

import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import Input from "@/common/components/input/Input";

const AddChildAccountPage = () => {
  const _isCompleted = false;

  return (
    <>
      <Header type="sub" title="아이 계좌 추가하기" />
      <div className="flex min-h-[calc(100vh-60px)] flex-col bg-white">
        <div className="pt-7 pb-7 pl-6">
          <h1 className="text-heading-24-b text-brand-black">
            김채현님의 계좌를 추가합니다.
          </h1>
          <p className="text-body-20-m mt-4 text-grey-6">
            앞으로 아이의 계좌를
            <br />
            간편하게 확인할 수 있어요.
          </p>
        </div>

        <main className="flex flex-1 flex-col px-6">
          <Input placeholder="계좌 별명" />

          <div className="mt-9">
            <Input placeholder="계좌번호" />
          </div>

          <div className="mt-auto pb-9">
            <Button size="L" variant="active">
              추가하기
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddChildAccountPage;
