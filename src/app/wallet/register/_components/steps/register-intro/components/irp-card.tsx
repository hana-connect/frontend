import Button from "@/common/components/button/Button";

const IrpCard = () => {
  return (
    <div className="rounded-[20px] bg-[linear-gradient(119deg,#FFF3FF_14.62%,#F1F8FF_86.07%)] p-9">
      <div className="flex flex-col items-start gap-3.5">
        <p className="text-body-16-m-2 text-left text-brand-black">
          소득이 있는데 IRP 계좌가 없으신가요?
          <br />
          <span className="text-error">0.1% 우대금리</span> 받고 지금 만들러
          가보세요
        </p>
        <Button size="M" variant="lightPurple">
          IRP 계좌 만들기
        </Button>
      </div>
    </div>
  );
};

export default IrpCard;
