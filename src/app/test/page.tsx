"use client";

import { useState } from "react";
import { login } from "@/common/lib/api/auth";

export default function LoginPage() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const parsedMemberId = Number(memberId);
    if (!Number.isInteger(parsedMemberId) || parsedMemberId <= 0) {
      alert("memberId는 1 이상의 숫자여야 합니다.");
      return;
    }

    try {
      await login({
        memberId: parsedMemberId,
        password,
      });
      alert("로그인 성공");
    } catch (error) {
      alert(error instanceof Error ? error.message : "로그인 실패");
    }
  };

  return (
    <main>
      <input
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        placeholder="memberId"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="button" onClick={handleSubmit}>
        로그인
      </button>
    </main>
  );
}
