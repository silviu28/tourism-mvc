import styled from "styled-components";

const PolaroidFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 20px;
  padding-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);

  sub {
    margin-top: 20px;
    color: black;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const PolaroidImage = ({ src, alt, subtext }: { src: string, alt?: string, subtext?: string }) => {
  return (
    <PolaroidFrame>
      <img src={src} alt={alt} />
      <sub>{subtext || alt}</sub>
    </PolaroidFrame>
  )
};

export default PolaroidImage;