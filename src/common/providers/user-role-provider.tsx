"use client";

import { createContext, useContext } from "react";

type MemberRole = "KID" | "PARENT";

const UserRoleContext = createContext<MemberRole | undefined>(undefined);

type UserRoleProviderProps = {
  memberRole: MemberRole;
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
