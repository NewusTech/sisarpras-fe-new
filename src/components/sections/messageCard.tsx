import WarningIcon from "@/assets/icons/warningIcon";
import { formatDate } from "@/lib/utils";

interface MessageCardProps {
  message?: string;
  date?: string;
  verifiedBy?: string;
}
const MessageCard = ({ message, date, verifiedBy }: MessageCardProps) => {
  return (
    <div className="sm:p-4 p-2 sm:text-base text-sm bg-warning-100 text-warning-500 rounded-md flex gap-2">
      <div>
        <WarningIcon />
      </div>
      <div className="-mt-1">
        <h3 className="font-semibold">Pesan Admin Sekolah</h3>
        <p>{message ?? "-"}</p>
        <br />
        <p>Oleh {`: ${verifiedBy ?? "Admin Sekolah"} | ${formatDate(date)}`}</p>
      </div>
    </div>
  );
};

export default MessageCard;
