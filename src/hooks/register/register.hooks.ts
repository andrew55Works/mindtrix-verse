import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCreatorEmailVerificationInfo } from '../../redux/creator-signup/creator-signup.selector';
import { PAGE_URL } from '../../utils/page-router.utils';

export const useRedirectToPwdPage = () => {
  const emailVerificationInfo = useSelector(selectCreatorEmailVerificationInfo);
  const isRedirectingRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!emailVerificationInfo) return;
    const is_verified_email = emailVerificationInfo?.is_verified_email ?? false;
    const isRedirecting = isRedirectingRef?.current ?? false;
    if (is_verified_email && !isRedirecting) {
      isRedirectingRef.current = true;
      router.push(PAGE_URL.creators_verify_password);
    }
  }, [emailVerificationInfo]);
};
