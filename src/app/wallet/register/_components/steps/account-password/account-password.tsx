import Password from "@/common/components/keypad/Password";

type AccountPasswordProps = {
  onNext: () => void;
};

const AccountPassword = ({ onNext }: AccountPasswordProps) => {
  const handleVerifyAccountPassword = async (password: string) => {
    const isValid = password === "1234";

    if (isValid) {
      onNext();
      return true;
    }

    return false;
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
