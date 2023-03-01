import React, { FC, useEffect, useState } from 'react';
import * as S from './distribution-platform.styles';
import DistributionPlatform, {
  DistributionPlatformProps,
} from './distribution-platform.component';
import { useQuery } from '@apollo/client';
import { GQL_GET_ALL_PLATFORMS } from '../../../api/graphql/platform.graphql';
import { GetAllPlatforms, Platform } from '../../../api/types/platform.types';
import { GetSingleShowByShowGuid } from '../../../api/types/show.types';
import { GQL_GET_SINGLE_SHOW_BY_SHOW_GUID } from '../../../api/graphql/show.graphql';
import { selectCreatorShowGuids } from '../../../redux/creator/creator.selector';
import { useSelector } from 'react-redux';
import { _get } from '../../../utils/lodash.utils';
import {
  DistributionPlatformDto,
  Show,
} from '../../../redux/show/show.interface';

//
// interface Props {
//   socialMedias: Array<SocialMediaInputProps>;
// }
// const SocialMediaInputs: FC<Props> = ({ socialMedias }) => {
const DistributionPlatforms: FC<{}> = () => {
  const [platforms, setPlatforms] = useState<Array<DistributionPlatformProps>>(
    [],
  );
  const show_guids = useSelector(selectCreatorShowGuids);
  const show_guid = _get(show_guids, ['0'], '');
  const { refetch: getAllPlatforms } = useQuery<GetAllPlatforms>(
    GQL_GET_ALL_PLATFORMS,
    {
      skip: true,
    },
  );
  const { refetch: findSingleShowByShowGuid } =
    useQuery<GetSingleShowByShowGuid>(GQL_GET_SINGLE_SHOW_BY_SHOW_GUID, {
      skip: true,
    });

  useEffect(() => {
    const getAllPlatformsApi = async () => {
      const systemPlatformsRes = await getAllPlatforms();
      const showsRes = await findSingleShowByShowGuid({
        show_guid,
      });
      const showsError = showsRes?.error ?? null;
      const shows = (showsRes?.data?.findShowByShowGuid ?? null) as Show;
      const savedPlatforms = shows?.distribution_platform ?? [];
      const savedPlatformObj = savedPlatforms?.reduce((prev, p) => {
        const platformId = p?.platform_id ?? null;
        if (!platformId) return prev;
        return {
          ...prev,
          [platformId]: p,
        };
      }, {}) as { [key: string]: DistributionPlatformDto };
      const platformsTmp = (systemPlatformsRes?.data?.platforms ?? []).map(
        (p) => {
          const _id = p?._id ?? '';
          const obj: DistributionPlatformProps = {
            ...p,
            linkDefaultUrl: savedPlatformObj[_id]?.url ?? '',
          };
          return obj;
        },
      );
      setPlatforms(platformsTmp);
    };
    getAllPlatformsApi();
  }, []);

  const PlatformEles = platforms.map((platform, index) => (
    <DistributionPlatform key={index} {...platform} />
  ));

  return <S.ListContainer>{PlatformEles}</S.ListContainer>;
};

export default DistributionPlatforms;
