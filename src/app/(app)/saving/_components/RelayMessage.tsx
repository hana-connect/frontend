"use client";

type RelayMessageProps = {
  message: string;
  onMessageChange: (val: string) => void;
  onShowHistory: () => void;
};

export default function RelayMessage({
  message,
  onMessageChange,
  onShowHistory,
}: RelayMessageProps) {
  const recentMessages = [
    { id: 1, date: "2026.04.10", content: "우리 예쁜 손주" },
    { id: 2, date: "2026.04.10", content: "생일축하해~" },
    { id: 3, date: "2026.04.10", content: "파이팅!" },
  ];

  return (
    <section className="mt-10 px-6">
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

      <div className="mb-10">
        <h2 className="text-black text-xl font-bold leading-8">
          감동의 릴레이 메시지를 작성해 주세요.
        </h2>
      </div>

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
            className="w-full h-14 bg-[#F9F9F9] rounded-[20px] px-6 py-4 text-neutral-900 text-base font-medium leading-6 outline-none border-none resize-none placeholder:text-neutral-400"
          />
          <div className="absolute right-4 -bottom-6 text-[17px] text-[#CCCCCC]">
            {message.length}/10
          </div>
        </div>
      </div>
    </section>
  );
}
