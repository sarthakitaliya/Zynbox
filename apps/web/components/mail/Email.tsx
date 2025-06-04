import { useEmailStore } from "@repo/store";

export const Email = ({ email }: {
    email: {
        id: string;
        sender: string;
        senderName: string;
        email: string;
        avatar: string;
        subject: string;
        preview: string;
        content: string;
        date: string;
        category: string;
        starred: boolean;
        read: boolean;
    };
}) => {
  const { getFullEmail } = useEmailStore(); 
  const handleClick = () => {
    console.log(`Selected email ID: ${email.id}`);
    getFullEmail(email.id);
  };

  return (
    <div className="flex items-center space-x-3 p-4 m-2 hover:bg-zinc-800 rounded-lg" onClick={handleClick}>
      <img src={email.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">{email.senderName}</h3>
          <span className="text-xs text-gray-400">{email.date}</span>
        </div>
        <p className="max-w-[20vw] text-xs text-gray-500 truncate">{email.subject}</p>
      </div>
    </div>
  );
};
