import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useDelete } from "../parts/api";

const ModalDelete = ({
  endpoint,
  endPointBack,
  queryKey,
}: {
  endpoint: string;
  endPointBack?: string;
  queryKey?: string[];
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteMutation = useDelete();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({ endpoint });
    if (queryKey) {
      console.log({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey });
    }
    if (endPointBack) router.push(endPointBack);
  };

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={(e) => {
        handleDelete();
      }}
    >
      <Trash2 className="text-red-500 !stroke-[3]" />
    </Button>
  );
};

export default ModalDelete;
