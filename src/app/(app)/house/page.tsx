import { ArrowDownToLine, Share2 } from "lucide-react";
import { redirect } from "next/navigation";
import Button from "@/common/components/button/Button";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import ProgressBar from "./_components/ProgressBar";
import ReportCard from "./_components/ReportCard";
import ReportHistory, { type HistoryItem } from "./_components/ReportHistory";
import ReportHouse from "./_components/ReportHouse";
import { getCurrentSeason } from "./_lib/getCurrentSeason";

type HouseStatusResponse = ApiResponse<{
  memberId: number;
  level: number;
  gauge: number;
  totalCount: number | null;
  monthlyPayment: number | null;
  startDate: string | null;
  message: string | null;
}>;

type HouseHistoryResponse = ApiResponse<{ histories: HistoryItem[] }>;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const kidId = resolvedSearchParams.kidId;
  const paidAt = resolvedSearchParams.paidAt;

  try {
    const params = new URLSearchParams();
    if (kidId) params.set("kidId", kidId);
    if (paidAt) params.set("paidAt", paidAt);

    const query = params.toString();

    const statusEndpoint = query
      ? `/api/house/status?${query}`
      : "/api/house/status";

    const historyEndpoint = query
      ? `/api/house/history?${query}`
      : "/api/house/history";

    const [statusResult, historyResult] = await Promise.all([
      serverSpringFetch<HouseStatusResponse>(statusEndpoint, {
        method: "GET",
        next: {
          tags: ["house-status"],
          revalidate: 3600,
        },
      }),
      serverSpringFetch<HouseHistoryResponse>(historyEndpoint, {
        method: "GET",
        next: {
          tags: ["house-history"],
          revalidate: 3600,
        },
      }),
    ]);

    const report = statusResult.data;
    const histories = historyResult.data.histories;
    const { level, gauge } = report;
    const currentSeason = getCurrentSeason();

    return (
      <main className="py-10 px-6">
        <h1 className="text-heading-24-b mb-3">별돌이의 청약리포트</h1>
        <ProgressBar level={level} gauge={gauge} />
        <ReportHouse level={level} season={currentSeason} />

        {level === 0 ? (
          <>
            <div className="mb-5 rounded-2xl bg-[#FFF2CA] p-4 text-center text-body-16-m-2">
              아직 주택청약이 없어요. 얼른 집을 지어봐요!
            </div>
            <section>
              <p className="mb-5 text-center text-body-16-m-2">
                미리미리 집을 준비하기 위한 퀴즈에 도전해볼까요?
              </p>
              <Button size="L" variant="active">
                금융 퀴즈 풀러가기
              </Button>
            </section>
          </>
        ) : (
          <>
            <div className="mb-5 mt-2 grid grid-cols-2 gap-4">
              <ReportCard
                label="총 납입 회차"
                value={report.totalCount ?? 0}
                unit="회"
              />
              <ReportCard
                label="이번 납입 금액"
                value={
                  report.monthlyPayment ? report.monthlyPayment / 10000 : 0
                }
                unit="만원"
              />
            </div>

            <div className="mb-5 rounded-2xl bg-[#FFF2CA] break-keep p-4 text-center text-body-16-m-2">
              {report.message}
            </div>

            <ReportHistory histories={histories} kidId={kidId} />

            <section className="mb-10 flex justify-center gap-10">
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
              <p className="mb-5 text-center text-body-16-m-2">
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
  } catch (error) {
    if (error instanceof SpringApiError) {
      if (error.status === 401) {
        redirect("/login");
      }

      if (error.status === 400) {
        console.error("kidId 누락 에러:", error.message);
      }

      if (error.status === 403) {
        console.error("접근 권한 에러:", error.message);
      }
    }

    throw error;
  }
}

export default Page;
