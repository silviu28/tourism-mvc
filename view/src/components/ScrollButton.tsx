import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  width: 67px;
  height: 67px;
  left: 100%;
  top: 100%;
  transform: translate(-8vw, -15vh);
  z-index: 20;
`;

const ScrollButton = ({ toTop }: { toTop: () => void }) => {
  return (
    <Button onClick={toTop}>
      ↑
    </Button>
  );
};

export default ScrollButton;