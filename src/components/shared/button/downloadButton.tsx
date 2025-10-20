import { Button } from "@/components/ui/button";
import useFetchPrint from "@/hooks/useFetchPrint";
import { Download, Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
interface UnduhProps {
  apiLink?: string;
}

const DownloadButton = (props: UnduhProps) => {
  const { handlePrint, isLoading } = useFetchPrint();
  const searchParams = useSearchParams();

  const handleDownload = () => {
    const endpoint = props.apiLink;
    if (!endpoint) return null;
    handlePrint(`${endpoint}?${searchParams.toString()}`);
  };
  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      disabled={isLoading}
      className="flex gap-2 items-center rounded-full sm:w-40 w-20"
    >
      {isLoading ? (
        <span className="animate-spin">
          <Loader />
        </span>
      ) : (
        <div className="flex items-center gap-2">
          <Download />
          <div className="hidden md:block">Unduh Data</div>
        </div>
      )}
    </Button>
  );
};

export default DownloadButton;
