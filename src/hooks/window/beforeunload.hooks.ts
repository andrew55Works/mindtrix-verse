import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useBeforeunloadEventListener = (isShow: boolean) => {
  const router = useRouter();
  useEffect(() => {
    const warningText =
      'You have unsaved changes - are you sure you wish to leave this page?';
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!isShow) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!isShow) return;
      if (window.confirm(warningText)) return;
      router.events.emit('routeChangeError');
      //push state, because browser back action changes link and changes history state
      // but we stay on the same page
      if (router.asPath !== window.location.pathname) {
        window.history.pushState('', '', router.asPath);
      }
      throw 'routeChange aborted.';
    };
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [isShow]);
};
