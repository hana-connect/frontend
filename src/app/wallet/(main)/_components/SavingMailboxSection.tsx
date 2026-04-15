import type { SavingMailbox } from "../_types";
import SavingMailboxList from "./SavingMailboxList";

async function getExpiredSavings(): Promise<SavingMailbox[]> {
  // TODO: API 연동 전까지 사용하는 mock 데이터
  const mockMailboxes: SavingMailbox[] = [
    {
      id: 1,
      name: "오늘부터, 하나 적금",
      number: "1212-158-121212",
    },
    {
      id: 2,
      name: "자유적금",
      number: "1212-158-333333",
    },
    {
      id: 3,
      name: "꿈꾸는 저금통",
      number: "1212-158-444444",
    },
    {
      id: 4,
      name: "용돈 모으기 적금",
      number: "1212-158-555555",
    },
    {
      id: 5,
      name: "행복 저축",
      number: "1212-158-666666",
    },
  ];

  return mockMailboxes;

  /**
   * TODO: 추후 실제 API 연동 예시
   *
   * import { serverSpringFetch } from "@/common/lib/serverSpringFetch";
   *
   * type GetExpiredSavingsResponse = {
   *   savingBoxes: {
   *     id: number;
   *     productName: string;
   *     accountNumber: string;
   *   }[];
   * };
   *
   * const response = await serverSpringFetch<GetExpiredSavingsResponse>(
   *   "/wallet/savings/expired",
   *   {
   *     method: "GET",
   *     cache: "no-store",
   *   },
   * );
   *
   * return response.savingBoxes.map((item) => ({
   *   id: item.id,
   *   name: item.productName,
   *   number: item.accountNumber,
   * }));
   */
}

async function SavingMailboxSection() {
  const mailboxes = await getExpiredSavings();

  if (mailboxes.length === 0) {
    return (
      <section className="pb-8">
        <h2 className="text-heading-24-b">저금 우체통 모아보기</h2>
        <p className="mt-8 text-center text-body-16-m text-grey-6">
          만기된 적금이 없어요.
        </p>
      </section>
    );
  }

  return (
    <section className="pb-8">
      <h2 className="text-heading-24-b">적금 우체통 모아보기</h2>
      <div className="mt-8">
        <SavingMailboxList mailboxes={mailboxes} />
      </div>
    </section>
  );
}

export default SavingMailboxSection;
