import { useQueryClient } from "@tanstack/react-query";
import addItem from "../utils/addItem";

export default function useInvalidatingSubmit(path: string) {
  const queryClient = useQueryClient();

  return <T>(item: T) => {
    addItem(item, path).then((added) => {
      if (added) queryClient.invalidateQueries({ queryKey: [path] });
    });
  };
};