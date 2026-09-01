import { useContext, useState, type FunctionComponent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import content from "../../content.json";
import AlertContext from "../../AlertContext";
import { PageWrapper, Background, FloatContainer, FlexCol, CheckboxRow } from "../styled";

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

const CREDS_DEFAULT: FormData = {
    dob: new Date().toString(),
    username: '',
    email: '',
    password: '',
    confirm: '',
    notify: false
} as const

const Signup: FunctionComponent<SignupProps> = ({ onSubmit }) => {
  const showAlert = useContext(AlertContext);
  const [creds, setCreds] = useState<FormData>(() => CREDS_DEFAULT)

  const navigate = useNavigate();

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!creds.username || !/^[a-zA-Z0-9_.-]+$/.test(creds.username)) {
      showAlert("Username is required", "", true);
      return;
    } else if (creds.username.length < 3 || creds.username.length > 18) {
      showAlert("Username must be 3-18 characters", "", true);
      return
    }

    if (!creds.email || !/^\S+@\S+\.\S+$/.test(creds.email)) {
      showAlert("Invalid email address", "", true);
      return;
    }

    if (!creds.password) {
      showAlert("Password is required", "", true);
      return;
    } else if (creds.password.length < 8) {
      showAlert("Password too short", "", true);
      return;
    }

    if (creds.confirm !== creds.password) {
      showAlert("Passwords do not match", "", true);
      return;
    }

    setCreds(() => CREDS_DEFAULT)

    onSubmit(creds);
    navigate("/login");
  };

  return (
    <PageWrapper>
      <Background src={content.thumbnail2} />
      
      <FloatContainer>
        <form onSubmit={submit}>
          <FlexCol>
            <h1 style={{ textAlign: "center" }}>Sign up</h1>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Username: *</label>
                <input type="text" onChange={(e) => setCreds({ ... creds, username: e.target.value })} value={creds.username} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Full Name: </label>
                <input type="text" onChange={(e) => setCreds({ ... creds, name: e.target.value })} value={creds.name} />
              </div>
            </div>

            <label>Date of Birth: </label>
            <input type="date" onChange={(e) => setCreds({ ... creds, dob: e.target.value })} value={creds.dob} />

            <label>Email: *</label>
            <input type="text" onChange={(e) => setCreds({ ... creds, email: e.target.value })} value={creds.email} />

            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Password: *</label>
                <input type="password" onChange={(e) => setCreds({ ... creds, password: e.target.value })} value={creds.password} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Confirm password: *</label>
                <input type="password" onChange={(e) => setCreds({ ... creds, confirm: e.target.value })} value={creds.confirm} />
              </div>

            </div>

            <CheckboxRow>
              <input type="checkbox" onChange={(e) => setCreds({ ... creds, confirm: e.target.value })} value={creds.confirm} />
              <label>I would like to be notified by e-mail about offers.</label>
            </CheckboxRow>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <button className="button1" type="submit">
                Sign Up
              </button>
              <button type="button" className="button1" onClick={() => navigate('/login')} style={{ alignSelf: 'center' }}>
                Already logged?
              </button>
            </div>
          </FlexCol>
        </form>
      </FloatContainer>
    </PageWrapper>
  );
};

export default Signup;