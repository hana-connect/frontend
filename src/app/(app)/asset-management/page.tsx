import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";
import AssetManagementClientPage, {
  type AssetAIRecommendation,
  type AssetSummary,
} from "./AssetManagementClientPage";

export default async function Page() {
  let initialData: AssetSummary | null = null;
  let initialAiData: AssetAIRecommendation | null = null;

  const [assetResult, aiResult] = await Promise.allSettled([
    serverSpringFetch<{ data: AssetSummary }>("/api/assets/summary", {
      method: "GET",
      cache: "no-store",
    }),
    serverSpringFetch<{ data: AssetAIRecommendation }>(
      "/api/assets/recommendation",
      {
        method: "GET",
        cache: "no-store",
      },
    ),
  ]);

  // 자산 요약 데이터 처리
  if (assetResult.status === "fulfilled" && assetResult.value?.data) {
    initialData = assetResult.value.data;
  } else if (assetResult.status === "rejected") {
    console.error("자산 요약 로드 실패:", assetResult.reason);
  }

  // AI 추천 데이터 처리
  if (aiResult.status === "fulfilled" && aiResult.value?.data) {
    initialAiData = aiResult.value.data;
  } else if (aiResult.status === "rejected") {
    console.error("AI 추천 로드 실패:", aiResult.reason);
  }

  return (
    <AssetManagementClientPage
      initialData={initialData}
      initialAiData={initialAiData}
    />
  );
}
