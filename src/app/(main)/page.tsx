import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Header from "@/common/components/header/Header";
import BottomMenu from "./_components/BottomMenu";
import ChildMainView from "./_components/ChildMainView";
import ParentMainView from "./_components/ParentMainView";
import ScrollTopButton from "./_components/ScrollTopButton";

type TokenPayload = {
  memberRole: "KID" | "PARENT";
};

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let userRole: "KID" | "PARENT" = "KID";

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      userRole = decoded.memberRole;
    } catch {
      userRole = "KID";
    }
  }

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <Header type="main" />

      <div className="pt-15">
        {userRole === "KID" ? <ChildMainView /> : <ParentMainView />}
      </div>

      <ScrollTopButton />

      <BottomMenu />
    </div>
  );
}
