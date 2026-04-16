import { redirect } from "next/navigation";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import LetterPageClient from "./_components/LetterPageClient";
import type { TerminatedDetailData } from "./_types";

type DetailResponse = ApiResponse<TerminatedDetailData>;

async function Page({ params }: { params: Promise<{ accountId: string }> }) {
  const { accountId } = await params;

  const getInitialData = async () => {
    try {
      const result = await serverSpringFetch<DetailResponse>(
        `/api/accounts/terminated-savings/${accountId}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      return result.data;
    } catch (error) {
      if (error instanceof SpringApiError && error.status === 401) {
        redirect("/login");
      }

      console.error("만기 적금 초기 로드 에러:", error);
      return null;
    }
  };

  const initialData = await getInitialData();

  if (!initialData) {
    return (
      <div className="flex min-h-screen items-center justify-center p-10 text-center text-grey-6">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return <LetterPageClient accountId={accountId} initialData={initialData} />;
}

export default Page;
