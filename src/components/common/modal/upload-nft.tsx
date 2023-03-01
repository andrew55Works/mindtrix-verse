import React, { CSSProperties, useEffect, useState } from 'react';
import { useCreatorCreateI18n } from '../../../hooks/i18n/i18n.hooks';
import { Button } from '../../../styles/styled-system/button.theme';
import { AudioPlayer } from '../audio-player/audio-player.component';
import {
  addOrUpdateAudioSegmentDraftToListAction,
  clearEditingAudioSegmentAction,
  updateEditingAudioSegmentDescriptionAction,
  updateEditingAudioSegmentListPriceAction,
  updateEditingAudioSegmentNameAction,
  updateEditingAudioSegmentQuantityAction,
} from '../../../redux/essence/essence.slice';
import { useDispatch, useSelector } from 'react-redux';
import { NFTPodcastAudioEssenceVo } from '../../../redux/essence/essence.interface';
import { selectAudioEssenceCurrentInputs } from '../../../redux/essence/essence.selector';
import { selectCreatorProfile } from '../../../redux/creator/creator.selector';
import { TIME_FORMAT } from '../../../utils/datetime.utils';
import { Episode } from '../../../api/types/episode.types';
import CommonInputWithWarning from '../input/common-input';
import {
  nameValidation,
  numberValidation,
} from '../../../utils/form-validation.utils';
import CommonInputTextAreaWithWarning from '../input/common-input-text-area';
import FramerModal, { FramerModalProps } from './framer-modal';
import { Text } from '../../../styles/styled-system/text.theme';
import { InputLabelModal180 } from '../text/text';
import { validateText } from '../../../hooks/common/text/text.hooks';

