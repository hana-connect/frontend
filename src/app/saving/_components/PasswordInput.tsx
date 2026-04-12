"use client";

import { useEffect, useState } from "react";

interface PasswordInputProps {
  onCorrect: () => void;
  onBack: () => void;
  // ✅ [추가] 비밀번호 찾기 콜백 (명세서 [1-5])
  onForgot?: () => void;
}

// ✅ [추가] 실제 서비스에서는 API 검증으로 교체 — 현재는 목 데이터
const CORRECT_PASSWORD = "123456";

export default function PasswordInput({
  onCorrect,
  onBack,
  onForgot,
}: PasswordInputProps) {
  const [password, setPassword] = useState("");
  // ✅ [추가] 오류 상태 관리 (명세서 [1-5]: 틀릴 시 오류 모달)
  const [isError, setIsError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    if (password.length !== 6) return;

    // ✅ [수정] 무조건 성공 → 실제 검증 로직 추가
    if (password === CORRECT_PASSWORD) {
      const timer = setTimeout(onCorrect, 300);
      return () => clearTimeout(timer);
    } else {
      // 틀린 경우: 오류 표시 후 초기화
      setIsError(true);
      setErrorCount((prev) => prev + 1);
      const timer = setTimeout(() => {
        setPassword("");
        setIsError(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [password, onCorrect]);

  const addNumber = (num: string) => {
    if (password.length < 6) {
      setIsError(false);
      setPassword((prev) => prev + num);
    }
  };

  const removeNumber = () => {
    setIsError(false);
    setPassword((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 bg-white z-[70] flex flex-col items-center p-6">
      <header className="w-full flex justify-start pt-4 mb-16">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 text-2xl text-gray-800"
          aria-label="닫기"
        >
          ✕
        </button>
      </header>

      <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center mb-8 shadow-sm">
        <span className="text-white font-black text-2xl">B</span>
      </div>

      <h2 className="text-xl font-bold text-center leading-tight mb-12">
        아이부자 앱 간편비밀번호를
        <br />
        입력해 주세요
      </h2>

      {/* 비밀번호 인디케이터 */}
      <div className="flex gap-4 mb-4">
        {["p1", "p2", "p3", "p4", "p5", "p6"].map((id, i) => {
          const isActive = i < password.length;
          return (
            <div
              key={id}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                isError
                  ? "bg-red-400 scale-110" // ✅ [추가] 오류 시 빨간색
                  : isActive
                    ? "bg-violet-400 scale-110"
                    : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>

      {/* ✅ [추가] 오류 메시지 표시 (명세서 [1-5]) */}
      <div className="h-6 mb-6 flex items-center justify-center">
        {isError && (
          <p className="text-red-400 text-sm font-medium animate-pulse">
            비밀번호가 올바르지 않습니다.
            {errorCount >= 5 && " (5회 오류 — 잠금 처리됩니다)"}
          </p>
        )}
      </div>

      {/* ✅ [수정] onForgot prop 연결 */}
      <button
        type="button"
        onClick={onForgot}
        className="text-gray-400 text-sm mb-12 underline underline-offset-4 decoration-gray-300"
      >
        비밀번호를 잊으셨나요?
      </button>

      {/* 숫자 패드 */}
      <div className="grid grid-cols-3 w-full gap-y-10 text-center text-2xl font-bold text-gray-800 mt-auto mb-10 px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => addNumber(n.toString())}
            className="active:scale-90 transition-transform"
          >
            {n}
          </button>
        ))}
        <div />
        <button
          type="button"
          onClick={() => addNumber("0")}
          className="active:scale-90 transition-transform"
        >
          0
        </button>
        <button
          type="button"
          onClick={removeNumber}
          className="flex justify-center items-center active:scale-90 transition-transform"
          aria-label="지우기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
            <line x1="18" y1="9" x2="12" y2="15" />
            <line x1="12" y1="9" x2="18" y2="15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
