interface Props {
  onNext: () => void;
}

const RegisterIntro = ({ onNext }: Props) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <h1>계좌 등록하기</h1>
      <button type="button" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

export default RegisterIntro;
