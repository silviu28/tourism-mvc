import { useQueryClient } from "@tanstack/react-query";
import removeItem from "../utils/removeItem";

export default function useInvalidatingRemove(path: string) {
  const queryClient = useQueryClient();

  return <T extends { id: number }>(identifiable: T) => {
    removeItem(identifiable, path).then((removed) => { 
      if (removed) queryClient.invalidateQueries({ queryKey: [path] });
    });
  };
};