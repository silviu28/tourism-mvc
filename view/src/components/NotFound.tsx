import styled from "styled-components";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const Code = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1;

  @media (max-width: 500px) {
    font-size: 4rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 1rem 0 0.5rem;
`;

const Message = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  max-width: 380px;
  line-height: 1.6;
  margin: 0 0 2rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Code>404</Code>
      <Title>Page not found</Title>
      <Message>
        The page you're looking for doesn't exist or may have been moved.
      </Message>
      <Actions>
        <button onClick={() => navigate("/")}>
          Back to home
        </button>
        <button onClick={() => navigate(-1)}>
          Go back
        </button>
      </Actions>
    </Wrapper>
  );
};

export default NotFound;