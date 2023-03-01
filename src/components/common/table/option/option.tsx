import React, { FC } from 'react';
import OptionsSvg from '../../../../assets/icons/icon_options.svg';
import WebLinkSvg from '../../../../assets/svg/icon_web_link.svg';
import * as S from './option.styles';
import { NFTPodcastAudioEssenceDto } from '../../../../api/types/nft.types';
import { NFTPodcastAudioEssenceVo } from '../../../../redux/essence/essence.interface';
import { LIST_ENUM } from '../../../../api/types/list-enum.types';
import { TableEnum } from '../table';
import { openNewWindow } from '../../../../utils/window.utils';
import { PAGE_URL } from '../../../../utils/page-router.utils';

interface Props {
  audioEssence: NFTPodcastAudioEssenceDto & NFTPodcastAudioEssenceVo;
  onClickOption: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  tableEnum: TableEnum;
}

export const Option: FC<Props> = ({
  audioEssence,
  onClickOption,
  tableEnum,
}) => {
  const essenceId = (audioEssence?.essence_uuid ?? 0).toString();
  const essenceName = audioEssence?.nft_name ?? '';
  const listStatus = audioEssence?.list_status ?? LIST_ENUM.STATUS.NONE;
  const isEssenceCreated = listStatus === LIST_ENUM.STATUS.ESSENCE_CREATED;
  const onClick = {
    redirectGalleryCreation: (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const notSyncYet = !essenceId || Number(essenceId) < 1;
      if (notSyncYet) {
        alert('The on-chain data is yet to sync! It may take 10-30 minute.');
        return;
      }
      const essenceUrl = PAGE_URL.creator_essence(essenceId, essenceName);
      openNewWindow(essenceUrl);
    },
  };

  const OptionControl = (
    <S.OptionContainer onClick={onClickOption}>
      <OptionsSvg />
    </S.OptionContainer>
  );

  const GalleryLink = (
    <S.SVG onClick={onClick.redirectGalleryCreation}>
      <WebLinkSvg />
    </S.SVG>
  );

  switch (tableEnum) {
    case TableEnum.HOME_EPISODE: {
      if (isEssenceCreated) return null;
      return OptionControl;
    }
    case TableEnum.ESSENCE_DETAIL: {
      if (isEssenceCreated) {
        return GalleryLink;
      } else {
        return OptionControl;
      }
    }
    default: {
      return null;
    }
  }
};
