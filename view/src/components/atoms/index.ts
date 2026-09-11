import styled, { keyframes } from "styled-components";

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PostCard = styled.div<{ $delay: number }>`
  position: relative;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px 20px;
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards ${({ $delay }) => $delay}s;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: #f97316;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;

export const CardAccent = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #f97316;
  margin-bottom: 16px;
`;

export const PostTitle = styled.h3`
  font-size: 1.05rem;
  margin: 0 0 8px;
  color: #111827;
  line-height: 1.4;
`;

export const PostMeta = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  text-align: left;
`;

export const SectionBreak = styled.hr`
  margin: 100px;
  color: #7a665b;
`;

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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 11, 14, 0.65);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.15s ease;
`;