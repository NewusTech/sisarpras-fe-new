import { toast } from "@/lib/myToast";
import { fetchBlob } from "@/services/api/fetcher";
import { useMutation } from "@tanstack/react-query";

const fetchPDF = async (url: string) => {
  const response = await fetchBlob(url);
  return response.blob();
};

export default function useFetchPrint() {
  const printMutation = useMutation<Blob, Error, string>({
    mutationFn: async (url: string) => {
      return await fetchPDF(url);
    },
  });

  const handlePrint = async (url: string) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let newTab: Window | null = null;
    if (isMobile) {
      newTab = window.open("", "_blank");
      if (!newTab) {
        toast.error("Pop-up diblokir. Menyiapkan unduhan.");
      } else {
        newTab.document.write("Memuat dokumen...");
      }
    }

    printMutation.mutate(url, {
      onSuccess: async (data) => {
        const blobUrl = URL.createObjectURL(data);

        // Dapatkan nama file dari Content-Disposition
        let fileName = "dokumen.pdf";
        try {
          const response = await fetch(url, { method: "HEAD" });
          const contentDisposition = response.headers.get(
            "Content-Disposition"
          );
          const match = contentDisposition?.match(/filename="?([^"]+)"?/);
          if (match && match[1]) {
            fileName = decodeURIComponent(match[1]);
          }
        } catch (err) {
          // abaikan error, gunakan default
        }

        if (isMobile) {
          try {
            if (newTab) newTab.location.href = blobUrl;
          } catch {
            // fallback download
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName;
            a.click();
          }
        } else {
          // desktop pakai iframe
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = blobUrl;

          iframe.onload = () => {
            try {
              iframe.contentWindow?.focus();
              iframe.contentWindow?.print();
            } catch (e) {
              console.warn("Gagal akses iframe.print(), fallback download");

              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = fileName;
              a.click();
            }
          };

          document.body.appendChild(iframe);
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message);
      },
    });
  };

  return {
    handlePrint,
    isLoading: printMutation.isLoading,
  };
}
