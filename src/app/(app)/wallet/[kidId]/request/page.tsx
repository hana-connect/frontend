import { redirect } from "next/navigation";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import RequestPageClient from "./_components/RequestPageClient";

export type ParentInfo = {
  connectMemberId: number;
  connectMemberName: string;
  connectMemberPhoneName: string;
  connectMemberRole: string;
};

type ParentListResponse = ApiResponse<ParentInfo[]>;

async function Page({ params }: { params: Promise<{ kidId: string }> }) {
  const { kidId } = await params;

  const getParents = async () => {
    try {
      const result = await serverSpringFetch<ParentListResponse>(
        `/api/${kidId}/parents`,
        {
          method: "GET",
          next: { revalidate: 0 },
        },
      );
      return result.data || [];
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
  };

  const parents = await getParents();

  return <RequestPageClient initialParents={parents} />;
}

export default Page;
