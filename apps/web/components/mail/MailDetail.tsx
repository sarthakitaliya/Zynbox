import { useEmailStore } from "@repo/store";
import { Archive, Reply, Send, Star, Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const MailDetail = () => {
  const { selectedEmail, getFullEmail, setSelectedEmail } = useEmailStore();
  console.log(selectedEmail);
  const searchParams = useSearchParams();
  const mailId = searchParams.get("threadId");
  const router = useRouter();

  useEffect(() => {
    if (mailId && selectedEmail?.id !== mailId) {
      getFullEmail(mailId);
    } else if (!mailId) {
      setSelectedEmail(null);
    }
  }, [mailId]);
  const handleCloseEmailDetail = () => {
    setSelectedEmail(null);
    router.push("/mail/inbox");
  };
  return (
    <div className="flex-1">
      {selectedEmail ? (
        <div className=" rounded-lg">
          <div className="flex flex-col justify-center bg-[#1A1A1A] sticky top-0 z-10 h-full">
            <div className="flex items-center justify-between p-3 border-b border-[#3f3f3f7a]">
              <div
                className="cursor-pointer text-gray-400 hover:bg-gray-700 rounded p-1"
                onClick={handleCloseEmailDetail}
              >
                <X size={18} />
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex bg-[#313131] p-1 rounded-lg items-center gap-1.5 px-2 cursor-pointer hover:bg-gray-700">
                  <Reply size={16} className="text-gray-400" />
                  <p className="text-gray-300 text-sm">Reply</p>
                </div>
                <div className="cursor-pointer text-gray-400 hover:bg-gray-700 rounded p-2">
                  <Star size={16} className="text-gray-400" />
                </div>
                <div className="cursor-pointer text-gray-400 hover:bg-gray-700 rounded p-2">
                  <Archive size={16} className="text-gray-400" />
                </div>
                <div className="cursor-pointer text-gray-400 hover:bg-gray-700 rounded p-2">
                  <Trash2 size={16} className="text-red-500" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold mb-2">
              {selectedEmail.subject}
            </h2>
            <p className="text-gray-400 mb-4">
              From: {selectedEmail.senderName} &lt;{selectedEmail.senderEmail}
              &gt;
            </p>

            <div className="p-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedEmail.body?.content ?? "",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Select an email to view details</p>
      )}
    </div>
  );
};
