import Button from "@/common/components/button/Button";
import ProgressBar from "./_components/ProgressBar";
import ReportCard from "./_components/ReportCard";
import ReportHistory from "./_components/ReportHistory";
import ReportHouse from "./_components/ReportHouse";

function page() {
  return (
    <main className="py-10 px-6">
      <h1 className="text-heading-24-b mb-3">별돌이의 청약리포트</h1>
      <ProgressBar level={6} month={3} />
      <ReportHouse level={15} season="spring" />
      <div className="grid grid-cols-2 gap-4 mt-2 mb-5">
        <ReportCard label="총 납입 회차" value={28} unit="회" />
        <ReportCard label="이번 납입 금액" value={28} unit="만원" />
      </div>
      <div className="bg-[#FFF2CA] break-keep p-4 rounded-2xl mb-5 text-center">
        할머니가 놓아주신 이번 달 벽돌 덕분에 지붕이 한 뼘 더 높아졌어요! 28개월
        동안 한결같이 쌓인 이 단단한 마음이 우리 별돌이의 꿈을 지켜줄 거예요.
      </div>
      <ReportHistory />
      <section>
        <p className="text-center text-body-16-m-2 mb-5">
          이번 달도 소중한 집을 지켰어요!
          <br />
          진정한 내 집 마련 박사가 되기 위한
          <br />
          퀴즈에 도전해볼까요?
        </p>
        <Button size="L" variant="active">
          금융 퀴즈 풀러가기
        </Button>
      </section>
    </main>
  );
}

export default page;
