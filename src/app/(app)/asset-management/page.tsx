import { redirect } from "next/navigation";
import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";
import { getUserRole } from "@/common/lib/auth/get-user-role";
import AssetManagementClientPage, {
  type AssetAIRecommendation,
  type AssetSummary,
} from "./AssetManagementClientPage";

export default async function Page() {
  let initialData: AssetSummary | null = null;
  let initialAiData: AssetAIRecommendation | null = null;
  const memberRole = await getUserRole();
  if (memberRole === "KID") {
    redirect("/");
  }

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

  if (assetResult.status === "fulfilled" && assetResult.value?.data) {
    // 자산 요약 데이터 처리
    initialData = assetResult.value.data;
  }

  if (aiResult.status === "fulfilled" && aiResult.value?.data) {
    // AI 추천 데이터 처리
    initialAiData = aiResult.value.data;
  }

  return (
    <AssetManagementClientPage
      initialData={initialData}
      initialAiData={initialAiData}
      userRole={memberRole}
    />
  );
}
