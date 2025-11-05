import { useState, type FC, type SyntheticEvent } from "react";
import type { Price } from "../../types";

interface UpdatePriceFormProps {
  price: Price;
  onUpdate: (price: Price) => void;
};

const UpdatePriceForm: FC<UpdatePriceFormProps> = ({ price, onUpdate }) => {
  const [updatedPrice, setUpdatedPrice] = useState<Price>(price);
  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onUpdate(updatedPrice);
  }

  return (
    <form onSubmit={submit} className="flex-col">
      <label>Country</label>
      <input
        type="text"
        value={updatedPrice.country}
        onChange={e => setUpdatedPrice({
          ...updatedPrice,
          country: e.target.value
        })}
      />
      <label>Travel Host</label>
      <input
        type="text"
        value={updatedPrice.travelHost}
        onChange={e => setUpdatedPrice({
          ...updatedPrice,
          travelHost: e.target.value
        })}
      />
      <label>Availability</label>
      <input
        checked={updatedPrice.isAvailable}
        type="checkbox"
        onChange={e => setUpdatedPrice({
          ...updatedPrice,
          isAvailable: e.target.checked
        })}
      />
      <label>Price Lower Range (optional)</label>
      <input
        type="number"
        value={updatedPrice.priceLower}
        onChange={e => setUpdatedPrice({
          ...updatedPrice,
          priceLower: parseFloat(e.target.value)
        })}
      />
      <label>Price Upper Range (optional)</label>
      <input
        type="number"
        value={updatedPrice.priceUpper}
        onChange={e => setUpdatedPrice({
          ...updatedPrice,
          priceUpper: parseFloat(e.target.value)
        })}
      />
      <button type="submit">Update Pricing</button>
    </form>
  );
};

export default UpdatePriceForm;