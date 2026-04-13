import ChildMainView from "./_components/ChildMainView";
import ParentMainView from "./_components/ParentMainView";

type MainPageProps = {
  searchParams: { role?: string };
};

async function page({ searchParams }: MainPageProps) {
  const params = await searchParams;
  const userRole = params.role || "CHILD";

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {userRole === "CHILD" ? <ChildMainView /> : <ParentMainView />}
    </div>
  );
}

export default page;
