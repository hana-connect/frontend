"use client";

import { Check, CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Bubble from "@/common/components/bubble/Bubble";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import { cn, getTodayDateKST } from "@/common/lib/utils";

const DUMMY_PARENTS = [
  { id: 1, name: "한수정", img: "/svg/ic_mom1.svg" },
  { id: 2, name: "김도이이", img: "/svg/ic_mom2.svg" },
  { id: 3, name: "유지현유지현지현", img: "/svg/ic_mom1.svg" },
];

const RequestPage = () => {
  const [step, setStep] = useState(1);
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const isEnabled = selectedParent !== null && message.trim().length > 0;

  const handleSend = () => {
    if (isEnabled) setStep(2);
  };

  // 요청
  if (step === 1) {
    return (
      <main className="min-h-screen bg-white overflow-y-auto pb-32">
        <Header type="sub" title="아이 계좌번호 요청하기" />

        <section>
          <h1 className="text-title-24-sb text-black p-5">
            요청할 멤버를 선택해주세요.
          </h1>
          <div className="mt-4 flex items-center gap-2 px-6">
            <h2 className="text-[18px] font-semibold text-black">
              부모 {DUMMY_PARENTS.length}
            </h2>
            <CircleQuestionMark size={20} className="text-[#333]" />
          </div>

          <div className="mt-4 px-6">
            {DUMMY_PARENTS.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {DUMMY_PARENTS.map((parent) => (
                  <button
                    type="button"
                    key={parent.id}
                    onClick={() => setSelectedParent(parent.id)}
                    aria-pressed={selectedParent === parent.id}
                    aria-label={`${parent.name} 선택`}
                    className={cn(
                      "flex flex-col items-center gap-3 px-1 py-4 rounded-[20px] bg-grey-9 transition-all shrink-0 w-35 border-grey-5 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple-3/50",
                    )}
                  >
                    <div className="relative size-20 shrink-0">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                        <Image
                          src={parent.img}
                          alt={parent.name}
                          fill
                          className="object-cover"
                        />
                        {selectedParent === parent.id && (
                          <div className="absolute inset-0 bg-brand-purple-background/90 flex items-center justify-center z-10">
                            <Check
                              size={40}
                              className="text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                        )}
                      </div>

                      <div className="absolute -bottom-1 -right-1 size-6.25 rounded-full bg-[#2F195A] flex items-center justify-center z-10">
                        <span className="text-[12px] font-semibold text-white leading-none">
                          부모
                        </span>
                      </div>
                    </div>

                    <span className="text-body-14-m text-black">
                      {parent.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-37.5 w-full flex-col items-center justify-center text-body-16-m-2 text-grey-6">
                아이와 연결된 부모가 없습니다.
              </div>
            )}
          </div>
        </section>

        <section className="mt-14 px-6">
          <div className="flex items-center gap-1">
            <h2
              id="request-message-title"
              className="text-title-20-sb text-black"
            >
              요청 메시지 보내기
            </h2>
            <span className="text-body-16-m-2 text-grey-6">(50자 이내)</span>
          </div>
          <textarea
            id="request-message"
            name="message"
            aria-labelledby="request-message-title"
            className="mt-4 block h-32 w-full rounded-[20px] bg-grey-9 border-none p-4 font-body-16-m text-black placeholder:text-grey-6 focus:ring-1 focus:ring-brand-purple-1 outline-none resize-none"
            placeholder="메시지를 입력해주세요."
            maxLength={50}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </section>

        <div className="fixed bottom-9 left-6 right-6">
          <Button
            size="L"
            variant={isEnabled ? "active" : "disabled"}
            onClick={handleSend}
            disabled={!isEnabled}
          >
            보내기
          </Button>
        </div>
      </main>
    );
  }

  // 완료
  const targetParent = DUMMY_PARENTS.find((p) => p.id === selectedParent);
  const todayDate = getTodayDateKST();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center overflow-y-auto pb-32">
      <div className="flex-1 w-full px-6 flex flex-col items-center pt-25 text-center">
        <Image src="/svg/ic_check.svg" alt="성공" width={72} height={72} />
        <h1 className="text-body-20-m text-black mt-6">
          {targetParent?.name}님께
          <br />
          계좌번호를 요청했어요!
        </h1>
        <div className="w-full h-[0.8px] bg-grey-5 mt-12" aria-hidden="true" />
        <div className="mt-6 w-full flex justify-between text-body-16-m text-grey-6 pb-4">
          <span>요청일</span>
          <span className="text-black">{todayDate}</span>
        </div>
        <div className="mt-10 w-full">
          <Bubble
            message={message}
            parentProfile={{
              src: targetParent?.img || "",
              alt: targetParent?.name || "부모님",
            }}
          />
        </div>
      </div>

      <div className="fixed bottom-9 left-6 right-6">
        <Button size="L" variant="active" onClick={() => router.push("/")}>
          확인
        </Button>
      </div>
    </main>
  );
};

export default RequestPage;
