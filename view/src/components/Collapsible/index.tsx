import { useState, type FunctionComponent, type ReactNode } from "react";
import styled from "styled-components";

const ImgThumbnail = styled.img`
  width: 100%;
  height: 100px;
  object-fit: none;
  object-fit: cover;
`;

const InfoCollapse = styled.div`
  background-color: white;
  color: black;
  cursor: pointer;
  width: 100%;
  text-align: center;
  outline: none;
  font-size: 18px;
  padding-top: 1%;
  padding-bottom: 1%;
  &:hover {
    background-color: yellow;
  }
`;

const CompositeCollapse = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  box-shadow: 20px 20px;
  border: solid;
`;

const InfoCollapseContent = styled.div`
  height: 0%;
  transition: visibility 0.3s ease;
  background-color: white;
  padding: 2%;
`;

interface CollapsibleProps {
  thumbnailSrc?: string,
  title?: string,
  alt?: string,
  children: ReactNode[] | ReactNode,
}

const Collapsible: FunctionComponent<CollapsibleProps> = ({ thumbnailSrc, title, children, alt }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <CompositeCollapse>
      {thumbnailSrc != null
        && <ImgThumbnail src={thumbnailSrc} alt={alt} />}
      <InfoCollapse
        onClick={() => setOpen(!open)}>
        {title}
      </InfoCollapse>
      {open && (
        <InfoCollapseContent>
          {children}
        </InfoCollapseContent>
      )}
    </CompositeCollapse>
  );
};

export default Collapsible;