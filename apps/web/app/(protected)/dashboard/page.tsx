"use client";

import { FcGoogle } from "react-icons/fc";
import { RequireAuth } from "@/components/RequireAuth";
import { useRouter } from "next/navigation";
import { useCategoryStore, useUserStore, useEmailStore } from "@repo/store";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useUserStore();
  const [checkingCategorys, setCheckingCategories] = useState(true);
  const { checkCategories } = useCategoryStore();
  const { getInbox } = useEmailStore();
  const router = useRouter();

  useEffect(() => {
    const checkIfUserHasCategories = async () => {
      const noCategories: boolean = await checkCategories();
      if (!noCategories) {
        router.push("/setup-categories");
      } else {
        setCheckingCategories(false);
        await getInbox()
      }
    };
    checkIfUserHasCategories();
  }, []);

  if (checkingCategorys) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome, {user?.name || "User"}!
                </h1>
                <p className="text-gray-600">Email: {user?.email}</p>
              </div>
            </div>
          </div>

          {/* Connected Accounts Section */}
          <div className="mt-8 px-4 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Connected Accounts
                </h2>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="mt-8 px-4 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View Emails
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Manage Categories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
