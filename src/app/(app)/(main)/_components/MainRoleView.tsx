"use client";

import { useUserRole } from "@/common/providers/user-role-provider";
import type { ParentData, WalletData } from "../page";
import ChildMainView from "./ChildMainView";
import ParentMainView from "./ParentMainView";

type MainRoleViewProps = {
  wallet: WalletData;
  parents: ParentData[];
};

const MainRoleView = ({ wallet, parents }: MainRoleViewProps) => {
  const userRole = useUserRole();

  return userRole === "KID" ? (
    <ChildMainView wallet={wallet} parents={parents} />
  ) : (
    <ParentMainView wallet={wallet} />
  );
};

export default MainRoleView;
