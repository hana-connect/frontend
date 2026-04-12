"use client";

type PasswordHeaderProps = {
  pageTitle: string;
  title: string;
  enteredLength: number;
  maxLength: number;
  errorMessage?: string;
};

type DotItem = {
  id: string;
  active: boolean;
};

function Dot({ active }: { active: boolean }) {
  const baseClassName = "h-4 w-4 rounded-full";
  const colorClassName = active ? "bg-violet-500" : "bg-gray-300";

  return <div className={`${baseClassName} ${colorClassName}`} />;
}

export default function PasswordHeader({
  pageTitle,
  title,
  enteredLength,
  maxLength,
  errorMessage,
}: PasswordHeaderProps) {
  const dots: DotItem[] = Array.from({ length: maxLength }, (_, index) => ({
    id: `password-dot-${index + 1}`,
    active: index < enteredLength,
  }));

  return (
    <section className="pt-2">
      <p className="text-[16px] font-semibold text-gray-300">{pageTitle}</p>

      <div className="mt-12 flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-50 text-[48px] font-bold text-violet-500">
          B
        </div>

        <h1 className="mt-6 text-center text-[18px] font-bold text-black">
          {title}
        </h1>

        <div className="mt-6 flex min-h-9 items-center justify-center">
          {errorMessage ? (
            <div className="rounded-full bg-red-500 px-4 py-2 text-[12px] font-medium text-white">
              {errorMessage}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-center gap-4">
          {dots.map((dot) => (
            <Dot key={dot.id} active={dot.active} />
          ))}
        </div>

        <button
          type="button"
          className="mt-28 text-[14px] font-medium text-gray-400 underline-offset-2 hover:underline"
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>
    </section>
  );
}
