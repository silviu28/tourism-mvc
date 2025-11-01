import { useState, type FunctionComponent, type SyntheticEvent } from "react";
import "./style.css";
import content from "../../content.json";

interface LoginProps {
  onSubmit: ({ username, password }: { username: string, password: string }) => void;
};

const Login: FunctionComponent<LoginProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({
      username,
      password,
    });

    setPassword("");
    setUsername("");
  };

  return (
    <div>
      <img src={content.thumbnail2} className="background" />
      <div className="float-container">
        <form onSubmit={submit} className="flex-col">
          <h1 style={{ textAlign: "center" }}>Sign up</h1>

          <label>Username:</label>
          <input type="text" onChange={e => setUsername(e.target.value)} />

          <label>Password:</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />

          <button className="button1" type="submit">
            login
          </button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Login;