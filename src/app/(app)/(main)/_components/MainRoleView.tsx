"use client";

import { useUserRole } from "@/common/providers/user-role-provider";
import ChildMainView from "./ChildMainView";
import ParentMainView from "./ParentMainView";

type MainRoleViewProps = {
  userName: string;
  balance: number;
};

const MainRoleView = ({ userName, balance }: MainRoleViewProps) => {
  const userRole = useUserRole();

  return userRole === "KID" ? (
    <ChildMainView userName={userName} balance={balance} />
  ) : (
    <ParentMainView userName={userName} balance={balance} />
  );
};

export default MainRoleView;
