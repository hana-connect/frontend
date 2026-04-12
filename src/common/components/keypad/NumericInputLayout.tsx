"use client";

export default function NumericInputLayout({
  top,
  keypad,
  bottom,
}: {
  top: React.ReactNode;
  keypad: React.ReactNode;
  bottom?: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[375px] flex-col bg-white px-5 pb-8 pt-6">
      <div className="flex-1">{top}</div>

      {bottom ? <div className="mb-6">{bottom}</div> : null}

      <div className="pb-2">{keypad}</div>
    </main>
  );
}
