"use client";

import { MailDetail } from "@/components/mail/MailDetail";
import { MailList } from "@/components/mail/MailList";
import { useEmailStore } from "@repo/store";
import { useParams, useSearchParams } from "next/navigation";

export default function MailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { selectedEmail } = useEmailStore();
  const folder = params.folder;
  const mailId = searchParams.get("threadId");

  return (
    <div className="h-full w-full flex">
      <div className="min-w-[40%] rounded-2xl border border-[#3f3f3f7a] m-0.5 overflow-y-auto">
        <MailList folder={folder} />
      </div>

      <div className="flex-1 overflow-y-auto border border-[#3f3f3f7a] m-0.5 rounded-2xl">
        <MailDetail />
      </div>
    </div>
  );
}
