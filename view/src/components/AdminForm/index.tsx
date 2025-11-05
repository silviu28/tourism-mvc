import type { FC } from "react";
import type { AdminPanelItem, Price } from "../../types";
import ImageForm from "./ImageForm";
import PriceForm from "./PriceForm";
import UpdatePriceForm from "./UpdatePriceForm";

interface AdminFormProps {
  which: "image" | "price" | "updatePrice";
  item: AdminPanelItem;
  onSubmitImage: (src: string) => void;
  onSubmitPrice: (price: Price) => void;
  onUpdatePrice: (price: Price) => void;
};

const AdminForm: FC<AdminFormProps> = ({ which, item, onSubmitImage, onSubmitPrice, onUpdatePrice }) => {
  if (which === "image") {
    return <ImageForm onSubmit={onSubmitImage} />
  } else if (which === "price") {
    return <PriceForm onSubmit={onSubmitPrice} />
  } else if (which === "updatePrice") {
    return <UpdatePriceForm price={item as Price} onUpdate={onUpdatePrice} />
  }
};

export default AdminForm;