import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useDonationURLParams = () => {
  const router = useRouter();
  const showGuid = (router?.query?.show_guid ?? '') as string;
  const [episodeGuid, setEpisodeGuid] = useState('');

  useEffect(() => {
    const episodeGuidTmps = (router.query.episode_guid ?? '') as Array<string>;
    const len = episodeGuidTmps?.length ?? 0;
    if (episodeGuidTmps && len > 0 && episodeGuidTmps[0]) {
      setEpisodeGuid(episodeGuidTmps[0]);
    }
  }, [router.query.episode_guid]);

  return {
    showGuid,
    episodeGuid,
  };
};
