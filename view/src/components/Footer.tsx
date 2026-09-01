import { useState } from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #ffffff;
  color: #000000;
  padding: 4rem 2rem 0;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 3rem;
  border-bottom: 1px solid #374151;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Logo = styled.img`
  height: 32px;
  width: 32px;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: orange;
  color: black;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #374151;
    color: #ffffff;
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ColumnTitle = styled.h4`
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: #000000;
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  font-size: 0.875rem;
  color: #3a3a3a;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #000000;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
`;

const Footer = () => {
  const [disclosing, setDisclosing] = useState(false);

  return (
    <FooterWrapper>
      <FooterContent>
        <BrandColumn>
          <Logo src="favi.png" alt="Company logo" />
          <p>MyTravel</p>
          <SocialRow>
            <SocialIcon href="#" aria-label="Twitter">𝕏</SocialIcon>
            <SocialIcon href="#" aria-label="LinkedIn">in</SocialIcon>
            <SocialIcon href="#" aria-label="GitHub">gh</SocialIcon>
          </SocialRow>
        </BrandColumn>

        <LinkColumn>
          <ColumnTitle>Product</ColumnTitle>
          <FooterLink href="#">Pricing</FooterLink>
        </LinkColumn>

        <LinkColumn>
          <ColumnTitle>Company</ColumnTitle>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Press</FooterLink>
        </LinkColumn>

        <LinkColumn>
          <ColumnTitle>Contact</ColumnTitle>
          <FooterLink href="#">E-mail</FooterLink>
          <FooterLink href="#">Help center</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </LinkColumn>

        <LinkColumn>
          <ColumnTitle>Legal</ColumnTitle>
          <FooterLink href="#">Privacy policy</FooterLink>
          <FooterLink href="#">Terms of service</FooterLink>
          <FooterLink href="#">Cookie settings</FooterLink>
        </LinkColumn>
      </FooterContent>

      <BottomBar>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setDisclosing(true)}>
          {`© ${new Date().getFullYear()} MyTravel, Inc. All rights reserved.*`}{disclosing && 'FOR LEGAL REASONS THIS IS NOT A REAL COMPANY.'}
        </span>
      </BottomBar>
    </FooterWrapper>
  );
};

export default Footer;