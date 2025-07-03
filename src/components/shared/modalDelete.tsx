import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useDelete } from "../api";

const ModalDelete = ({
  endpoint,
  endPointBack,
  queryKey,
}: {
  endpoint: string;
  endPointBack?: string;
  queryKey?: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useDelete();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({ endpoint });
    if (queryKey) {
      console.log({ queryKey });
      queryClient.invalidateQueries([queryKey]);
    }
    if (endPointBack) router.push(endPointBack);
  };

  return (
    <DropdownMenuItem
      onClick={(e) => {
        handleDelete();
      }}
      className="cursor-pointer"
    >
      Hapus
    </DropdownMenuItem>
  );
};

export default ModalDelete;
