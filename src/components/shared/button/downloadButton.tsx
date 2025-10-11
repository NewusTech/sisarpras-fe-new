import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";

const DownloadButton = () => {
  return (
    <Button variant="outline" className="flex items-center gap-2 rounded-full">
      <Download />
      Unduh Data
    </Button>
  );
};

export default DownloadButton;
