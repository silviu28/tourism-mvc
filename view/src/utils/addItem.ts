import axios from "axios";

export default async function addItem<T>(item: T, path: string): Promise<boolean> {
  try {
    await axios.post(`http://localhost:4004/api/${path}`, { item });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}