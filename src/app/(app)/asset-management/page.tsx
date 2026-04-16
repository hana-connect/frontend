import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";
import AssetManagementClientPage, {
  type AssetAIRecommendation,
  type AssetSummary,
} from "./AssetManagementClientPage";

export default async function Page() {
  let initialData = null;
  let initialAiData = null;

  try {
    const [assetRes, aiRes] = await Promise.all([
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

    if (assetRes?.data) initialData = assetRes.data;
    if (aiRes?.data) initialAiData = aiRes.data;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }

  return (
    <AssetManagementClientPage
      initialData={initialData}
      initialAiData={initialAiData}
    />
  );
}
