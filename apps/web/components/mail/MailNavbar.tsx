import { Funnel, ListFilter, Menu, RefreshCcw, Search } from "lucide-react";
import Toggle from "./Toggle";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCategoryStore } from "@repo/store";

export const MailNavbar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { fetchCategories, categories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const threadId = searchParams.get("threadId");
    const category = e.target.value;
    
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }
    if(threadId) {
      params.set("threadId", threadId);
    }

    router.push(`/mail/inbox?${params.toString()}`);
  };
  return (
    <div className="flex flex-col gap-2 bg-[#1A1A1A] sticky top-0 z-10">
      <div className="flex items-center justify-between p-5 border-b border-[#3f3f3f7a]">
        <div className="cursor-pointer">
          <Menu size={17} className="text-gray-400" />
        </div>
        <div className="flex space-x-4 items-center">
          <Toggle />
          <div className="border-l h-4 border-[#75757562]" />
          <RefreshCcw className="cursor-pointer text-gray-400" size={17} />
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 pb-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={15}
          />
          <input
            type="text"
            placeholder="Search emails..."
            className="w-[22vw] pl-10 pr-3 py-1.5 rounded-md bg-[#141414] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
        </div>

        <div className="relative">
          <ListFilter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={15}
          />
          <select
            className="pl-10 pr-3 py-1.5 rounded-md bg-[#141414] text-gray-200 appearance-none focus:outline-none cursor-pointer"
            onChange={onCategoryChange}
            value={searchParams.get("category") || ""}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
