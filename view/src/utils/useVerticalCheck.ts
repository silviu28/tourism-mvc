import { useEffect, useState } from "react";

const isVertical = () => typeof window !== "undefined" && window.innerWidth < window.innerHeight;

export default function useVerticalCheck() {
  const [vertical, setVertical] = useState(() => isVertical());

  useEffect(() => {
    const updateVertSt = (_e: UIEvent) => {
      setVertical(isVertical());
    };
    window.addEventListener("resize", updateVertSt);
    return () => window.removeEventListener("resize", updateVertSt);
  }, []);

  return vertical;
};