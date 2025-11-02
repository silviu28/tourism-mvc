import { useContext, useState, type FC } from "react";
import { type AdminPanelItem, type Feedback, type Image, type Price } from "../../types";
import axios from "axios";
import UserContext from "../../UserContext";
import Modal from "../Modal";
import AdminForm from "../AdminForm";
import { useQuery } from "@tanstack/react-query";

const selectedStyle = {
  background: 'blue'
};

const AdminPanel: FC = () => {

  const [, , showAlert] = useContext(UserContext);

  const [selectedItem, setSelectedItem] = useState<AdminPanelItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<"image" | "price">("image");

  const openForm = (type: "image" | "price") => {
    setFormType(type);
    setIsModalVisible(true);
  };

  const { data: prices = [], isLoading: pricesLoading }
    = useQuery<Price[]>({
      queryKey: ["prices"],
      queryFn: async () => {
        try {
          const pricesRes = await axios.get("http://localhost:4004/prices");
          return pricesRes.data;
        } catch (error) {
          showAlert("Unable to load prices", true);
        }
      }
    });
  const { data: gallery = [], isLoading: galleryLoading }
    = useQuery<Image[]>({
      queryKey: ["images"],
      queryFn: async () => {
        try {
          const imagesRes = await axios.get("http://localhost:4004/images");
          return imagesRes.data;
        } catch (error) {
          showAlert("Unable to load images", true);
        }
      }
    });
  const { data: feedback = [], isLoading: feedbackLoading }
    = useQuery<Feedback[]>({
      queryKey: ["feedback"],
      queryFn: async () => {
        try {
          const feedbackRes = await axios.get("http://localhost:4004/feedback");
          return feedbackRes.data;
        } catch (error) {
          showAlert("Unable to load feedback", true);
        }
      }
    });


  const remove = async (selectedItem: AdminPanelItem, path: string) => {
    if (!selectedItem) return;
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:4004/${path}/${selectedItem.id}`);
        showAlert("Item deleted", false);
      } catch (error) {
        showAlert("Unable to delete this item", true);
        console.error(error);
      }
    }
  };

  const submitImage = async (src: string) => {
    try {
      await axios.post("http://localhost:4004/images", { src });
      showAlert("Image uploaded", false);
    } catch (error) {
      showAlert("Unable to upload image", true);
    }
  };

  const submitPrice = async (price: Price) => {
    try {
      await axios.post("http://localhost:4004/prices", price);
      showAlert("Price uploaded", false);
    } catch (error) {
      showAlert("Unable to add pricing", true);
    }
  }

  return (
    <div className="slight-margin">
      <Modal
        isVisible={isModalVisible}
        visibilitySetter={setIsModalVisible}>
        <AdminForm
          which={formType}
          onSubmitImage={submitImage}
          onSubmitPrice={submitPrice}
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
              {price.country},{price.travelHost},{price.status ? "available" : "unavailable"},{price.insurance ?? "-"},{price.travelHost},{price.priceLower || ""},{price.priceUpper || ""}
            </li>
          )}
        </ul>}
        <button onClick={() => openForm("price")}>+</button>
        <button onClick={() => remove(selectedItem!, "prices")}>Delete</button>
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