import { useEffect, useState } from 'react';

const getIsMobile = () => window.innerWidth <= 768;

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { width: innerWidth, height: innerHeight };
};

export const useIsMobileLayout = () => {
  const [isMobileLayout, setIsMobileLayout] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobileLayout(getIsMobile());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { isMobileLayout };
};

export const useScreenHeight = () => {
  const [screenSize, setScreenSize] = useState(getWindowSize());
  const [isMobileLayout, setIsMobileLayout] = useState(getIsMobile());

  useEffect(() => {
    const resizeListener = () => {
      setScreenSize(getWindowSize());
      setIsMobileLayout(getIsMobile());
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return { isMobileLayout, screenSize };
};
