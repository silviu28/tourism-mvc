import { useContext, useState, type FunctionComponent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import content from "../../content.json";
import "./style.css";
import AlertContext from "../../AlertContext";

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
  const showAlert = useContext(AlertContext);

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

    if (!username || !/^[a-zA-Z0-9_.-]+$/.test(username)) {
      showAlert("Username is required", "", true);
      return;
    } else if (username.length < 3 || username.length > 18) {
      showAlert("Username must be 3-18 characters", "", true);
      return
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showAlert("Invalid email address", "", true);
      return;
    }

    if (!password) {
      showAlert("Password is required", "", true);
      return;
    } else if (password.length < 8) {
      showAlert("Password too short", "", true);
      return;
    }

    if (confirm !== password) {
      showAlert("Passwords do not match", "", true);
      return;
    }

    setName("");
    setDob("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setNotify(false);

    onSubmit({
      name,
      dob,
      username,
      email,
      password,
      confirm,
      notify
    });
    navigate("/login");
  };

  return (
    <div>
      <img src={content.thumbnail2}
        style={{ height: "94vh", width: "100vw" }}
      />
      <div className="float-container">
        <form onSubmit={submit} className="flex-col">
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