interface ModalProps {
  episode_guid: string;
  isDisableEdit: boolean;
  largestTableOrder: number;
  selectedEpisode: Episode | null;
  setVisible: React.Dispatch<boolean>;
  visible: boolean;
}
export const UploadNFT = ({
  episode_guid,
  isDisableEdit,
  largestTableOrder,
  selectedEpisode,
  setVisible,
  visible,
}: ModalProps) => {
  const { text } = useCreatorCreateI18n();
  const dispatch = useDispatch();
  const editingAudioSegment = useSelector(selectAudioEssenceCurrentInputs);
  const creator = useSelector(selectCreatorProfile);
  const [isFormValid, setIsFormValid] = useState(false);
  const audioSrc =
    selectedEpisode?.firebase_file_url ?? selectedEpisode?.file_url ?? '';
  const audioStartTimeNum = editingAudioSegment?.audio_start_time_num ?? 0;

  const audioEndTimeNum = editingAudioSegment?.audio_end_time_num ?? 0;
  const editingTableIdNum = editingAudioSegment?.table_order ?? 0;
  const isInEditModel =
    !!editingTableIdNum &&
    !isNaN(editingTableIdNum) &&
    Number(editingTableIdNum) > 0;
  const table_order = isInEditModel
    ? editingTableIdNum // 正在編輯的，不用+1，因為直接 replace
    : largestTableOrder + 1;
  const nft_edition_id = table_order.toString();
  const audio_start_time = TIME_FORMAT.secToHHMMSS(audioStartTimeNum);
  const audio_end_time = TIME_FORMAT.secToHHMMSS(audioEndTimeNum);
  const audio_duration = Math.abs(audioEndTimeNum - audioStartTimeNum);
  const name = editingAudioSegment?.nft_name ?? '';
  const description = editingAudioSegment?.nft_description ?? '';
  const listPrice = editingAudioSegment?.nft_list_price?.toString() ?? '0';
  const editionQuantity =
    editingAudioSegment?.nft_edition_quantity?.toString() ?? '0';

  useEffect(() => {
    const isNameValid = validateText({
      customValidation: nameValidation,
      pattern: undefined,
      value: name,
    });

    const isDescriptionValid = validateText({
      customValidation: nameValidation,
      pattern: undefined,
      value: description,
    });

    const isListPriceValid = validateText({
      customValidation: numberValidation,
      pattern: undefined,
      value: listPrice,
    });

    const isEditionQuantityValid = validateText({
      customValidation: numberValidation,
      pattern: undefined,
      value: editionQuantity,
    });
    const isFormValidTmp =
      isNameValid &&
      isDescriptionValid &&
      // isListPriceValid &&
      isEditionQuantityValid;
    setIsFormValid(isFormValidTmp);
  }, [name, description, listPrice, editionQuantity]);
  const onClick = {
    dismissFn: () => {
      dispatch(clearEditingAudioSegmentAction());
      setVisible(false);
    },
    addAudioEssenceDraft: () => {
      const audioSegment: NFTPodcastAudioEssenceVo = {
        ...editingAudioSegment,
        audio_start_time,
        audio_end_time,
        audio_duration,
        creator_id: creator?._id ?? '',
        show_guid: creator?.show_guid ?? '',
        nft_author_name: creator?.name ?? '',
        nft_edition_id,
        table_id: nft_edition_id,
        episode_guid,
        table_order,
        // list_status, nft_list_type, start_date, end_date 統一在create-audio 頁產品上架時設定
      };
      dispatch(
        addOrUpdateAudioSegmentDraftToListAction({
          audioEssences: [audioSegment],
          episode_guid,
        }),
      );
      onClick.dismissFn();
    },
  };

  const onInputChange = {
    essenceName: (value: string, isValid: boolean) => {
      dispatch(updateEditingAudioSegmentNameAction(value));
    },
    essenceDescription: (value: string, isValid: boolean) => {
      dispatch(updateEditingAudioSegmentDescriptionAction(value));
    },
    listPrice: (value: string, isValid: boolean) => {
      const num = isNaN(Number(value)) ? 0 : Number(value);
      dispatch(updateEditingAudioSegmentListPriceAction(num));
    },
    editionQuantity: (value: string, isValid: boolean) => {
      const num = isNaN(Number(value)) ? 0 : Number(value);
      dispatch(updateEditingAudioSegmentQuantityAction(num));
    },
  };

  const framerModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: true,
    isShowModal: visible,
    onClick: {
      dismissModalFn: onClick.dismissFn,
      leftButton: undefined,
      rightButton: undefined,
    },
    style: {
      maxHeight: '80%',
      padding: '30px 40px 30px 40px',
      transitionY: '20%',
    },
    text: {
      description: undefined,
      leftButton: undefined,
      rightButton: undefined,
      title: undefined,
    },
  };

  return (
    <div style={{ minHeight: '192px' }}>
      {/*<UIKitten.Button onPress={() => setVisible(true)}>*/}
      {/*  TOGGLE MODAL*/}
      {/*</UIKitten.Button>*/}
      <FramerModal {...framerModalProps}>
        <div style={styles.cardContainer}>
          <Text.h1 status={'primary'} children={text.button_add_essence} />
          <div style={styles.formContainer}>
            <div style={styles.formRowContainer}>
              <InputLabelModal180 text={text.h4_modal_essence_name} />
              <CommonInputWithWarning
                autocomplete={'on'}
                disabled={isDisableEdit}
                customValidation={nameValidation}
                errorMessage={text.input_essence_name_assistant_text}
                maxLength={30}
                name={'cover-name-input'}
                onChange={onInputChange.essenceName}
                value={name}
              />
            </div>
            <div style={styles.formRowContainer}>
              <InputLabelModal180 text={text.h4_modal_select_audio_essence} />
              {/*<AudioPlayerContainer audio={null}>*/}
              {/*  <AudioPlayer style={styles.inputFull} />*/}
              {/*</AudioPlayerContainer>*/}
              <AudioPlayer
                audio_default_start_time_num={audioStartTimeNum}
                audio_default_end_time_num={audioEndTimeNum}
                audioUrl={audioSrc}
                dispatch={dispatch}
                isDisableEdit={isDisableEdit}
              />
            </div>
            <div style={styles.formRowContainer}>
              <InputLabelModal180 text={text.h4_modal_description} />
              <CommonInputTextAreaWithWarning
                autocomplete={'on'}
                disabled={isDisableEdit}
                customValidation={nameValidation}
                errorMessage={text.input_essence_description_assistant_text}
                maxLength={300}
                name={'cover-description-input'}
                onChange={onInputChange.essenceDescription}
                value={description}
                height={'64px'}
              />
            </div>
            {/*<div style={styles.formRowContainer}>*/}
            {/*  <InputLabelModal180 text={text.h4_modal_list_type} />*/}
            {/*  <CommonInputWithWarning*/}
            {/*    autocomplete={'off'}*/}
            {/*    disabled={true}*/}
            {/*    width={'190px'}*/}
            {/*    maxLength={12}*/}
            {/*    name={'list-type-input'}*/}
            {/*    defaultValue={text.h4_limited_edition}*/}
            {/*  />*/}
            {/*</div>*/}
            <div style={styles.formRowContainer}>
              <InputLabelModal180 text={text.h4_modal_quantity_of_essence} />
              <CommonInputWithWarning
                autocomplete={'on'}
                disabled={isDisableEdit}
                customValidation={numberValidation}
                errorMessage={text.input_edition_number_assistive_text}
                width={'190px'}
                maxLength={12}
                name={'edition-quantity-input'}
                onChange={onInputChange.editionQuantity}
                value={editingAudioSegment.nft_edition_quantity.toString()}
              />
            </div>
            {/*<div style={styles.formRowContainer}>*/}
            {/*  <InputLabelModal180 text={text.h4_modal_list_price} />*/}
            {/*  <CommonInputWithWarning*/}
            {/*    autocomplete={'on'}*/}
            {/*    customValidation={numberValidation}*/}
            {/*    errorMessage={text.input_list_price_assistive_text}*/}
            {/*    maxLength={12}*/}
            {/*    width={'190px'}*/}
            {/*    name={'list-price-input'}*/}
            {/*    onChange={onInputChange.listPrice}*/}
            {/*    value={editingAudioSegment.nft_list_price.toString()}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <div style={styles.footerButtonContainer}>
            <Button.Square
              appearance={isDisableEdit ? 'filled' : 'ghost'}
              status={isDisableEdit ? 'secondary' : 'basic'}
              size={'medium'}
              onClick={onClick.dismissFn}
              children={text.button_cancel}
            />
            {isDisableEdit ? null : (
              <Button.Square
                appearance={'filled'}
                disabled={!isFormValid}
                status={isFormValid ? 'secondary' : 'disabled'}
                size={'medium'}
                onClick={isFormValid ? onClick.addAudioEssenceDraft : () => ''}
                children={text.button_add}
              />
            )}
          </div>
        </div>
      </FramerModal>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: 192,
  },
  cardContainer: {
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  formTitle: {
    fontWeight: 'bold',
    paddingTop: '8px',
    paddingBottom: '8px',
    marginRight: 20,
    width: 180,
    flexShrink: 0,
  },
  formRowContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    marginTop: '12px',
    marginBottom: '12px',
  },
  footerButtonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  inputFull: {
    marginLeft: 16,
    flex: 1,
  },
  input: {
    marginLeft: 16,
  },
  subGroupTitle: {
    fontWeight: 600,
    marginBottom: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
