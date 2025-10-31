import type { FunctionComponent } from 'react';
import './style.css';

interface ImageParallaxProps {
  src: string;
}

const ImageParallax: FunctionComponent<ImageParallaxProps> = ({ src }) => {
  return (
    <div style={{
      backgroundImage: `url(${src})`,
      minHeight: "500px",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }} />
  );
};

export default ImageParallax;