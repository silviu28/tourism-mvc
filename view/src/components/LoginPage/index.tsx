import { useState, type FunctionComponent, type SyntheticEvent } from "react";
import content from "../../content.json";
import { useNavigate } from "react-router";
import { Background, CheckboxRow, FloatContainer, PageWrapper } from "../styled";

interface LoginProps {
  onSubmit: ({ username, password }: { username: string, password: string }) => void;
};

const Login: FunctionComponent<LoginProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState(false);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    setPassword("");
    setUsername("");

    onSubmit({
      username,
      password,
    });

    navigate("/");
  };

  return (
    <PageWrapper>
      <Background src={content.thumbnail2} />
      <FloatContainer style={{ width: 400 }}>
        <h1 style={{ textAlign: "center", top: '85vh', left: '90vw', color: 'black' }}>Login</h1>
        <form onSubmit={submit} className="flex-col">

          <label>Username:</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />

          <label>Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />

          <CheckboxRow>
            <input type="checkbox" onChange={() => setRememberMe(!rememberMe)} />
            <label>Remember me</label>
          </CheckboxRow>

          <button className="button1" type="submit" style={{ marginTop: '10px' }}>
            login
          </button>
          <br />
        </form>
      </FloatContainer>
    </PageWrapper>
  );
};

export default Login;