import { serverSpringFetch } from "@/common/lib/api/server-spring-fetch";
import AssetManagementClientPage from "./AssetManagementClientPage";

export default async function Page() {
  let initialData = null;
  let initialAiData = null;

  try {
    const [assetRes, aiRes] = await Promise.all([
      serverSpringFetch<any>("/api/assets/summary", {
        // 타입을 일단 any로 해서 편하게 상자를 열게요!
        method: "GET",
        cache: "no-store",
      }),
      serverSpringFetch<any>("/api/assets/recommendation", {
        method: "GET",
        cache: "no-store",
      }),
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
