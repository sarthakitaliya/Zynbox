import { useEmailStore } from "@repo/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const MailDetail = () => {
  const { selectedEmail, getFullEmail, setSelectedEmail } = useEmailStore();
  console.log(selectedEmail);
  const searchParams = useSearchParams();
  const mailId = searchParams.get("threadId");
  useEffect(() => {
    if (mailId && selectedEmail?.id !== mailId) {
      getFullEmail(mailId);
    }else if (!mailId) {
      setSelectedEmail(null);
    }
  }, [mailId]);
  return (
    <div className="flex-1 p-4">
      {selectedEmail ? (
        <div className=" rounded-lg p-4">
          <h2 className="text-white text-xl font-semibold mb-2">
            {selectedEmail.subject}
          </h2>
          <p className="text-gray-400 mb-4">
            From: {selectedEmail.senderName} &lt;{selectedEmail.senderEmail}&gt;
          </p>

          <div className="p-4">
            <div
              dangerouslySetInnerHTML={{ __html: selectedEmail.body?.content ?? "" }}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Select an email to view details</p>
      )}
    </div>
  );
};
