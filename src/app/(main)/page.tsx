"use client";

import { ArrowUp } from "lucide-react";
import { use } from "react";
import Header from "@/common/components/header/Header";
import BottomMenu from "./_components/BottomMenu";
import ChildMainView from "./_components/ChildMainView";
import ParentMainView from "./_components/ParentMainView";

type MainPageProps = {
  searchParams: Promise<{ role?: string | string[] }>;
};

function page({ searchParams }: MainPageProps) {
  const params = use(searchParams);

  const rawRole = Array.isArray(params.role) ? params.role[0] : params.role;
  const userRole = rawRole || "CHILD";

  return (
    <div className="relative min-h-screen bg-[#f5f5f5]">
      <Header type="main" />
      <div className="pt-15">
        {userRole === "CHILD" ? <ChildMainView /> : <ParentMainView />}
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex flex-col items-center w-full pb-28"
      >
        <div className="bg-[#CCD0D9] rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-opacity">
          <ArrowUp
            className="text-white"
            width={30}
            height={30}
            strokeWidth={2.5}
          />
        </div>
        <p className="text-[#CCD0D9] text-[18px] font-semibold leading-tight">
          맨위로 올라가기
        </p>
      </button>
      <BottomMenu />
    </div>
  );
}
export default page;
