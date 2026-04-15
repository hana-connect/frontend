"use client";

import { useUserRole } from "@/common/providers/user-role-provider";
import ChildMainView from "./ChildMainView";
import ParentMainView from "./ParentMainView";

const MainRoleView = () => {
  const userRole = useUserRole();

  return userRole === "KID" ? <ChildMainView /> : <ParentMainView />;
};

export default MainRoleView;
