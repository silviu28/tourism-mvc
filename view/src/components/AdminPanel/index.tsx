import { useEffect, useState, type FC } from "react";
import { type Price } from "../../types";

const AdminPanel: FC = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    // ... fetch
  }, []);

  if (false)
    return <p>Access is forbidden</p>;

  return (
    <div>
      <h1>Edit price page</h1>
      <ul>
        {prices.map(price =>
          <li>
            {price.location},{price.country},{price.status},{price.insurance},{price.travelHost},{price.priceLower || ""},{price.priceUpper || ""}
          </li>
        )}
        <h1>Edit images shown in gallery</h1>
        <ul>
          {gallery.map(pictureSrc => <li>{pictureSrc}</li>)}
        </ul>
        <h1>View feedbacks sent by users</h1>
        <ul>
          {feedback.map(fb => <li>{fb}</li>)}
        </ul>
      </ul>
    </div>
  );
};

export default AdminPanel;