import { useState, type FunctionComponent, type SyntheticEvent } from "react";

interface ContactProps {
  onSubmit: (feedback: string) => void,
}

const Contact: FunctionComponent<ContactProps> = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState<string>('');

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    onSubmit(feedback);
  };

  return (
    <form className="container"
      onSubmit={submit}
      style={{ display: 'flex', flexDirection: 'column' }}>
      <p>
        Email: "johndoe@gmail.com"
      </p>
      <p>
        Phone: "+00 000 000 0000"
      </p>
      <p>
        Fax: "+ 000 00 00 00 000"
      </p>
      <p>
        Address: "Blue Lake Street No. 54, PO Box ..."
      </p>
      <p>
        We would also love to hear your feedback
      </p>
      <input
        type="text"
        placeholder="type here..."
        onChange={e => setFeedback(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Contact;