import styled from "styled-components";
import { PEACH } from "../colors";

const Button = styled.button`
  background-color: orange;
  position: fixed;
  width: 80px;
  height: 80px;
  left: 100%;
  top: 100%;
  transform: translate(-8vw, -15vh);
  z-index: 20;
  font-size: 25px;
  border: none;
  border-radius: 50%;
`;

const ScrollButton = ({ toTop }: { toTop: () => void }) => {
  return (
    <Button onClick={toTop}>
      ↑
    </Button>
  );
};

export default ScrollButton;