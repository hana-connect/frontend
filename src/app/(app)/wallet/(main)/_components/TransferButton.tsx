"use client";

import { useRouter } from "next/navigation";
import Button from "@/common/components/button/Button";

// TODO 여기 API 연동해서 송금이랑 연동해야해요
// 경로도 수정해야 될 수도?
export default function TransferButton() {
  const router = useRouter();

  return (
    <Button
      variant="smallGray"
      size="M"
      className="flex-1"
      onClick={() => router.push("/transfer")}
    >
      송금
    </Button>
  );
}
