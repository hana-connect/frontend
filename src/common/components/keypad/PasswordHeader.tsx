"use client";

import Image from "next/image";

type PasswordHeaderProps = {
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
  return (
    <div
      className={`h-4 w-4 rounded-full ${
        active ? "bg-brand-purple-1" : "bg-grey-4"
      }`}
    />
  );
}

function ErrorTooltip({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full bg-error px-4 py-2 text-body-16-m text-white"
    >
      <span>{message}</span>
      <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-error" />
    </div>
  );
}

export default function PasswordHeader({
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
      <div className="mt-18 flex flex-col items-center">
        <Image width={52} height={61} src="/svg/ic_logo.svg" alt="Logo" />

        <h1 className="mt-7 text-center text-heading-20-b text-black">
          {title}
        </h1>

        <div className="relative mt-6 h-12 w-full">
          {errorMessage && errorMessage.length > 0 && (
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <ErrorTooltip message={errorMessage} />
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-4">
          {dots.map((dot) => (
            <Dot key={dot.id} active={dot.active} />
          ))}
        </div>

        <button
          type="button"
          className="mt-4 text-body-16-m text-grey-6 underline-offset-2 hover:underline"
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>
    </section>
  );
}
