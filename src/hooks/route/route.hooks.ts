import { useRouter } from 'next/router';
import { PAGE_URL } from '../../utils/page-router.utils';

export const useRouteIntent = () => {
  const router = useRouter();

  return {
    collectors_my: (walletAddress: string) => {
      const myCollectionURL = `${PAGE_URL.collectors_my.path}/${
        walletAddress ? walletAddress : '0x'
      }`;
      router.push(myCollectionURL);
    },
  };
};
