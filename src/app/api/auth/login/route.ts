import { type NextRequest, NextResponse } from "next/server";
import { SPRING_BASE_URL } from "@/common/constants/api";

const LOGIN_TIMEOUT_MS = 5000;

type ApiResponse<T> = {
  status: number;
  data: T;
  message: string;
};

type LoginData = {
  accessToken: string;
  memberId: number;
  name: string;
  role: string;
  memberRole: string;
};

export async function POST(req: NextRequest) {
  if (!SPRING_BASE_URL) {
    return NextResponse.json(
      { message: "SPRING_BASE_URL 환경변수가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), LOGIN_TIMEOUT_MS);

  try {
    const body: unknown = await req.json();

    const memberId =
      typeof body === "object" &&
      body !== null &&
      "memberId" in body &&
      typeof body.memberId !== "undefined"
        ? Number(body.memberId)
        : NaN;

    const password =
      typeof body === "object" &&
      body !== null &&
      "password" in body &&
      typeof body.password === "string"
        ? body.password
        : "";

    if (!Number.isInteger(memberId) || memberId <= 0 || !password.trim()) {
      return NextResponse.json(
        { message: "memberId와 비밀번호는 필수입니다." },
        { status: 400 },
      );
    }

    const springRes = await fetch(`${SPRING_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberId, password }),
      cache: "no-store",
      signal: controller.signal,
    });

    let result: ApiResponse<LoginData> | null = null;

    try {
      result = (await springRes.json()) as ApiResponse<LoginData>;
    } catch {
      result = null;
    }

    if (!springRes.ok) {
      return NextResponse.json(
        { message: result?.message ?? "로그인 실패" },
        { status: springRes.status },
      );
    }

    const loginData = result?.data;

    if (!loginData?.accessToken) {
      return NextResponse.json(
        { message: "토큰이 응답되지 않았습니다." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      message: result?.message ?? "로그인 성공",
      data: {
        memberId: loginData.memberId,
        name: loginData.name,
        role: loginData.role,
        memberRole: loginData.memberRole,
      },
    });

    response.cookies.set("accessToken", loginData.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { message: "로그인 요청 시간이 초과되었습니다. 다시 시도해 주세요." },
        { status: 504 },
      );
    }

    if (error instanceof TypeError) {
      return NextResponse.json(
        { message: "로그인 서버에 연결할 수 없습니다." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
