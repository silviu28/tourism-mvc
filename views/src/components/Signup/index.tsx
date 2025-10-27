import { useState, type FunctionComponent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";

interface FormData {
  name?: string,
  dob: string,
  username: string,
  email: string,
  password: string,
  confirm: string,
  notify: boolean,
}

interface SignupProps {
  onSubmit: (data: FormData) => void,
}

const Signup: FunctionComponent<SignupProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [notify, setNotify] = useState<boolean>(false);

  const navigate = useNavigate();

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    // ...
    onSubmit({
      name,
      dob,
      username,
      email,
      password,
      confirm,
      notify
    });
  };

  return (
    <div>
      <img src={"public/images/bg3.jpg"} style={{ position: "absolute" }} />
      <div style={{
        borderRadius: "10px", background: "rgba(0, 0, 0, .5)",
        display: "grid", padding: "7vw", margin: "10vw", left: "25%", top: "25%"
      }}>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ textAlign: "center" }}>Sign up</h1>
          <label>Full Name: </label>
          <input type="text" onChange={e => setName(e.target.value)} />

          <label>Date of Birth: </label>
          <input type="date" onChange={e => setDob(e.target.value)} />

          <label>Username: *</label>
          <input type="text" onChange={e => setUsername(e.target.value)} />

          <label>Email: *</label>
          <input type="text" onChange={e => setEmail(e.target.value)} />

          <label>Password: *</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />

          <label>Confirm password: *</label>
          <input type="password" onChange={e => setConfirm(e.target.value)} />

          <input type="checkbox" onChange={() => setNotify(!notify)} />
          <label>I would like to be notified by e-mail about offers.</label>

          <button className="button1" type="submit">
            Sign Up
          </button>
          <br />
        </form>
        <button
          className="button1"
          onClick={() => navigate('/login')}>
          Already logged?
        </button>
      </div>
    </div>
  );
};

export default Signup;