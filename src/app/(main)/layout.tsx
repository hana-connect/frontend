import { getUserRole } from "@/common/lib/auth/get-user-role";
import { UserRoleProvider } from "@/common/providers/user-role-provider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const memberRole = await getUserRole();

  return (
    <UserRoleProvider memberRole={memberRole}>{children}</UserRoleProvider>
  );
}
