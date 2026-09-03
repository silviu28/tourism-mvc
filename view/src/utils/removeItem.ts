import axios from "axios";

export default async function removeItem<T extends { id: number }>(identifiable: T, path: string): Promise<boolean> {
  if (window.confirm("Are you sure you want to delete this?")) {
    try {
      await axios.delete(`http://localhost:4004/api/${path}/${identifiable.id}`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  return false;
};