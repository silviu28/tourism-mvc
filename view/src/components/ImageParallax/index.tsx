import type { FunctionComponent } from 'react';
import './style.css';

interface ImageParallaxProps {
  src: string;
}

const ImageParallax: FunctionComponent<ImageParallaxProps> = ({ src }) => {
  return (
    <div style={{
      backgroundImage: `url(${src})`,
      minHeight: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }} />
  );
};

export default ImageParallax;