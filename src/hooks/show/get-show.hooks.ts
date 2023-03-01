import { useEffect, useRef, useState } from 'react';
import { DistributionPlatformDto, Show } from '../../redux/show/show.interface';
import { useQuery } from '@apollo/client';
import { GetSingleShowByShowGuid } from '../../api/types/show.types';
import { GQL_GET_SINGLE_SHOW_BY_SHOW_GUID } from '../../api/graphql/show.graphql';
import { useSelector } from 'react-redux';
import { selectCreatorShowGuids } from '../../redux/creator/creator.selector';
import { _get } from '../../utils/lodash.utils';
import { Social } from '../../api/types/fcl.types';
import { GQL_GET_EPISODES_BY_SHOW_GUID } from '../../api/graphql/episode.graphql';
import { Episode, GetEpisodesByShowGuid } from '../../api/types/episode.types';
import { GQL_GET_CREATOR_WALLET_ADDRESS_BY_CREATOR_ID } from '../../api/graphql/user.graphql';
import { GetCreatorWalletAddressByCreatorId } from '../../api/types/user.types';
import { useAppDispatch } from '../../redux/store';
import { updateCreatorShowsAction } from '../../redux/creator/creator.slice';

interface ISavedPlatformObj {
  [key: string]: DistributionPlatformDto;
}

export const useGetShowFromRemote = (_show_guid?: string) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<Show | null>(null);
  const [savedPlatformObj, setSavedPlatformObj] = useState<ISavedPlatformObj>(
    {},
  );
  const socials = Object.keys(savedPlatformObj).map((key) => {
    const platform = savedPlatformObj[key];
    const url = platform?.url ?? '';
    const social: Social = {
      key,
      value: url,
    };
    return social;
  }) as Array<Social>;
  const show_guids = useSelector(selectCreatorShowGuids);
  const show_guid = _show_guid ? _show_guid : _get(show_guids, ['0'], '');
  const fetchOnceRef = useRef(false);
  const { refetch: findSingleShowByShowGuid } =
    useQuery<GetSingleShowByShowGuid>(GQL_GET_SINGLE_SHOW_BY_SHOW_GUID, {
      skip: true,
    });
  useEffect(() => {
    const fetch = async () => {
      if (!show_guid || !!(fetchOnceRef?.current ?? false)) return;
      fetchOnceRef.current = true;
      const showsRes = await findSingleShowByShowGuid({
        show_guid,
      });
      const showsError = showsRes?.error ?? null;
      const showTmp = (showsRes?.data?.findShowByShowGuid ?? null) as Show;
      dispatch(updateCreatorShowsAction(showTmp));
      const savedPlatforms = showTmp?.distribution_platform ?? [];
      const savedPlatformObjTmp = savedPlatforms?.reduce((prev, p) => {
        const platformId = p?.platform_id ?? null;
        if (!platformId) return prev;
        return {
          ...prev,
          [platformId]: p,
        };
      }, {}) as ISavedPlatformObj;
      setShow(showTmp);
      setSavedPlatformObj(savedPlatformObjTmp);
    };
    fetch();
  }, [show_guid]);

  return {
    show,
    savedPlatformObj,
    socials,
  };
};

export const useGetShowAndEpisodesFromShowGuid = (
  show_guid: string,
  startFn: () => void,
  finalFn: () => void,
) => {
  const [show, setShow] = useState<Show | null>(null);
  const [creatorWalletAddress, setCreatorWalletAddress] = useState('');
  const [savedPlatformObj, setSavedPlatformObj] = useState<ISavedPlatformObj>(
    {},
  );
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);
  const { refetch: findSingleShowByShowGuid } =
    useQuery<GetSingleShowByShowGuid>(GQL_GET_SINGLE_SHOW_BY_SHOW_GUID, {
      skip: true,
    });
  const { refetch: findEpisodesByShowGuid } = useQuery<GetEpisodesByShowGuid>(
    GQL_GET_EPISODES_BY_SHOW_GUID,
    {
      skip: true,
    },
  );
  const { refetch: getCreatorWalletAddressByCreatorId } =
    useQuery<GetCreatorWalletAddressByCreatorId>(
      GQL_GET_CREATOR_WALLET_ADDRESS_BY_CREATOR_ID,
      {
        skip: true,
      },
    );
  const socials = Object.keys(savedPlatformObj).map((key) => {
    const platform = savedPlatformObj[key];
    const url = platform?.url ?? '';
    const social: Social = {
      key,
      value: url,
    };
    return social;
  }) as Array<Social>;

  useEffect(() => {
    const fetch = async () => {
      if (!show_guid) return;
      startFn();
      const showsRes = await findSingleShowByShowGuid({
        show_guid,
      });
      const episodesRes = await findEpisodesByShowGuid({ show_guid });
      const showError = showsRes?.error ?? null;
      if (showError) {
        throw new Error(
          'useGetShowFromShowGuid error:' + showError?.message ?? '',
        );
      }
      const showTmp = (showsRes?.data?.findShowByShowGuid ?? null) as Show;
      const savedPlatforms = showTmp?.distribution_platform ?? [];
      const savedPlatformObjTmp = savedPlatforms?.reduce((prev, p) => {
        const platformId = p?.platform_id ?? null;
        if (!platformId) return prev;
        return {
          ...prev,
          [platformId]: p,
        };
      }, {}) as ISavedPlatformObj;
      setSavedPlatformObj(savedPlatformObjTmp);
      const episodesTmp = (episodesRes?.data?.findEpisodesByShowGuid ??
        []) as Array<Episode>;
      const creator_id = showTmp?.creator_id ?? '';
      const creatorRes = await getCreatorWalletAddressByCreatorId({
        creator_id,
      });

      const creatorWalletAddressTmp =
        creatorRes?.data?.findCreatorWalletAddressByCreatorId?.address ?? '';

      setShow(showTmp);
      setEpisodes(episodesTmp);
      setCreatorWalletAddress(creatorWalletAddressTmp);
      finalFn();
    };
    fetch();
  }, [show_guid]);

  return { creatorWalletAddress, show, episodes, socials };
};
