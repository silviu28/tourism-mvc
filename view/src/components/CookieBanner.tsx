import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { FormControlLabel, Switch } from '@mui/material';

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: min(560px, calc(100vw - 32px));
  background: #1f2937;
  color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 16px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  h1 {
    color: white;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.4;
    color: #d1d5db;
    flex: 1;
  }

  button {
    background: #facc15;
    color: #111827;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s ease;

    &:hover {
      background: #eab308;
    }

    &:focus-visible {
      outline: 2px solid #facc15;
      outline-offset: 2px;
    }
  }
`;

const EvenSpaced = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const CookieBanner = ({ visible, onAccept }: { visible: boolean, onAccept: () => void }) => {
  const [selectionModalVisible, setSelectionModalVisible] = useState(false);
  const [options, setOptions] = useState({
    preferences: true,
    statistics: true,
    marketing: true,
  });

  useEffect(() => {
    console.log(options);
  }, [options]);

  if (!visible) return null;

  return (
    <>
      <Modal
        isVisible={selectionModalVisible}
        visibilitySetter={setSelectionModalVisible}
        options={[
          {
            name: "Accept Selection",
            onClick: () => {}
          },
          {
            name: "Accept All",
            onClick: () => {}
          }
        ]}
      >
        <h1>Cookies</h1>
        <EvenSpaced>
          <p>Preferences</p>
          <Switch 
            value={options.preferences} 
            onChange={(e) => setOptions({ ...options, preferences: e.target.checked })}
          />
        </EvenSpaced>
        <EvenSpaced>
          <p>Statistics</p>
          <Switch 
            value={options.statistics} 
            onChange={(e) => setOptions({ ...options, statistics: e.target.checked })}
          />
        </EvenSpaced>
        <EvenSpaced>
          <p>Marketing</p>
          <Switch 
            value={options.marketing} 
            onChange={(e) => setOptions({ ...options, marketing: e.target.checked })}
          />
        </EvenSpaced>
      </Modal>
      <BannerWrapper role="dialog" aria-label="Cookie consent">
        <h1>Cookies</h1>
        <p>
          We use cookies to improve your experience. By continuing, you agree to
          our use of cookies.
        </p>
        <button onClick={onAccept}>Accept All</button>
        <button onClick={() => setSelectionModalVisible(true)}>Choose</button>
      </BannerWrapper>
    </>
  );
};

export default CookieBanner;