import { useEmailStore } from "@repo/store";
import { Archive, Reply, Send, Star, Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NoEmailSelected } from "./NoEmailSelected";

export const MailDetail = () => {
  const { selectedThread, getFullEmail, setSelectedThread } = useEmailStore();
  console.log(selectedThread, "selectedThread in MailDetail");
  const searchParams = useSearchParams();
  const mailId = searchParams.get("threadId");
  const router = useRouter();

  const [openMessageIndex, setOpenMessageIndex] = useState<number>(-1);

  useEffect(() => {
    if (mailId && selectedThread?.threadId !== mailId) {
      getFullEmail(mailId).then((email) => {
        console.log("Fetched full email:", email);
      })
    } else if (!mailId) {
      setSelectedThread(null);
    }
  }, [mailId]);

  useEffect(() => {
    if (selectedThread?.messages?.length) {
      setOpenMessageIndex(selectedThread.messages.length - 1);
    }
  }, [selectedThread]);
  const handleCloseEmailDetail = () => {
    const category = searchParams.get("category");
    if (category) {
      router.push(`/mail/inbox?category=${category}`);
    }else{
      router.push("/mail/inbox");
    }
    setSelectedThread(null);
  };
  return (
    <div className="flex flex-col h-full">
      {selectedThread ? (
        <>
          <div className="sticky top-0 z-10 bg-[#1A1A1A]">
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

          <div className="flex-1 overflow-y-auto scrollbar-custom">
            <div className="p-4 space-y-5">
              <h2 className="flex items-center text-xl font-semibold text-white pb-10 border-b border-[#3f3f3f7a] pb-4">{selectedThread.subject}
                {selectedThread.messageCount > 1 && (
              <span className="text-sm text-gray-500 ml-2">
                [{selectedThread.messageCount}]
              </span>
            )}
              </h2>
              {selectedThread.messages.map((email, index) => (
                <div key={email.id} className="border-b border-[#3f3f3f7a] pb-4">
                  <div
                    className="cursor-pointer flex items-center justify-between rounded-lg"
                    onClick={() => setOpenMessageIndex(index === openMessageIndex ? -1 : index)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-bold uppercase">
                        {email.senderName?.charAt(0) ?? "?"}
                      </div>
                      <div className="text-white font-medium">
                        {email.senderName || email.from}
                        <p className="text-sm text-gray-500">To: You</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{email.date ?? ""}</div>
                  </div>
                  <AnimatePresence initial={false}>
                    {openMessageIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-gray-200 leading-relaxed px-2 mt-3 overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: email.body?.content ?? "" }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
       <NoEmailSelected />
      )}
    </div>
  );
};
