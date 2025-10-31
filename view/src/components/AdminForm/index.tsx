import type { FC } from "react";
import type { Price } from "../../types";
import ImageForm from "./ImageForm";
import PriceForm from "./PriceForm";

interface AdminFormProps {
  which: "image" | "price";
  onSubmitImage: (src: string) => void;
  onSubmitPrice: (price: Price) => void;
};

const AdminForm: FC<AdminFormProps> = ({ which, onSubmitImage, onSubmitPrice }) => {
  if (which === "image") {
    return <ImageForm onSubmit={onSubmitImage} />
  } else {
    return <PriceForm onSubmit={onSubmitPrice} />
  }
};

export default AdminForm;