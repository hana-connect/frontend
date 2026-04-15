import "server-only";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type MemberRole = "KID" | "PARENT";

type TokenPayload = {
  memberRole: MemberRole;
  exp?: number;
};

export async function getUserRole(): Promise<MemberRole> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const now = Math.floor(Date.now() / 1000);

    if (!decoded.exp || decoded.exp <= now) {
      redirect("/login");
    }

    if (decoded.memberRole !== "KID" && decoded.memberRole !== "PARENT") {
      redirect("/login");
    }

    return decoded.memberRole;
  } catch {
    redirect("/login");
  }
}
