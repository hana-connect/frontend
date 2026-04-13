import Button from "@/common/components/button/Button";
import ProgressBar from "./_components/ProgressBar";
import ReportCard from "./_components/ReportCard";
import ReportHistory from "./_components/ReportHistory";
import ReportHouse from "./_components/ReportHouse";
import ReportSummary from "./_components/ReportSummary";

function page() {
  return (
    <main className="py-10 px-6">
      <h1 className="text-heading-24-b">별돌이의 청약리포트</h1>
      <ProgressBar level={6} month={3} />
      <ReportHouse />
      <ReportCard />
      <ReportSummary />
      <ReportHistory />
      <section>
        <p>이번 달도 소중한 집을 지켰어요!</p>
        <Button size="L" variant="active">
          금융 퀴즈 풀러가기
        </Button>
      </section>
    </main>
  );
}

export default page;
