import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const SplashWrapper = styled.div<{ $phase: 'in' | 'hold' | 'out' }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f0f;

  animation: ${({ $phase }) =>
    $phase === 'in' ? fadeIn : $phase === 'out' ? fadeOut : 'none'}
    0.6s ease forwards;

  opacity: ${({ $phase }) => ($phase === 'hold' ? 1 : undefined)};
`;

const Logo = styled.img`
  width: 96px;
  height: 96px;
`;

function Splash({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('hold'), 300);
    const outTimer = setTimeout(() => setPhase('out'), 300 + 1000);
    const doneTimer = setTimeout(onFinish, 300 + 1000 + 300);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <SplashWrapper $phase={phase}>
      <Logo src="/favi.png" alt="Logo" />
    </SplashWrapper>
  );
}

export default Splash;