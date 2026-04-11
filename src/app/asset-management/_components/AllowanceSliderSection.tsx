import { SLIDER_MESSAGES } from "../_constants/messages";
import { formatCurrency } from "../_utils/formatters";

interface Props {
  ratio: number;
  allowanceAmount: number;
  handleRatioChange: (value: number) => void;
}

export default function AllowanceSliderSection({
  ratio,
  allowanceAmount,
  handleRatioChange,
}: Props) {
  return (
    <section className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-center text-black mb-2">
        {SLIDER_MESSAGES.TITLE}
      </h2>
      <div className="px-2 mb-10 text-center">
        <p className="text-[13px] leading-relaxed text-gray-500 whitespace-pre-line">
          {SLIDER_MESSAGES.DESCRIPTION(1000000, 10)}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
            👧
          </div>
          <span className="text-xs font-medium text-gray-600">아이</span>
          <div className="bg-violet-50 text-violet-600 px-3 py-1 rounded-md text-xs font-bold">
            {ratio}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={ratio}
            onChange={(e) => handleRatioChange(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <span className="mt-4 text-gray-300 font-light text-xl">:</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
            👨
          </div>
          <span className="text-xs font-medium text-gray-600">나</span>
          <div className="bg-violet-50 text-violet-600 px-3 py-1 rounded-md text-xs font-bold">
            {100 - ratio}
          </div>
        </div>
      </div>
      <p className="text-center text-[15px] text-gray-800 mb-8">
        {SLIDER_MESSAGES.RESULT_PREFIX}
        <span className="text-violet-600 font-bold">
          {formatCurrency(allowanceAmount)}원
        </span>
        {SLIDER_MESSAGES.RESULT_SUFFIX}
      </p>
      <button
        type="button"
        className="w-full bg-violet-500 text-white py-4 rounded-2xl font-bold shadow-md"
      >
        {SLIDER_MESSAGES.BUTTON_TEXT}
      </button>
    </section>
  );
}
