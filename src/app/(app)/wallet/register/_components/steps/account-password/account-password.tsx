"use client";

import Password from "@/common/components/keypad/Password";
import { linkAccount } from "@/common/lib/api/accounts/api-client";

type AccountPasswordProps = {
  accountNumber: string;
  onLinkSuccess: (data: { accountNumber: string; linkedAt: string }) => void;
};

const AccountPassword = ({
  accountNumber,
  onLinkSuccess,
}: AccountPasswordProps) => {
  const handleVerifyAccountPassword = async (password: string) => {
    try {
      const result = await linkAccount({
        accountNumber,
        accountPassword: password,
      });
      onLinkSuccess(result.data);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === "비밀번호를 잘못 입력했습니다." ||
          error.message === "계좌 비밀번호가 일치하지 않습니다."
        ) {
          return false;
        }
      }

      throw error;
    }
  };

  return (
    <Password
      title="계좌 비밀번호를 입력해 주세요"
      length={4}
      onComplete={handleVerifyAccountPassword}
    />
  );
};

export default AccountPassword;
