export const Email = ({ email }: {
    email: {
        id: string;
        sender: string;
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
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-zinc-800 rounded-lg">
      <img src={email.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">{email.sender}</h3>
          <span className="text-xs text-gray-400">{email.date}</span>
        </div>
        <p className="text-sm text-gray-300 truncate">{email.subject}</p>
        <p className="text-xs text-gray-500 truncate">{email.preview}</p>
      </div>
    </div>
  );
};
