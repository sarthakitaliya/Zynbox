"use client";

import { MailDetail } from "@/components/mail/MailDetail";
import { MailList } from "@/components/mail/MailList";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function MailPage() {
  const params = useParams();
  const folder = params.folder;
  const [needRefetch, setNeedRefetch] = useState(false);

  const mailListMemo = useMemo(() => {
    return (
      <div className="min-w-[40%] rounded-2xl border border-[#3f3f3f7a] m-0.5 overflow-y-auto">
        <MailList folder={folder} />
      </div>
    );
  }, [needRefetch]);
  
  return (
    <div className="h-full w-full flex">
      {mailListMemo}
      <div className="flex-1 overflow-y-auto border border-[#3f3f3f7a] m-0.5 rounded-2xl">
        <MailDetail />
      </div>
    </div>
  );
}
