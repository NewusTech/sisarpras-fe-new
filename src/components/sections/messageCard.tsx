import WarningIcon from "@/assets/icons/warningIcon";
import ValueLabel from "../shared/valueLabel";
import { formatDate } from "@/lib/utils";

interface MessageCardProps {
  message?: string;
  date?: string;
  verifiedBy?: string;
}
const MessageCard = ({ message, date, verifiedBy }: MessageCardProps) => {
  return (
    <div className="p-4 bg-warning-100 text-warning-500 rounded-md flex gap-2">
      <WarningIcon />
      <div className="-mt-1">
        <h3 className="font-semibold">Pesan Admin Sekolah</h3>
        <p>{message ?? "-"}</p>
        <ValueLabel
          orientation="horizontal"
          labelClassName="text-warning-500 w-5"
          label="Oleh"
          value={`: ${verifiedBy ?? "Admin Sekolah"} | ${formatDate(date)}`}
        />
      </div>
    </div>
  );
};

export default MessageCard;
