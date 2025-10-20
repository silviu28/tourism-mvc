import type { FunctionComponent } from "react";

interface BadgeProps {
  src: string,
  alt?: string,
}

const Badge: FunctionComponent<BadgeProps> = ({ src, alt }) => {
  return (
    <img
      style={{ width: 30, height: 30 }}
      src={src}
      alt={alt}
    />
  );
};

export default Badge;