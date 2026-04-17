import { ArrowDownToLine, Share2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "@/common/components/button/Button";
import Header from "@/common/components/header/Header";
import {
  getHouseHistory,
  getHouseStatus,
} from "@/common/lib/api/house/api-server";
import { SpringApiError } from "@/common/lib/api/server-spring-fetch";
import ActionSection from "./_components/ActionSection";
import ProgressBar from "./_components/ProgressBar";
import ReportCard from "./_components/ReportCard";
import ReportHistory from "./_components/ReportHistory";
import ReportHouse from "./_components/ReportHouse";
import { getCurrentSeason } from "./_lib/getCurrentSeason";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const kidId = resolvedSearchParams.kidId;
  const paidAt = resolvedSearchParams.paidAt;

  try {
    const [report, historyData] = await Promise.all([
      getHouseStatus(kidId, paidAt),
      getHouseHistory(kidId, paidAt),
    ]);

    if (!report) {
      return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center py-10 px-6">
          <h1 className="text-heading-24-b mb-4">리포트를 찾을 수 없어요</h1>
          <p className="mb-6 text-center text-body-16-m text-grey-6 break-keep">
            해당 아이의 청약 리포트를 찾을 수 없습니다. 아이 정보가 올바르게
            입력되었는지 확인해주세요.
          </p>
        </main>
      );
    }

    if (report?.level === 0) {
      return (
        <main>
          <Header type="sub" />
          <div className="pt-5 pb-10 px-6">
            <h1 className="text-heading-24-b mb-3">
              {report.kidName}의 청약리포트
            </h1>
            <ProgressBar level={0} gauge={0} />
            <ReportHouse level={0} season={getCurrentSeason(paidAt)} />
            <ActionSection isLevelZero={true} />
          </div>
          <ActionSection isLevelZero={true} kid={kidId} />
        </main>
      );
    }

    const histories = historyData.histories;
    const { level, gauge } = report;
    const currentSeason = getCurrentSeason(paidAt);

    return (
      <main>
        <Header type="sub" />
        <div className="pt-5 pb-10 px-6">
          <h1 className="text-heading-24-b mb-3">
            {report.kidName}의 청약리포트
          </h1>
          <ProgressBar level={level} gauge={gauge} />
          <ReportHouse level={level} season={currentSeason} />

          <div className="mb-5 mt-2 grid grid-cols-2 gap-4">
            <ReportCard
              label="총 납입 회차"
              value={report.totalCount ?? 0}
              unit="회"
            />
            <ReportCard
              label="이번 납입 금액"
              value={report.monthlyPayment ? report.monthlyPayment / 10000 : 0}
              unit="만원"
            />
          </div>

          {report.message && (
            <div className="mb-5 rounded-2xl bg-[#FFF2CA] break-keep p-4 text-center text-body-16-m-2">
              {report.message}
            </div>
          )}

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

          <ActionSection isLevelZero={false} />
        </div>
      </main>
    );
  } catch (error) {
    if (error instanceof SpringApiError) {
      if (error.status === 401) {
        redirect("/login");
      }

      if (error.status === 400 || error.status === 403) {
        return (
          <main className="flex min-h-[60vh] flex-col items-center justify-center py-10 px-6">
            <h1 className="text-heading-24-b mb-4">접근할 수 없어요</h1>
            <p className="mb-6 text-center text-body-16-m text-grey-6 break-keep">
              {error.status === 403
                ? "해당 리포트를 열람할 수 있는 권한이 없습니다."
                : "잘못된 요청입니다. (아이 정보가 누락되었어요)"}
            </p>

            <Button size="L" variant="active">
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </main>
        );
      }
    }

    throw error;
  }
}

export default Page;
