import React, { FC } from 'react';
import { Cell, Row } from 'react-table';
import { StyleSheet } from 'react-native';
import { Option } from '../option/option';
import { PopoverContainer } from '../popover/popover.styles';
import theme from '../../../../styles/eva-styled-system.json';
import { PopoverItem } from '../popover/item-popover';
import { useCreatorTableI18n } from '../../../../hooks/i18n/i18n.hooks';
import EditSvg from '../../../../assets/icons/icon_edit.svg';
import DeleteSvg from '../../../../assets/icons/icon_delete_active.svg';
import { colors } from '../../../../styles/styled-system/color.theme';
import { NFTPodcastAudioEssenceDto } from '../../../../api/types/nft.types';
import { NFTPodcastAudioEssenceVo } from '../../../../redux/essence/essence.interface';
import { NFT_ENUM, NFT_ENUM_TYPE } from '../../../../api/types/nft-enum.types';
import * as S from './row-table.styles';
import { TableEnum } from '../table';
import { TableLink } from '../link/link.component';
import { openNewWindow } from '../../../../utils/window.utils';
import { Text } from '../../../../styles/styled-system/text.theme';

export interface RowTableProps {
  index: number;
  onClickProps: {
    dismissDeleteConfirmModal?: () => void;
    itemDelete: () => void;
    itemEdit: (id: string, index: number, essenceType: NFT_ENUM_TYPE) => void;
    showDeleteConfirmModal?: (
      episodeGuidTmp: string,
      id: string,
      tableOrderIdStr: string,
    ) => void;
  };
  row: Row;
  selectedOptionIndex: number;
  setSelectedOptionIndex: React.Dispatch<number>;
  tableEnum: TableEnum;
}
export const TableRow: FC<RowTableProps> = ({
  row,
  onClickProps: { itemEdit, showDeleteConfirmModal },
  index,
  selectedOptionIndex,
  setSelectedOptionIndex,
  tableEnum,
}) => {
  const { text } = useCreatorTableI18n();

  const onClick = {
    option: (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      selectedIndex: number,
    ) => {
      e.preventDefault();
      e.stopPropagation();
      const isSelected = selectedOptionIndex === selectedIndex;
      setSelectedOptionIndex(isSelected ? -1 : selectedIndex);
    },
    itemEdit: (_id: string, rowIndex: number, essenceType: NFT_ENUM_TYPE) => {
      setSelectedOptionIndex(-1);
      itemEdit(_id, rowIndex, essenceType);
    },
    showDeleteConfirmModal: (
      episodeGuidTmp: string,
      _id: string,
      tableOrderIdStr: string,
    ) => {
      setSelectedOptionIndex(-1);
      if (showDeleteConfirmModal) {
        showDeleteConfirmModal(episodeGuidTmp, _id, tableOrderIdStr);
      }
    },
    openTransactionLink: (transaction_link: string) => {
      if (!transaction_link) return;
      openNewWindow(transaction_link);
    },
  };
  const optionData = row.cells[row.cells.length - 1]?.value ?? null;
  const audioEssence = (optionData?.data ?? null) as NFTPodcastAudioEssenceDto &
    NFTPodcastAudioEssenceVo;
  const nftId = audioEssence?._id ?? '';
  const episode_guid = audioEssence?.episode_guid ?? '';
  const table_order_id_str = audioEssence?.table_id ?? '0';
  const episodeGuid = audioEssence?.episode_guid ?? '';
  const essenceType =
    audioEssence?.nft_type ?? NFT_ENUM.TYPE.PODCAST_IMAGE_COVER;
  const isShowOption = selectedOptionIndex === index;
  return (
    <>
      <S.RowTableStyle
        key={index}
        onClick={() => onClick.itemEdit(episodeGuid, index, essenceType)}
      >
        {row.cells.map((cell: Cell, rowIndex: number) => {
          const isOptions =
            row.cells.length === rowIndex + 1 && (optionData?.isShow ?? false);
          const cellId = cell?.column?.id ?? '';
          const isOrder = rowIndex === 0 && cellId === 'col1_order';
          const cellValue = cell?.value ?? '';
          const isCreationName = cellId === 'creation_name';
          const isDonorName = cellId === 'col3_donor_name';
          const isDonationMessage = cellId === 'col5_donation_message';
          const isEpisodeName = cellId === 'col4_episode_name';
          const isCreatedDate = cellId === 'col1_created_date';
          const isTransactionLink = cellId === 'col6_transaction_link';
          const flex = isCreationName
            ? 4
            : isEpisodeName || isDonationMessage
            ? 3
            : isDonorName
            ? 1.5
            : isCreatedDate
            ? 1.2
            : 1;
          const maxWidth = isDonorName
            ? '120px'
            : isOptions
            ? '90px'
            : isOrder
            ? '80px'
            : 'inherit';

          return (
            <S.RowChildColumnStyle
              key={rowIndex}
              flex={flex}
              maxWidth={maxWidth}
            >
              {isOptions ? (
                <Option
                  audioEssence={audioEssence}
                  onClickOption={(e) => onClick.option(e, index)}
                  tableEnum={tableEnum}
                />
              ) : isTransactionLink ? (
                <TableLink
                  onClick={() => onClick.openTransactionLink(cellValue)}
                />
              ) : (
                <Text.h4
                  status={'basic'}
                  my={0}
                  mx={0}
                  maxTextLine={isDonorName ? 1 : 10}
                  children={cell.render('Cell')}
                />
              )}
            </S.RowChildColumnStyle>
          );
        })}
      </S.RowTableStyle>
      {isShowOption ? (
        <PopoverContainer index={index}>
          <PopoverItem
            text={text.table_operation_edit}
            leftIcon={<EditSvg />}
            onClick={() => onClick.itemEdit(episodeGuid, index, essenceType)}
          />
          <PopoverItem
            color={'red'}
            leftIcon={<DeleteSvg />}
            text={text.table_operation_delete}
            onClick={() =>
              onClick.showDeleteConfirmModal(
                episode_guid,
                nftId,
                table_order_id_str,
              )
            }
          />
        </PopoverContainer>
      ) : null}
    </>
  );
};
