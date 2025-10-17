import { ListInfrastructureAssetsPaginateResponse } from "@/components/parts/assets/infrastructures/interface";
import ModalImage from "@/components/shared/image/modalImage";
import ValueLabel from "@/components/shared/valueLabel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalQuery } from "@/hooks/useModalQuery";

const ReviewDetailModal = ({
  data,
}: {
  data: ListInfrastructureAssetsPaginateResponse | undefined;
}) => {
  const { isOpen, closeModal } = useModalQuery("detail-item");
  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Aset {data?.name}</DialogTitle>
        </DialogHeader>

        <section className="flex items-center justify-between gap-4">
          <div className="space-y-3">
            <ValueLabel label="ID" value={data?.id} />
            <ValueLabel label="Kode" value={data?.code} />
            <ValueLabel label="Nama Ruangan" value={data?.name} />
            <ValueLabel label="Luas Ruangan" value={data?.area} />
            <ValueLabel label="Kondisi" value={data?.condition} />
          </div>
          <div>
            <ModalImage src="https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?q=80&w=1358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailModal;
