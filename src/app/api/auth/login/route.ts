import { type NextRequest, NextResponse } from "next/server";

const SPRING_BASE_URL = process.env.SPRING_BASE_URL ?? "http://localhost:8080";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const memberId = Number(body?.memberId);
    const password = body?.password;

    if (!Number.isInteger(memberId) || memberId <= 0 || !password) {
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
    });

    let result = null;

    try {
      result = await springRes.json();
    } catch {
      result = null;
    }

    if (!springRes.ok) {
      return NextResponse.json(
        { message: result?.message ?? "로그인 실패" },
        { status: springRes.status },
      );
    }

    const loginData = result?.data ?? result;
    const accessToken = loginData?.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        { message: "토큰이 응답되지 않았습니다." },
        { status: 500 },
      );
    }

    const response = NextResponse.json({
      message: "로그인 성공",
      data: {
        memberId: loginData.memberId,
        name: loginData.name,
        role: loginData.role,
        memberRole: loginData.memberRole,
      },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
