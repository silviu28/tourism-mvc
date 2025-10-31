import { useEffect, useState, type FC } from "react";
import { type AdminPanelItem, type Feedback, type Image, type Price } from "../../types";
import axios from "axios";

const remove = async (selectedItem: AdminPanelItem, path: string) => {
  if (window.confirm("Are you sure you want to delete this?")) {
    try {
      await axios.delete(`http://localhost:4004/${path}/${selectedItem.id}`);
    } catch (error) {
      console.error(error);
    }
  }
};

const AdminPanel: FC = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [gallery, setGallery] = useState<Image[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedItem, setSelectedItem] = useState<AdminPanelItem>(null);

  useEffect(() => {
    (async () => {
      try {
        const pricesRes = await axios.get("http://localhost:4004/prices");
        setPrices(pricesRes.data);
        const galleryRes = await axios.get("http://localhost:4004/images");
        setGallery(galleryRes.data);
        const feedbackRes = await axios.get("http://localhost:4004/feedback");
        setFeedback(feedbackRes.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (false)
    return <p>Access is forbidden</p>;

  console.log(`Selecting`, selectedItem);

  return (
    <div>
      <h1>Edit price page</h1>
      <div className="container">
        <ul>
          {prices.map(price =>
            <li onClick={() => setSelectedItem(price)}>
              {price.country},{price.host},{price.status ? "available" : "unavailable"},{price.insurance ?? "-"},{price.travelHost},{price.priceLower || ""},{price.priceUpper || ""}
            </li>
          )}
        </ul>
        <button>+</button>
        <button onClick={() => remove(selectedItem, "prices")}>Delete</button>
      </div>
      <h1>Edit images shown in gallery</h1>
      <div className="container">
        <ul>
          {gallery.map(img =>
            <li onClick={() => setSelectedItem(img)}>{img.src}</li>)}
        </ul>
        <button>+</button>
        <button onClick={() => remove(selectedItem, "images")}>Delete</button>
      </div>
      <h1>View feedbacks sent by users</h1>
      <div className="container">
        <ul>
          {feedback.map(fb =>
            <li onClick={() => setSelectedItem(fb)}>{fb.feedback}</li>)}
        </ul>
        <button onClick={() => remove(selectedItem, "feedback")}>Delete</button>
      </div>
    </div>
  );
};

export default AdminPanel;