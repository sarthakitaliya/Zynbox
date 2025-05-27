import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import {useUserStore} from "@repo/store";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/signin");
      return;
    }
    if(session && session.user){
      setUser(session.user);    
    }
  }, [session, isPending]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
