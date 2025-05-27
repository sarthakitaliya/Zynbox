"use client";

import { useSession } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import { useEffect, useState } from "react";

interface Email {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: {
    headers: Array<{
      name: string;
      value: string;
    }>;
  };
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);


  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to continue</h1>
          <button
            onClick={() => signIn.social({ provider: "google" })}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome, {session.user?.name || 'User'}!
              </h1>
              <p className="text-gray-600">
                Email: {session.user?.email}
              </p>
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
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {emails.map((email) => (
                      <div key={email.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {email.payload.headers.find(h => h.name === 'Subject')?.value || 'No Subject'}
                            </h3>
                            <p className="text-sm text-gray-500">
                              From: {email.payload.headers.find(h => h.name === 'From')?.value}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(parseInt(email.id)).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">{email.snippet}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
  );
}
