import { useContext, useState, type FC } from "react";
import type { Image } from "../../types";
import axios from "axios";
import UserContext from "../../UserContext";
import "./style.css";
import { useQuery } from "@tanstack/react-query";

const Gallery: FC = () => {
  const [, , showAlert] = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: images = [], isLoading } = useQuery<Image[]>({
    queryKey: ["images"],
    queryFn: async () => {
      try {
        const imagesRes = await axios.get("http://localhost:4004/images");
        return imagesRes.data;
      } catch (error) {
        showAlert("Unable to get gallery images.");
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  const getImageIndex = (offset: number) => {
    return (currentIndex + offset + images.length) % images.length
  }

  if (!images.length) {
    return (
      <div>
        <p>Seems there's no images uploaded..</p>
      </div>
    );
  }

  return (
    <div className='carousel-container'>
      <button className='nav-button left' onClick={goToPrevious}>‹</button>

      <div className='carousel-images'>
        <img
          src={images[getImageIndex(-1)].src}
          alt='Previous'
          className='carousel-image behind left-image'
        />
        <img
          src={images[currentIndex].src}
          alt='Current'
          className='carousel-image front'
        />
        <img
          src={images[getImageIndex(1)].src}
          alt='Next'
          className='carousel-image behind right-image'
        />
      </div>

      <button className='nav-button right' onClick={goToNext}>›</button>
    </div>
  );
};

export default Gallery;