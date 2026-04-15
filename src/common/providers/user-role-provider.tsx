"use client";

import { createContext, useContext } from "react";
import type { UserRole } from "@/common/types/user";

const UserRoleContext = createContext<UserRole | undefined>(undefined);

type UserRoleProviderProps = {
  memberRole: UserRole;
  children: React.ReactNode;
};

export function UserRoleProvider({
  memberRole,
  children,
}: UserRoleProviderProps) {
  return (
    <UserRoleContext.Provider value={memberRole}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);

  if (!context) {
    throw new Error("useUserRole must be used within UserRoleProvider");
  }

  return context;
}
