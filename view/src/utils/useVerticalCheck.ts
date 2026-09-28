import { useEffect, useState } from "react";

export default function useVerticalCheck() {
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    const updateVertSt = (_e: UIEvent) => {
      setVertical(window.innerWidth < window.innerHeight);
    };
    window.addEventListener("resize", updateVertSt);
    return () => window.removeEventListener("resize", updateVertSt);
  }, []);

  return vertical;
};