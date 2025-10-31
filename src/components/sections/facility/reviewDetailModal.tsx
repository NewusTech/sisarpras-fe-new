import { ListFacilitiesAssetsResponse } from "@/components/parts/assets/facilites/interface";
import ModalImage from "@/components/shared/image/modalImage";
import ValueLabel from "@/components/shared/valueLabel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { conditionMapping } from "@/constants";
import { useModalQuery } from "@/hooks/useModalQuery";

const ReviewDetailModal = ({
  data,
}: {
  data: ListFacilitiesAssetsResponse | undefined;
}) => {
  const { isOpen, closeModal } = useModalQuery("detail-item");
  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Aset</DialogTitle>
        </DialogHeader>

        <section className="flex items-center justify-between gap-4 ">
          <div className="space-y-3">
            <ValueLabel label="ID" value={data?.id} />
            <ValueLabel
              label="Fasilitas"
              value={data?.facilityName?.name ?? "-"}
            />
            <ValueLabel label="Kode" value={data?.code} />
            <ValueLabel label="Kategori" value={data?.category.name} />
            <ValueLabel
              label="Kondisi"
              value={conditionMapping[data?.condition ?? ""]}
            />
          </div>
          <div>
            <ModalImage
              src={data?.photo ?? "/assets/images/default-image.webp"}
            />
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDetailModal;
