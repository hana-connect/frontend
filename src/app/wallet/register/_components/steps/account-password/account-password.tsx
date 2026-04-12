interface Props {
  onNext: () => void;
  onBack: () => void;
}

const AccountPassword = ({ onNext, onBack }: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <h1>계좌 비밀번호 입력</h1>
      <button type="button" onClick={onBack}>
        뒤로가기
      </button>
      <button type="button" onClick={onNext}>
        완료
      </button>
    </div>
  );
};

export default AccountPassword;
