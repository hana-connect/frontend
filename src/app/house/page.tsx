import { ArrowDownToLine, Share2 } from "lucide-react";
import Button from "@/common/components/button/Button";
import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";
import ProgressBar from "./_components/ProgressBar";
import ReportCard from "./_components/ReportCard";
import ReportHistory from "./_components/ReportHistory";
import ReportHouse from "./_components/ReportHouse";

type HouseStatusResponse = {
  status: number;
  message: string;
  data: {
    memberId: number;
    level: number;
    gauge: number;
    totalCount: number | null;
    monthlyPayment: number | null;
    startDate: string | null;
    message: string | null;
  };
};

async function Page() {
  const result = await serverSpringFetch<HouseStatusResponse>(
    "/api/house/status",
    {
      method: "GET",
    },
  );

  const report = result.data;
  const level = report.level;
  const gauge = report.gauge;

  return (
    <main className="py-10 px-6">
      <h1 className="text-heading-24-b mb-3">별돌이의 청약리포트</h1>
      <ProgressBar level={level} month={gauge} />
      <ReportHouse level={level} season="winter" />

      {level === 0 ? (
        <>
          <div className="bg-[#FFF2CA] p-4 rounded-2xl mb-5 text-body-16-m-2 text-center">
            아직 주택청약이 없어요. 얼른 집을 지어봐요!
          </div>
          <section>
            <p className="text-center text-body-16-m-2 mb-5">
              미리미리 집을 준비하기 위한 퀴즈에 도전해볼까요?
            </p>
            <Button size="L" variant="active">
              금융 퀴즈 풀러가기
            </Button>
          </section>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mt-2 mb-5">
            <ReportCard
              label="총 납입 회차"
              value={report.totalCount ?? 0}
              unit="회"
            />
            <ReportCard
              label="이번 납입 금액"
              value={report.monthlyPayment ?? 0}
              unit="원"
            />
          </div>

          <div className="bg-[#FFF2CA] break-keep p-4 rounded-2xl mb-5 text-body-16-m-2 text-center">
            {report.message}
          </div>

          <ReportHistory />

          <section className="flex gap-10 justify-center mb-10">
            <div className="flex flex-col items-center gap-3">
              <Share2 size={26} className="text-grey-6" />
              <p className="text-body-16-m text-grey-6">공유하기</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ArrowDownToLine size={26} className="text-grey-6" />
              <p className="text-body-16-m text-grey-6">다운로드</p>
            </div>
          </section>

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
        </>
      )}
    </main>
  );
}

export default Page;
