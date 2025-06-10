import { useEmailStore } from "@repo/store";
import { useRouter } from "next/navigation";

export const Email = ({
  email,
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
}) => {
  const { getFullEmail, setSelectedEmail } = useEmailStore();
  const router = useRouter();

  const handleClick = () => {
    console.log(`Selected email ID: ${email.id}`);
    router.push(`?threadId=${email.id}`);
  };

  return (
    <div
      className="flex items-center space-x-3 p-4 m-2 hover:bg-zinc-800 rounded-lg cursor-pointer"
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
