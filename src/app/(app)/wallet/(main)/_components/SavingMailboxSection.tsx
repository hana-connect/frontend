import { redirect } from "next/navigation";
import {
  SpringApiError,
  serverSpringFetch,
} from "@/common/lib/api/server-spring-fetch";
import type { ApiResponse } from "@/common/lib/api/types";
import type { SavingMailbox } from "../_types";
import SavingMailboxList from "./SavingMailboxList";

type TerminatedAccount = {
  accountId: number;
  name: string;
  accountNumber: string;
};

type TerminatedSavingsResponse = ApiResponse<TerminatedAccount[]>;

async function getExpiredSavings(): Promise<SavingMailbox[] | null> {
  try {
    const response = await serverSpringFetch<TerminatedSavingsResponse>(
      "/api/accounts/terminated-savings",
      {
        method: "GET",
        next: { revalidate: 0 },
      },
    );

    return (response.data || []).map((item) => ({
      accountId: item.accountId,
      name: item.name,
      number: item.accountNumber,
    }));
  } catch (error) {
    if (error instanceof SpringApiError) {
      if (error.status === 401) {
        redirect("/login");
      }
      console.error("만기 적금 조회 에러:", error.message);
    }
    return null;
  }
}

async function SavingMailboxSection() {
  const mailboxes = await getExpiredSavings();

  return (
    <section className="pb-8">
      <h2 className="text-heading-24-b">적금 우체통 모아보기</h2>

      {mailboxes === null ? (
        <div className="mt-8 text-center">
          <p className="text-body-16-m text-grey-6">
            정보를 불러오지 못했습니다. <br />
            잠시 후 다시 시도해 주세요.
          </p>
        </div>
      ) : mailboxes.length === 0 ? (
        <p className="mt-8 text-center text-body-16-m text-grey-6">
          만기된 적금이 없어요.
        </p>
      ) : (
        <div className="mt-8">
          <SavingMailboxList mailboxes={mailboxes} />
        </div>
      )}
    </section>
  );
}

export default SavingMailboxSection;
