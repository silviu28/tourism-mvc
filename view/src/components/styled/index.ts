import styled from "styled-components";

export const PageWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 94vh;
  overflow: hidden;
  z-index: 0;
`;

export const Background = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export const FloatContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
`;