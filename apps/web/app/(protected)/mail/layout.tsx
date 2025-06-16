"use client";
import Loading from "@/components/Loading";
import Sidebar from "@/components/mail/Sidebar";
import { useCategoryStore, useUIStore } from "@repo/store";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export default function MailLayout({ children }: { children: ReactNode }) {
  const [checkingCategories, setCheckingCategories] = useState(true);
  const router = useRouter();
  const { checkCategories } = useCategoryStore();
  const { setError, sidebarOpen } = useUIStore();

  useEffect(() => {
    const checkIfUserHasCategories = async () => {
      const hasCategories: boolean = await checkCategories();
      if (!hasCategories) {
        setError(
          "You need to set up categories before using the mail feature."
        );
        router.push("/setup-categories");
      } else {
        setCheckingCategories(false);
      }
    };
    checkIfUserHasCategories();
  }, []);

  if (checkingCategories) {
    return <Loading />;
  }
  return (
    <div className="bg-[#111112] flex h-screen w-full">
      <div
        className={`transition-[width] duration-300 ${
          sidebarOpen ? "w-[220px]" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar />
      </div>
      <main className="bg-[#1A1A1A] flex-1 overflow-hidden rounded-l-2xl scrollbar-custom">
        {children}
      </main>
    </div>
  );
}
