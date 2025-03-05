"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("blog");
  
  useEffect(() => {
    if (pathname.includes("/blog")) {
      setActiveTab("blog");
    } else if (pathname.includes("/newsletter")) {
      setActiveTab("newsletter");
    }
  }, [pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/${value}`);
  };

  return (
    <div className="flex justify-center">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-[300px]"
      >
        <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-md">
          <TabsTrigger 
            value="blog"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white"
          >
            Blog
          </TabsTrigger>
          <TabsTrigger 
            value="newsletter"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-800 text-white"
          >
            Newsletters
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
