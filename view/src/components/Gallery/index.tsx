import { useContext, useState, type FC } from "react";
import type { Image } from "../../types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AlertContext from "../../AlertContext";
import styled from "styled-components";

const CarouselContainer = styled.div`
  position: relative;
  width: 600px;
  height: 400px;
  max-width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselImages = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BaseImage = styled.img`
  width: 60%;
  height: 80%;
  object-fit: cover;
  position: absolute;
  border-radius: 8px;
  transition: opacity 0.4s ease, transform 0.4s ease-in-out;
`;

const FrontImage = styled(BaseImage)`
  opacity: 1;
  transform: scale(1);
  z-index: 2;
  cursor: pointer;
`;

const SideImage = styled(BaseImage)<{ $side: "left" | "right" }>`
  opacity: 0.5;
  transform: scale(0.85);
  z-index: 1;
  left: ${({ $side }) => ($side === "left" ? "-5%" : "auto")};
  right: ${({ $side }) => ($side === "right" ? "-5%" : "auto")};
`;

const NavButton = styled.button<{ $side: "left" | "right" }>`
  position: absolute;
  ${({ $side }) => ($side === "left" ? "left: 10px;" : "right: 10px;")}
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 3;
  transition: background 0.2s ease;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Gallery: FC = () => {
  const showAlert = useContext(AlertContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: images = [], isLoading } = useQuery<Image[]>({
    queryKey: ["images"],
    queryFn: async () => {
      try {
        const imagesRes = await axios.get("http://localhost:4004/api/images");
        return imagesRes.data;
      } catch (_error) {
        showAlert("Unable to get gallery images.", "", true);
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
      <CarouselContainer>
        <p style={{ background: 'red' }}>Unable to get images, contact the administrator of this page.</p>
      </CarouselContainer>
    );
  }

  return (
    <CarouselContainer>
      <NavButton $side="left" onClick={goToPrevious}>‹</NavButton>
      <CarouselImages>
        <SideImage
          $side="left"
          src={images[getImageIndex(-1)].src}
          alt="Previous"
        />
        <FrontImage
          src={images[currentIndex].src}
          alt="Current"
        />
        <SideImage
          $side="right"
          src={images[getImageIndex(1)].src}
          alt="Next"
        />
      </CarouselImages>
      <NavButton $side="right" onClick={goToNext}>›</NavButton>
  </CarouselContainer>
  );
};

export default Gallery;