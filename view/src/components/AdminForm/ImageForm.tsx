import { useState, type FC, type SyntheticEvent } from "react";

interface ImageFormProps {
  onSubmit: (src: string) => void;
};

const ImageForm: FC<ImageFormProps> = ({ onSubmit }) => {
  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(src);
  }

  const [src, setSrc] = useState<string>("");
  return (
    <form onSubmit={submit}>
      <label>Image source:</label>
      <input
        type="text"
        onChange={e => setSrc(e.target.value)}
      />
    </form>
  );
};

export default ImageForm;