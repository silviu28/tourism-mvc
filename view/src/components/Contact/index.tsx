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
    <form className="container" onSubmit={submit}>
      <p>
        Email: <a>johndoe@gmail.com</a>
      </p>
      <p>
        Phone: <a>+00 000 000 0000</a>
      </p>
      <p>
        Fax: <a>+ 000 00 00 00 000</a>
      </p>
      <p>
        Address: Blue Lake Street No. 54, Greenwich, London, UK
      </p>
      <div>
        <iframe
          width="100%"
          height="600"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=GREENWICH+(The%20Travel%20Company)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
      </div>
      <p>
        ❤️ We would also love to hear your feedback
      </p>
      <p style={{ fontSize: "14px" }}>Feedback is anonymous and only visible to administrators.</p>
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