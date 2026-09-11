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