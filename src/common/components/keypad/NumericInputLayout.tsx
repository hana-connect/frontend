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
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col">{top}</div>
        <div className="pb-2">{keypad}</div>
      </div>
      {bottom && <div className="mt-5 mb-6">{bottom}</div>}
    </main>
  );
}
