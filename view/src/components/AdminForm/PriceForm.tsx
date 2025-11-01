import { useState, type FC, type SyntheticEvent } from "react";
import { type Price } from "../../types";

interface PriceFormProps {
  onSubmit: (price: Price) => void;
};

const PriceForm: FC<PriceFormProps> = ({ onSubmit }) => {
  const [price, setPrice] = useState<Price>({
    country: "",
    travelHost: "",
    isAvailable: false,
    status: "",
    insurance: "",
  });

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(price);
  }

  return (
    <form onSubmit={submit} className="flex-col">
      <label>Country</label>
      <input
        type="text"
        onChange={e => setPrice({
          ...price,
          country: e.target.value
        })}
      />
      <label>Travel Host</label>
      <input
        type="text"
        onChange={e => setPrice({
          ...price,
          travelHost: e.target.value
        })}
      />
      <label>Availability</label>
      <input
        type="checkbox"
        onChange={e => setPrice({
          ...price,
          isAvailable: Boolean(e.target.value)
        })}
      />
      <label>Status</label>
      <input
        type="text"
        onChange={e => setPrice({
          ...price,
          status: e.target.value
        })}
      />
      <label>Insurance Agency</label>
      <input
        type="text"
        onChange={e => setPrice({
          ...price,
          insurance: e.target.value
        })}
      />
      <label>Price Lower Range (optional)</label>
      <input
        type="number"
        onChange={e => setPrice({
          ...price,
          priceLower: parseFloat(e.target.value)
        })}
      />
      <label>Price Upper Range (optional)</label>
      <input
        type="number"
        onChange={e => setPrice({
          ...price,
          priceUpper: parseFloat(e.target.value)
        })}
      />
      <button type="submit">Add Pricing</button>
    </form>
  );
};

export default PriceForm;