interface Props {
  onNext: () => void;
  onBack: () => void;
}

const RegisterAccount = ({ onNext, onBack }: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <h1>계좌번호 확인</h1>
      <button type="button" onClick={onBack}>
        뒤로가기
      </button>
      <button type="button" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

export default RegisterAccount;
