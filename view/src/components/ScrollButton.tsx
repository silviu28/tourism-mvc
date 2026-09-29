import styled from "styled-components";

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
  @media (max-width: 1000px) {
    width: 60px;
    height: 60px;
    left: 85%;
    top: 100%;
    font-size: 15px;
  }
`;

const ScrollButton = ({ toTop }: { toTop: () => void }) => {
  return (
    <Button onClick={toTop} data-testid="top-btn" >
      ↑
    </Button>
  );
};

export default ScrollButton;