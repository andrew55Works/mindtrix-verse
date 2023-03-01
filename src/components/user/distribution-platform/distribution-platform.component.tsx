import React, { FC, useState, useRef } from 'react';
import { CommonFlexContainer } from '../../common/flexbox/common-flex.styles';
import { Text } from '../../../styles/styled-system/text.theme';
import { Button } from '../../../styles/styled-system/button.theme';
import * as S from './distribution-platform.styles';
import CommonInputWithWarning from '../../common/input/common-input';
import { useCreatorAccountI18n } from '../../../hooks/i18n/i18n.hooks';
import DistributionPlatformConnected from './distribution-platform-connected.component';
import { Platform } from '../../../api/types/platform.types';
import { useMutation } from '@apollo/client';
import { PostUpdateDistributionPlatforms } from '../../../api/types/show.types';
import { GQL_POST_UPDATE_DISTRIBUTION_PLATFORMS } from '../../../api/graphql/show.graphql';
import { selectCreatorShowGuids } from '../../../redux/creator/creator.selector';
import {
  DistributionPlatformDto,
  Show,
} from '../../../redux/show/show.interface';
import { useSelector } from 'react-redux';

export interface DistributionPlatformProps extends Platform {
  isSaved?: boolean;
  linkDefaultUrl: string;
}
const DistributionPlatform: FC<DistributionPlatformProps> = ({
  _id,
  isSaved,
  name,
  linkDefaultUrl,
  domain: placeholder,
  images: {
    medium: { url: platformIconUrl },
  },
}) => {
  const [url, setUrl] = useState(linkDefaultUrl);
  const [isEditMode, setIsEditMode] = useState(false);
  const show_guids = useSelector(selectCreatorShowGuids);
  const [updateDistributionPlatforms] =
    useMutation<PostUpdateDistributionPlatforms>(
      GQL_POST_UPDATE_DISTRIBUTION_PLATFORMS,
    );
  const { text } = useCreatorAccountI18n();

  const onChange = {
    socialMediaLink: (value: string, isValid: boolean) => {
      setUrl(value);
    },
  };

  const onClick = {
    edit: (e: React.MouseEvent<HTMLHeadElement>) => {
      e.preventDefault();
      setIsEditMode((prev) => !prev);
    },
    save: async () => {
      if (!show_guids || (show_guids?.length ?? 0) < 1)
        throw new Error(
          'Cannot save platforms due to unknown show_guid:' +
            JSON.stringify(show_guids),
        );
      const variables = {
        show_guid: show_guids[0],
        dto: { platform_id: _id, url },
      };
      const updateRes = await updateDistributionPlatforms({ variables });
      const updateError = updateRes?.errors ?? null;
      const show = (updateRes?.data?.updateDistributionPlatforms ??
        null) as Show;
      const platforms =
        show?.distribution_platform ?? ([] as Array<DistributionPlatformDto>);
      const isPlatformExist = platforms?.some(
        (platform) => platform.platform_id === _id,
      );
      const isUpdateSuccess = !updateError && isPlatformExist;
      if (isUpdateSuccess) {
        setIsEditMode(false);
      } else {
        alert('Cannot save the link, please refresh the page to retry.');
      }
    },
    cancelEditMode: () => {
      setUrl(linkDefaultUrl);
      setIsEditMode(false);
    },
  };

  const EditButton = () =>
    isEditMode ? null : (
      <Text.h5
        alignSelf={'center'}
        status={'basic'}
        color={'primary.4'}
        textDecorator={'underline'}
        children={text.h5_edit_link}
        onClick={onClick.edit}
      />
    );

  const SaveButton = () =>
    isEditMode ? (
      <CommonFlexContainer
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        width={'100%'}
      >
        <Button.Square
          status={'primary'}
          appearance={'ghost'}
          marginTop={2}
          marginLeft={0}
          marginRight={3}
          size={'small'}
          children={'Cancel'}
          onClick={onClick.cancelEditMode}
          justifyContent={'center'}
        />
        <Button.Square
          status={'primary'}
          appearance={'filled'}
          marginTop={2}
          marginLeft={0}
          marginRight={0}
          size={'small'}
          children={'Save'}
          onClick={onClick.save}
          justifyContent={'center'}
        />
      </CommonFlexContainer>
    ) : null;

  return (
    <S.ItemContainer>
      <CommonFlexContainer
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        width={'100%'}
        marginBottom={3}
      >
        <CommonFlexContainer
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'flex-start'}
        >
          <S.SVG alt={_id} src={platformIconUrl} />
          <Text.h2
            my={0}
            status={'basic'}
            alignSelf={'center'}
            children={name}
          />
        </CommonFlexContainer>
        <EditButton />
      </CommonFlexContainer>
      <CommonFlexContainer
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'flex-start'}
        width={'100%'}
      >
        <CommonInputWithWarning
          autocomplete={'on'}
          customValidation={() => true}
          placeholder={placeholder}
          maxLength={200}
          disabled={!isEditMode}
          name={'social-media-link'}
          isShowCrossIcon={isEditMode}
          onChange={onChange.socialMediaLink}
          value={url}
        />
      </CommonFlexContainer>
      <SaveButton />
      <DistributionPlatformConnected isShow={!!isSaved ? isSaved : false} />
    </S.ItemContainer>
  );
};

export default DistributionPlatform;
