import { useContext, useState, type FC } from "react";
import { type AdminPanelItem, type Feedback, type Image, type Price } from "../../types";
import axios from "axios";
import Modal from "../Modal";
import AdminForm from "../AdminForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AlertContext from "../../AlertContext";

const selectedStyle = {
  background: 'lightblue'
};

const AdminPanel: FC = () => {
  const queryClient = useQueryClient();

  const showAlert = useContext(AlertContext);

  const [selectedItem, setSelectedItem] = useState<AdminPanelItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<"image" | "price" | "updatePrice">("image");

  const openForm = (type: "image" | "price" | "updatePrice") => {
    setFormType(type);
    setIsModalVisible(true);
  };

  const { data: prices = [], isLoading: pricesLoading }
    = useQuery<Price[]>({
      queryKey: ["prices"],
      queryFn: async () => {
        try {
          const pricesRes = await axios.get("http://localhost:4004/api/prices");
          return pricesRes.data;
        } catch (_error) {
          showAlert("Unable to load prices", "", true);
        }
      }
    });
  const { data: gallery = [], isLoading: galleryLoading }
    = useQuery<Image[]>({
      queryKey: ["images"],
      queryFn: async () => {
        try {
          const imagesRes = await axios.get("http://localhost:4004/api/images");
          return imagesRes.data;
        } catch (_error) {
          showAlert("Unable to load images", "", true);
        }
      }
    });
  const { data: feedback = [], isLoading: feedbackLoading }
    = useQuery<Feedback[]>({
      queryKey: ["feedback"],
      queryFn: async () => {
        try {
          const feedbackRes = await axios.get("http://localhost:4004/api/feedback");
          return feedbackRes.data;
        } catch (_error) {
          showAlert("Unable to load feedback", "", true);
        }
      }
    });


  const remove = async (selectedItem: AdminPanelItem, path: string) => {
    if (!selectedItem) return;
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:4004/api/${path}/${selectedItem.id}`);
        queryClient.invalidateQueries({
          queryKey: [path]
        });
        showAlert("Item deleted", "", false);
      } catch (error) {
        showAlert("Unable to delete this item", "", true);
        console.error(error);
      }
    }
  };

  const submitImage = async (src: string) => {
    try {
      await axios.post("http://localhost:4004/api/images", { src });
      showAlert("Image uploaded", "", false);
      queryClient.invalidateQueries({
        queryKey: ["images"]
      });
    } catch (_error) {
      showAlert("Unable to upload image", "", true);
    }
  };

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
  }

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
  }

  return (
    <div className="slight-margin">
      <Modal
        isVisible={isModalVisible}
        visibilitySetter={setIsModalVisible}>
        <AdminForm
          which={formType}
          item={selectedItem!}
          onSubmitImage={submitImage}
          onSubmitPrice={submitPrice}
          onUpdatePrice={updatePrice}
        />
      </Modal>
      <h1>Edit price page</h1>
      <div className="container">
        {!pricesLoading && <ul>
          {prices.map(price =>
            <li
              key={price.id}
              style={price === selectedItem ? selectedStyle : {}}
              onClick={() => setSelectedItem(price)}>
              {price.country},{price.travelHost},{price.isAvailable ? "available" : "unavailable"},{price.travelHost},{price.priceLower || ""},{price.priceUpper || ""}
            </li>
          )}
        </ul>}
        <button onClick={() => openForm("price")}>+</button>
        <button onClick={() => remove(selectedItem!, "prices")}>Delete</button>
        <button onClick={() => openForm("updatePrice")}>Update</button>
      </div>
      <h1>Edit images shown in gallery</h1>
      <div className="container">
        {!galleryLoading && <ul>
          {gallery.map(img =>
            <li
              key={img.id}
              style={img === selectedItem ? selectedStyle : {}}
              onClick={() => setSelectedItem(img)}>{img.src}</li>)}
        </ul>}
        <button onClick={() => openForm("image")}>+</button>
        <button onClick={() => remove(selectedItem!, "images")}>Delete</button>
      </div>
      <h1>View feedbacks sent by users</h1>
      <div className="container">
        {!feedbackLoading && <ul>
          {feedback.map(fb =>
            <li
              key={fb.id}
              style={fb === selectedItem ? selectedStyle : {}}
              onClick={() => setSelectedItem(fb)}>{fb.feedback}</li>)}
        </ul>}
        <button onClick={() => remove(selectedItem!, "feedback")}>Delete</button>
      </div>
    </div>
  );
};

export default AdminPanel;