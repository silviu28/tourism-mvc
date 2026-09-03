import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Image } from "../../types";
import { useContext, useState, type FC, type SyntheticEvent } from "react";
import AlertContext from "../../AlertContext";
import useInvalidatingSubmit from "../../hooks/useInvalidatingSubmit";
import useInvalidatingRemove from "../../hooks/useInvalidatingRemove";

const selectedStyle = {
  background: 'lightblue'
};

interface ImageFormProps {
  onSubmit: (src: string) => void;
};

const ImageForm: FC<ImageFormProps> = ({ onSubmit }) => {
  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(src);
  }

  const [src, setSrc] = useState<string>("");
  return (
    <form onSubmit={submit} className="flex-col">
      <label>Image source:</label>
      <input
        type="text"
        onChange={e => setSrc(e.target.value)}
      />
      <button type="submit">Add Image</button>
    </form>
  );
};

const ManageGallery = () => {
  const showAlert = useContext(AlertContext);
  const [selected, setSelected] = useState<Image | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const submitImage = useInvalidatingSubmit("images");
  const removeImage = useInvalidatingRemove("images");

  const { data: gallery = [], isLoading: galleryLoading } = useQuery<Image[]>({
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

  return (
    <>
      {formVisible && (
        <ImageForm onSubmit={(src) => submitImage({ src })} />
      )}
      <h1>Edit images shown in gallery</h1>
      <div className="container">
        {!galleryLoading && <ul>
          {gallery.map((img) =>
            <li
              key={img.id}
              style={img === selected ? selectedStyle : {}}
              onClick={() => setSelected(img)}
            >
              {img.src}
            </li>
          )}
        </ul>}
        <button onClick={() => setFormVisible(true)}>+</button>
        <button
         disabled={!selected}
         onClick={() => removeImage(selected as { id: number })}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ManageGallery;