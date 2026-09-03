import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Image } from "../../types";
import { useContext, useState, type FC, type SyntheticEvent } from "react";
import AlertContext from "../../AlertContext";
import useInvalidatingSubmit from "../../hooks/useInvalidatingSubmit";
import useInvalidatingRemove from "../../hooks/useInvalidatingRemove";
import styled from "styled-components";
import Modal from "../Modal";

const GalleryGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`;

const GalleryItem = styled.li<{ $selected: boolean }>`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${({ $selected }) => ($selected ? "orange" : "transparent")};
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

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
      <Modal isVisible={formVisible} visibilitySetter={setFormVisible}>
        <ImageForm onSubmit={(src) => submitImage({ src })} />
      </Modal>
      <h1>Edit images shown in gallery</h1>
      <div className="container">
        {!galleryLoading && (
          <GalleryGrid>
            {gallery.map((img) => (
              <GalleryItem
                key={img.id}
                $selected={img === selected}
                onClick={() => setSelected(img)}
              >
                <GalleryImage src={img.src} alt="" />
              </GalleryItem>
            ))}
          </GalleryGrid>
          )}
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