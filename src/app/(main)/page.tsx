import ChildMainView from "./_components/ChildMainView";
import ParentMainView from "./_components/ParentMainView";

type MainPageProps = {
  searchParams: Promise<{ role?: string | string[] }>;
};

async function page({ searchParams }: MainPageProps) {
  const params = await searchParams;

  const rawRole = Array.isArray(params.role) ? params.role[0] : params.role;

  const userRole = rawRole || "CHILD";

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {userRole === "CHILD" ? <ChildMainView /> : <ParentMainView />}
    </div>
  );
}
export default page;
