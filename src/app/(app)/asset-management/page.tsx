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
    }).catch(() => null),
    serverSpringFetch<{ data: AssetAIRecommendation }>(
      "/api/assets/recommendation",
      {
        method: "GET",
        cache: "no-store",
      },
    ).catch(() => null),
  ]);

  // 자산 요약 데이터 처리
  if (assetResult.status === "fulfilled" && assetResult.value?.data) {
    initialData = assetResult.value.data;
  }

  // AI 추천 데이터 처리
  if (aiResult.status === "fulfilled" && aiResult.value?.data) {
    initialAiData = aiResult.value.data;
  }

  return (
    <AssetManagementClientPage
      initialData={initialData}
      initialAiData={initialAiData}
    />
  );
}
