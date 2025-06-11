"use client";

import { MailDetail } from "@/components/mail/MailDetail";
import { MailList } from "@/components/mail/MailList";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function MailPage() {
  const params = useParams();
  const folder = params.folder;

  return (
    <div className="h-full w-full flex">
      <div className="min-w-[40%] rounded-2xl border border-[#3f3f3f7a] m-0.5 overflow-y-auto scrollbar-custom">
        <MailList folder={folder} />
      </div>
      <div className="flex-1 overflow-y-auto border border-[#3f3f3f7a] m-0.5 rounded-2xl scrollbar-custom">
        <MailDetail />
      </div>
    </div>
  );
}
