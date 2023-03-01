import { useEffect, useState } from 'react';

export const useAndroidToast = () => {
  const [visibleToast, setVisibleToast] = useState(false);
  const toggleToast = () => {
    setVisibleToast(true);
  };
  useEffect(() => setVisibleToast(false), [visibleToast]);
  return {
    toggleToast,
    visibleToast,
  };
};
