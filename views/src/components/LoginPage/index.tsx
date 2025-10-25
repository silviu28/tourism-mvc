import { useState, type FunctionComponent, type SyntheticEvent } from "react";

interface LoginProps {
  onSubmit: ({ username, password }: { username: string, password: string }) => void;
};

const Login: FunctionComponent<LoginProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    // ...
    onSubmit({
      username,
      password,
    });
  };

  return (
    <div>
      <img src={"public/images/bg3.jpg"} style={{ position: "absolute", display: "flex" }} />
      <div style={{
        borderRadius: "10px", background: "rgba(0, 0, 0, .5)",
        display: "grid", padding: "10px", left: "25%", top: "25%"
      }}>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column' }}>
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