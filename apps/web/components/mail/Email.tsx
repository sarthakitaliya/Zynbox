import { useEmailStore } from "@repo/store";
import { ParamValue } from "next/dist/server/request/params";
import { useRouter, useSearchParams } from "next/navigation";

export const Email = ({
  email,
  folder = "inbox",
}: {
  email: {
    id: string;
    from: string;
    subject: string;
    snippet: string;
    date: string;
    category: string;
    read: boolean;
    body?: string;
    profileImage?: string;
    senderEmail?: string;
    senderName?: string;
    to: string;
  };
  folder: ParamValue;
}) => {
  const { selectedEmail, getFullEmail, setSelectedEmail } = useEmailStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const category = searchParams.get("category");
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    params.set("threadId", email.id);

    router.push(`/mail/${folder}?${params.toString()}`);
  };

  const isSelected = selectedEmail?.id === email.id;

  return (
    <div
      className={`flex items-center space-x-3 p-4 m-2 rounded-lg cursor-pointer ${isSelected ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
      onClick={handleClick}
    >
      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-bold uppercase">
        {email.senderName?.charAt(0) ?? "?"}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">{email.senderName}</h3>
          <span className="text-xs text-gray-400">{email.date}</span>
        </div>
        <p className="max-w-[20vw] text-xs text-gray-500 truncate">
          {email.subject}
        </p>
      </div>
    </div>
  );
};
