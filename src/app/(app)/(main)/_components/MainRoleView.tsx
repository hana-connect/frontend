"use client";

import { useUserRole } from "@/common/providers/user-role-provider";
import type { KidData, ParentData, WalletData } from "../page";
import ChildMainView from "./ChildMainView";
import ParentMainView from "./ParentMainView";

type MainRoleViewProps = {
  wallet: WalletData;
  parents: ParentData[];
  kids: KidData[];
};

const MainRoleView = ({ wallet, parents, kids }: MainRoleViewProps) => {
  const userRole = useUserRole();

  return userRole === "KID" ? (
    <ChildMainView wallet={wallet} parents={parents} />
  ) : (
    <ParentMainView wallet={wallet} kids={kids} />
  );
};

export default MainRoleView;
