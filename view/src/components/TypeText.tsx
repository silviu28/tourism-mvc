import styled, { keyframes } from "styled-components";

const typing = keyframes`
  from {
    width: 0%
  }

  to {
    width: 100%;
  }
`;

const fadeBg = keyframes`
  from {
    background-color: transparent;
  }

  to {
    background-color: #ffcfb7;
    color: black;
  }
`;

const Typing = styled.div`
  position: absolute;
  left: 8vw;
  top: 40vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: inline-block;
  color: black;
`;

const TypedText = styled.div`
  display: inline-block;
  overflow: hidden;
  letter-spacing: 2px;
  animation:
    ${typing} 1s steps(30, end) forwards,
    ${fadeBg} .2s ease-in forwards 3s;
  white-space: nowrap;
  font-size: 4rem;
  font-weight: 700;
  border-right: 4px solid orange;
  box-sizing: border-box;
  color: #ffffff;
  font-family: "Helvetica Neue", sans-serif;
`;

const RoundedButton = styled.button`
  background: #ffcfb7;
  justify-content: space-between;
  border: none;
  border-radius: 0;
  color: #000000;
  &:hover {
    background: white;
    color: black;
    transition: background .3s ease-in;
  }
`;

const TypeText = ({ text, actions }: { text: string, actions: { name: string, onClick: () => void }[] }) => {
  return (
    <>
      <Typing>
        <TypedText>{text}</TypedText>
        <div>
          {actions.map((action, idx) =>
            <RoundedButton
              key={`act-${idx}`}
              onClick={action.onClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
              {` ${action.name}`}
            </RoundedButton>
          )}
        </div>
      </Typing>
      
    </>
  );
};

export default TypeText;