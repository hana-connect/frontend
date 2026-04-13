import Header from "@/common/components/header/Header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/tabs/Tabs";
import HowMuch from "./_components/HowMuch";
import What from "./_components/What";
import When from "./_components/When";

function page() {
  return (
    <div className="min-h-screen bg-white">
      <Header type="sub" title="청약 척척박사" />

      <section className="flex flex-col text-black px-6 pt-7 pb-2">
        <h1 className="text-title-24-sb">청약 척척박사</h1>
        <p className="text-body-16-m">아이를 위한 3가지 핵심 정보</p>
      </section>

      <Tabs defaultValue="when" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="when" className="flex flex-col">
            <span className="text-[14px]">첫 번째</span>
            <span className="text-[16px]">언제 넣을까</span>
          </TabsTrigger>

          <TabsTrigger value="how-much" className="flex flex-col">
            <span className="text-[14px]">두 번째</span>
            <span className="text-[16px]">얼마 넣을까</span>
          </TabsTrigger>

          <TabsTrigger value="which" className="flex flex-col">
            <span className="text-[14px]">세 번째</span>
            <span className="text-[16px]">어떤 아파트</span>
          </TabsTrigger>
        </TabsList>

        <div className="px-6">
          <TabsContent value="when">
            <When />
          </TabsContent>

          <TabsContent value="how-much">
            <HowMuch />
          </TabsContent>

          <TabsContent value="which">
            <What />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default page;
