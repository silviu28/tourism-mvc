import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { EMPTY_PAGE, EMPTY_QUERY_PAGE, type PagedQuery, type Price } from "../../types";
import { type FC, useState, type SyntheticEvent, useContext } from "react";
import AlertContext from "../../AlertContext";
import useInvalidatingRemove from "../../hooks/useInvalidatingRemove";
import DynamicTable from "../DynamicTable";
import Modal from "../Modal";
import Pager from "../Pager";

interface PriceFormProps {
  onSubmit: (price: Price) => void;
};

const PriceForm: FC<PriceFormProps> = ({ onSubmit }) => {
  const [price, setPrice] = useState<Price>({
    country: "",
    travelHost: "",
    isAvailable: false,
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

const ManagePrices = () => {
  const showAlert = useContext(AlertContext);
  const queryClient = useQueryClient();
  const [formVisible, setFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [selected, setSelected] = useState<Price | null>(null);
  const remove = useInvalidatingRemove("prices");
  const [pageNo, setPageNo] = useState(1);

  const { data: pricePage = [], isLoading: pricesLoading } = useQuery<PagedQuery<Price>>({
    queryKey: ["prices"],
    queryFn: async () => {
      try {
        const pricesRes = await axios.get(`http://localhost:4004/api/prices?page=${pageNo}`);
        return pricesRes.data;
      } catch (_error) {
        showAlert("Unable to load prices", "", true);
        return EMPTY_QUERY_PAGE;
      }
    }
  });

  const submitPrice = async (price: Price) => {
    try {
      await axios.post("http://localhost:4004/api/prices", price);
      showAlert("Price uploaded", "", false);
      queryClient.invalidateQueries({
        queryKey: ["prices"]
      });
    } catch (_error) {
      showAlert("Unable to add pricing", "", true);
    }
  };

  const updatePrice = async (price: Price) => {
    try {
      await axios.put(`http://localhost:4004/api/prices/${price.id}`, { price });
      showAlert("Price updated", "", false);
      queryClient.invalidateQueries({
        queryKey: ["prices"]
      });
    } catch (_error) {
      showAlert("Unable to update price", "", true);
    }
  };

  return (
    <>
      <Modal
        isVisible={formVisible && selected !== null}
        visibilitySetter={setFormVisible}
      >
        <PriceForm onSubmit={(price) => submitPrice(price)} />
      </Modal>
      <Modal
        isVisible={updateFormVisible && selected !== null}
        visibilitySetter={setUpdateFormVisible}
      >
        <UpdatePriceForm
          price={selected!} 
          onUpdate={(price) => updatePrice(price)}
        />
      </Modal>
      <h1>Edit price page</h1>
      <div className="container">
        {!pricesLoading && (
          <>
            <DynamicTable
              items={(pricePage as PagedQuery<Price>).content}
              onRowSelect={(item) => setSelected(item as Price)}
            />
            <Pager 
              state={{ pageNo, ...pricePage as PagedQuery<Price> }}
              onPageChange={(no) => setPageNo(no)}
            />
          </>
        )}
        <button onClick={() => setFormVisible(true)}>+</button>
        <button disabled={!selected} onClick={() => remove(selected as { id: number })}>Delete</button>
        <button onClick={() => setUpdateFormVisible(true)}>Update</button>
      </div>
    </>
  );
};

export default ManagePrices;