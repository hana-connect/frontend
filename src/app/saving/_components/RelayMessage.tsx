"use client";

// ✅ [에러 해결] Props 인터페이스 정의
interface Props {
  message: string;
  onMessageChange: (val: string) => void;
  onShowHistory: () => void;
}

export default function RelayMessage({
  message,
  onMessageChange,
  onShowHistory,
}: Props) {
  // ✅ [에러 해결] recentMessages 데이터 정의 (정책 1-1.2)
  const recentMessages = [
    { id: 1, date: "2026.04.10", content: "우리 예쁜 손주" },
    { id: 2, date: "2026.04.10", content: "생일축하해~" },
    { id: 3, date: "2026.04.10", content: "파이팅!" },
  ];

  return (
    <section className="mt-10 px-6">
      {/* 제목 첫 줄 + 버튼 섹션 */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-black text-xl font-bold leading-8">
          미래의 아이가 볼
        </h2>
        <button
          type="button"
          onClick={onShowHistory}
          className="text-zinc-400 text-base font-normal underline leading-7 shrink-0"
        >
          [지난 작성 내역]
        </button>
      </div>

      {/* 제목 두 번째 줄 섹션 */}
      <div className="mb-10">
        <h2 className="text-black text-xl font-bold leading-8">
          감동의 릴레이 메시지를 작성해 주세요.
        </h2>
      </div>

      {/* 최근 메시지 내역 (정책 2) */}
      <div className="mb-10">
        <h3 className="text-black text-xl font-bold leading-6 mb-4">
          최근 메시지 내역
        </h3>
        <div className="bg-[#F9F9F9] rounded-[20px] p-5 space-y-3">
          {recentMessages.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-neutral-500 text-base font-normal leading-7">
                {item.date}
              </span>
              <span className="text-neutral-900 text-base font-normal leading-7">
                {item.content}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 메시지 입력창 (정책 3) */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-black text-xl font-bold leading-6">
            메시지 보내기
          </h3>
          <span className="text-neutral-600 text-sm font-medium leading-4">
            (10자 이내)
          </span>
        </div>
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => {
              // 10자까지만 자르기 (한글 조합 에러 방지)
              const val = e.target.value;
              if (val.length <= 10) {
                onMessageChange(val);
              } else {
                onMessageChange(val.slice(0, 10));
              }
            }}
            placeholder="메세지를 입력해주세요."
            // maxLength={10} 은 보조용으로 남겨두거나 제거해도 무방합니다.
            className="w-full h-14 bg-[#F9F9F9] rounded-[20px] px-6 py-4 text-neutral-900 text-base font-medium leading-6 outline-none border-none resize-none placeholder:text-neutral-400"
          />
          {/* 글자 수 표시 (정책 3) */}
          <div className="absolute right-4 bottom-[-24px] text-[17px] text-[#CCCCCC]">
            {message.length}/10
          </div>
        </div>
      </div>
    </section>
  );
}
