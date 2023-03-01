import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Trans } from 'next-i18next';
import { Text } from '../../../styles/styled-system/text.theme';
import { useSelector } from 'react-redux';
import { selectIsCreatorSignIn } from '../../../redux/creator/creator.selector';
import { selectIsCollectorSignIn } from '../../../redux/collector/collector.selector';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../../hooks/wallet/wallet.hooks';
import { useRouter } from 'next/router';
import { useWASMRecorder } from '../../../hooks/record/use-recorder';
import {
  RecordAudioButton,
  RecordAudioEnum,
} from '../record/record-audio.button.component';
import { RecorderState } from '../../../types/recorder';
import RecorderTimer from '../../record/recorder-timer';
import { FirebaseStorage } from '../../../services/firebase/storage';
import { CommonFlexContainer } from '../flexbox/common-flex.styles';
import { BlockContainer, RecordPagerContainer } from './pager.styles';
import { ModalLoading } from '../loading/modal-loading/modal-loading.component';
import { copyContent } from '../../../utils/copy.utils';
import FramerModal, { FramerModalProps } from '../modal/framer-modal';
import { getShortLink } from '../../../services/firebase/firebase-links';
import { openNewWindow } from '../../../utils/window.utils';
import { useCampaignRecordAnswersI18n } from '../../../hooks/i18n/i18n.hooks';
import { useMutation } from '@apollo/client';
import { GQL_CREATE_OR_UPDATE_CAMPAIGN_PARTICIPANT } from '../../../api/graphql/campaign-participant';
import {
  CampaignParticipant,
  CampaignParticipantRes,
} from '../../../api/types/campaign-participant.types';
import { CountdownModal } from '../modal/countdown.modal';
import {
  getAudioRandomVoiceTraits,
  VoiceTrait,
  voiceTraitTemplate,
} from '../../../utils/audio-random-analysis';
import { RecordingStaging } from '../../record/recording-staging/recording-staging.component';
import { RecordsUploaded } from '../../record/records-uploaded';
import { RecorderFirstTitle } from '../../record/recorder-first-title/recorder-first-title.component';
import { RecordedShare } from '../../record/recorded-share/recorded-share.component';
import { useFetchRecordByCampaignCodeAndWalletAddress } from '../../../hooks/record/fetch-record';
import { PAGE_URL } from '../../../utils/page-router.utils';
import {
  MintSingleNFTFromPOAPEssence,
  TxRes,
} from '../../../api/types/nft.types';
import { GQL_MINT_SINGLE_NFT_FROM_POAP_ESSENCE } from '../../../api/graphql/nft.graphql';
import { useTxStatus } from '../../../hooks/common/loading/tx-status.hooks';
import {
  SafeFclResponse,
  setupNFTCollection,
} from '../../../api/fcl/transactions.fcl';
import { getIsMindtrixInitFcl } from '../../../api/fcl/scripts.fcl';
import { useFirebaseStorageList } from '../../../hooks/record/use-recordings-list';
import { CampaignContext } from '../../../pages/voice-to-run/[campaign_sub_page]';
import { _get } from '../../../utils/lodash.utils';
import { I18N_NS_ENUM } from '../../../utils/i18n-utils';
import { getV2RPoapEssenceId } from '../../../utils/config.web.utils';

interface ContextProps {
  onClick: {
    checkIsInitContract: (address: string) => Promise<void>;
    connectWallet: () => Promise<void>;
    intentToGuidelinePage: () => void;
    recordOrStop: (e: React.MouseEvent<HTMLButtonElement>) => void;
    removeAllRecords: () => void;
    share: () => Promise<void>;
    upload: (address: string) => Promise<void>;
  };
  recordAudioEnum: RecordAudioEnum;
  recorderState: RecorderState;
  setRecordAudioEnum: Dispatch<RecordAudioEnum> | null;
}

export const PageRecordContext = createContext<ContextProps>({
  onClick: {
    checkIsInitContract: async (address: string) => {},
    connectWallet: async () => {},
    intentToGuidelinePage: () => {},
    recordOrStop: (e: React.MouseEvent<HTMLButtonElement>) => '',
    removeAllRecords: () => {},
    upload: async () => {},
    share: async () => {},
  },
  setRecordAudioEnum: null,
  recordAudioEnum: RecordAudioEnum.RECORD,
  recorderState: {
    audioFiles: [],
    audioURLs: [],
    isLoading: false,
    isRecording: false,
    isUploadSuccess: false,
    recordingMinutes: 0,
    recordingSeconds: 0,
  },
});
export const PageRecord = () => {
  const isCreatorSignedIn = useSelector(selectIsCreatorSignIn);
  const isCollectorSignedIn = useSelector(selectIsCollectorSignIn);
  const isSignedIn = isCollectorSignedIn || isCreatorSignedIn;
  const [recordAudioEnum, setRecordAudioEnum] = useState(
    RecordAudioEnum.RECORD,
  );
  const {
    loggedIn,
    onClick: walletFn,
    creatorProfile,
  } = useSignInOutBlocto(MindtrixUserEnum.Collector);
  const signedInWalletAddress = creatorProfile?.wallet?.blocto?.address ?? '';
  const router = useRouter();
  const { locale: nextLang } = router;
  const walletAddressFromQuery = (router.query?.w ?? '') as string;

  const walletAddress = walletAddressFromQuery
    ? walletAddressFromQuery
    : signedInWalletAddress;
  const isOwner = walletAddress === signedInWalletAddress;
  const campaign_code = 'c2_provoice_audio_qa_marathonstorytellerpodcast';
  const { tx, TxStatusEle, showTxStatusModal, setSealedRes } = useTxStatus();
  const { record, setRecord } = useFetchRecordByCampaignCodeAndWalletAddress(
    campaign_code,
    walletAddress,
  );

  const voiceTraitsFromDB =
    record?.participant_voice_traits.map((trait) => ({
      ...(_get(voiceTraitTemplate, [trait?.key ?? ''], {}) as VoiceTrait),
      percentage: trait?.percentage ?? '',
    })) ?? [];

  const [mintSingleNFTFromPOAPEssence] =
    useMutation<MintSingleNFTFromPOAPEssence>(
      GQL_MINT_SINGLE_NFT_FROM_POAP_ESSENCE,
    );

  const isFetchRecordFromDBSucceed = !!(!!(record?._id ?? '') && walletAddress);

  // @ts-ignore
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const [isLoading, setIsLoading] = useState(true);
  const [transactionStep, setTransactionStep] = useState(0);
  const [isShowCopyLinkResultModal, setIsShowCopyLinkResultModal] =
    useState(false);
  const [isShowUploadResultModal, setIsShowUploadResultModal] = useState(false);
  const [isShowDuplicateMintingModal, setIsShowDuplicateMintingModal] =
    useState(false);
  const [audioFileShortLink, setAudioFileShortLink] = useState('');
  const [voiceTraits, setVoiceTraits] = useState<Array<VoiceTrait>>([]);
  const { text } = useCampaignRecordAnswersI18n();
  const shareMessage =
    text.recording_input_sharing_message + audioFileShortLink;
  const [createOrUpdateCampaignParticipant] =
    useMutation<CampaignParticipantRes>(
      GQL_CREATE_OR_UPDATE_CAMPAIGN_PARTICIPANT,
    );
  const maxRecordSecond = 60;

  const {
    recorderState,
    onClickRecord: recordOrStop,
    removeAllRecords,
    setIsUploadSuccess,
    prepareCountdownSec,
    prepareCountdownEnded,
    isPrepareCountActivated,
  } = useWASMRecorder({ maxRecordSecond });
  const { questionAudioURL } = useFirebaseStorageList(setIsLoading);
  const { campaign } = useContext(CampaignContext);

  // const { audio, file } = recorderState;
  const { audioURLs, audioFiles, isUploadSuccess } = recorderState;
  const [cid, setCid] = useState('');
  // const [files, setFiles] = useState<Array<File>>([]);
  const isAudioExist = (audioURLs?.length ?? 0) > 0;
  const dismissCopyLinkResultModal = () => setIsShowCopyLinkResultModal(false);
  const showCopyLinkResultModal = () => setIsShowCopyLinkResultModal(true);
  const dismissUploadResultModal = () => setIsShowUploadResultModal(false);
  const showDuplicateMintingModal = () => setIsShowDuplicateMintingModal(true);
  const dismissDuplicateMintingModal = () =>
    setIsShowDuplicateMintingModal(false);
  const showUploadResultModal = () => setIsShowUploadResultModal(true);
  const pushToClaimResultPage = () => {
    const urlWithWalletAddress = `${PAGE_URL.collectors_campaign_voice_to_run_record.path}?w=${signedInWalletAddress}`;
    setIsUploadSuccess(true);
    router.push(urlWithWalletAddress, undefined, {
      shallow: true,
    });
  };
  const loadingMessage =
    transactionStep > 0
      ? transactionStep === 1
        ? text.recording_uploading_transaction_step_1
        : transactionStep === 2
        ? text.recording_uploading_transaction_step_2
        : null
      : null;
  const generateShareLink = async (longLink: string) => {
    // const allQueriesObj = getAllQueriesAsObj(longLink);
    const shortLinkRes = await getShortLink(longLink, {});
    const shortLink = shortLinkRes.data?.shortLink ?? '';
    setAudioFileShortLink(shortLink);
  };

  const recordedURL = isAudioExist ? audioURLs[0] : null;

  const audioURL = isFetchRecordFromDBSucceed
    ? record?.participant_audio_firebase_url ?? ''
    : isUploadSuccess
    ? cid
    : recordedURL
    ? recordedURL
    : '';

  const isShowTimer =
    !(isUploadSuccess || recordedURL) && !isFetchRecordFromDBSucceed;

  const isFileStaging = !!recordedURL && !isUploadSuccess;
  const isFileUploaded = isUploadSuccess || isFetchRecordFromDBSucceed;

  useEffect(() => {
    if (!audioURL || !isFileUploaded) return;
    const pageURL = PAGE_URL.collectors_campaign_voice_to_run_record.fullPath;
    const fullPath = `${pageURL}?openExternalBrowser=1&w=${walletAddress}`;
    generateShareLink(fullPath);
  }, [audioURL, isFileUploaded]);

  useEffect(() => {
    const createRecord = async () => {
      const dto: CampaignParticipant = {
        campaign_code: 'c2_provoice_audio_qa_marathonstorytellerpodcast',
        participant_wallet_address: walletAddress,
        participant_name: '',
        participant_message: '',
        participant_audio_firebase_url: cid,
        participant_audio_cid: '',
        participant_nft_uuid: 0,
        participant_voice_traits: voiceTraits.map((trait) => ({
          percentage: trait?.percentage ?? '',
          key: trait?.key ?? '',
        })),
        is_claimed_nft: false,
      };
      const createRes = await createOrUpdateCampaignParticipant({
        variables: { dto },
      });
      const data = createRes?.data?.createOrUpdateCampaignParticipant ?? null;
      setRecord(data);

      const isSuccess = !!(data?._id ?? null);
      setIsUploadSuccess(isSuccess);
      setTransactionStep(0);
      if (isSuccess) {
        pushToClaimResultPage();
      } else {
        // 顯示錯誤訊息
      }

      showUploadResultModal();
      setIsLoading(false);
    };

    const isSealed = tx?.isSealed ?? false;
    const isError = tx?.errorMessage ?? null;
    const isModalDismissed = !(tx?.isShow ?? false);
    // if (isError) {
    //   setIsUploadSuccess(false);
    //   setIsLoading(false);
    //   alert('Upload error! Please refresh the page to retry.');
    // }
    if (isSealed && isModalDismissed) {
      createRecord();
    }
  }, [tx]);

  const contextValue: ContextProps = {
    recordAudioEnum,
    setRecordAudioEnum,
    recorderState,
    onClick: {
      connectWallet: async () => {
        const walletAddressTmp = await walletFn().signInOrOutAndGetAddress();
        if (walletAddressTmp) {
          await contextValue.onClick.checkIsInitContract(walletAddressTmp);
        }
      },
      recordOrStop,
      removeAllRecords,
      intentToGuidelinePage: () => {
        router.push(PAGE_URL.collectors_campaign_voice_to_run_guideline.path);
      },
      share: async () => {
        await copyContent(shareMessage);
        showCopyLinkResultModal();
      },
      checkIsInitContract: async (address: string) => {
        setIsLoading(true);
        setTransactionStep(1);
        const [isInitRes, isInitError] = await getIsMindtrixInitFcl(address);
        const isInit = isInitRes?.data ?? false;
        if (!isInit) {
          const setupRes = await setupNFTCollection();
        }

        await contextValue.onClick.upload(address);
      },
      upload: async (address: string) => {
        const isFileExist =
          !cid && !!audioFiles && (audioFiles?.length ?? 0) > 0;
        if (!isFileExist) return;
        const file = audioFiles[0];
        const fileNameWithExtension = file?.name ?? '';
        setIsLoading(true);
        const voiceTraitsTmp = getAudioRandomVoiceTraits(file);
        setVoiceTraits(voiceTraitsTmp);
        // const cidTmp = await storeFilesToWeb3Storage(files);
        const firebaseURLTmp = await FirebaseStorage.uploadAudio(
          AudioContext,
          fileNameWithExtension,
          file,
        );
        setCid(firebaseURLTmp);
        if (!address) {
          alert('Please connect your wallet and try again!');
          return;
        }
        const variables = {
          recipient: address,
          essenceId: getV2RPoapEssenceId(),
          nftAudioPreviewUrl: firebaseURLTmp,
        };

        try {
          showTxStatusModal();
          setTransactionStep(2);
          const txTmp = await mintSingleNFTFromPOAPEssence({
            variables,
          });
          const txResTmp: TxRes | null =
            txTmp?.data?.mintSingleNFTFromPOAPEssence ?? null;
          const txErrorMessage = txResTmp?.errorMessage ?? null;
          const txResPayload: SafeFclResponse = [
            txResTmp?.transactionId ?? '',
            txErrorMessage ? new Error(txErrorMessage) : undefined,
          ];
          setSealedRes(txResPayload);
        } catch (e) {
          const error = e as Error;
          console.error('mintSingleNFTFromPOAPEssence error:', e);
          showDuplicateMintingModal();
          setSealedRes(['', error]);
          setIsLoading(false);
        }
      },
    },
  };
  const fbURL = campaign?.media_post_url ?? '';
  const copyLinkResultModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal: isShowCopyLinkResultModal,
    onClick: {
      dismissModalFn: dismissCopyLinkResultModal,
      leftButton: undefined,
      rightButton: () => {
        openNewWindow(fbURL);
        copyLinkResultModalProps.onClick.dismissModalFn();
      },
    },
    text: {
      description: audioFileShortLink
        ? text.recording_modal_h3_copy_link_succeed
        : 'The on-chain data is yet to sync. Please retry after 10 sec. ',
      leftButton: undefined,
      rightButton: 'OK',
      title: undefined,
    },
    width: '80vw',
  };
  const uploadResultModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal: isShowUploadResultModal,
    onClick: {
      dismissModalFn: dismissUploadResultModal,
      leftButton: undefined,
      rightButton: () => {
        uploadResultModalProps.onClick.dismissModalFn();
      },
    },
    text: {
      description: isUploadSuccess
        ? text.recording_modal_h3_upload_audio_succeed
        : text.recording_modal_h3_upload_audio_failed,
      leftButton: undefined,
      rightButton: 'OK',
      title: undefined,
    },
    width: '80vw',
  };

  const duplicateMintingModalProps: FramerModalProps = {
    isEnableDismissModalFromClickingBackground: false,
    isShowModal: isShowDuplicateMintingModal,
    onClick: {
      dismissModalFn: () => {
        dismissDuplicateMintingModal();
        pushToClaimResultPage();
      },
      leftButton: undefined,
      rightButton: () => {
        duplicateMintingModalProps.onClick.dismissModalFn();
      },
    },
    text: {
      description: text.recording_modal_h3_duplicate_minting,
      leftButton: undefined,
      rightButton: 'OK',
      title: undefined,
    },
    width: '80vw',
  };

  const firstBlockTitle = isFileUploaded
    ? text.recording_h2_event_reward
    : text.recording_h2_question;

  const shareBlockTitle =
    isFetchRecordFromDBSucceed && !isOwner
      ? text.recorded_h2_your_turn
      : isFileUploaded
      ? text.recording_h2_share_your_answer
      : '';
  const recordingBlockTitle = text.recording_h2_your_answer;
  const nftImageURL =
    campaign?.nft_image_preview_url ??
    '/img/previews/previews_image_running_shoes_poap.gif';
  const questionText = campaign?.question ?? '許一個2023年跑步心願';

  const VideoTutorial = () => (
    <Text.h5
      status={'basic'}
      color={'#ffffff'}
      fontSize={'12px'}
      marginBottom={'8px'}
      textAlign={'center'}
      isAutoWrap={true}
    >
      <Trans
        i18nKey={`${I18N_NS_ENUM.campaign_record_answers}:recording_h5_video_tutorial`}
        defaults={''}
        components={[
          <a
            key='0'
            style={{ marginLeft: '4px', color: '#ffffff' }}
            target={'_blank'}
            href={'https://youtu.be/HE7EDfSkf9s'}
          />,
        ]}
      />
    </Text.h5>
  );

  const Terms = () => (
    <Text.h5
      status={'basic'}
      color={'#ffffff'}
      fontSize={'12px'}
      marginBottom={'8px'}
      textAlign={'center'}
      isAutoWrap={true}
    >
      <Trans
        i18nKey={`${I18N_NS_ENUM.campaign_record_answers}:recording_h5_terms`}
        defaults={''}
        values={{
          terms: text.step1_h3_terms,
          privacyPolicy: text.step1_h3_privacy_policy,
        }}
        components={[
          <a
            key='0'
            style={{ marginLeft: '4px', color: '#ffffff' }}
            target={'_blank'}
            href={`https://www.mindtrix.xyz/${nextLang}/terms`}
          />,
          <a
            key='1'
            style={{ marginLeft: '4px', color: '#ffffff' }}
            target={'_blank'}
            href={`https://www.mindtrix.xyz/${nextLang}/privacy-policy`}
          />,
        ]}
      />
    </Text.h5>
  );

  return (
    <PageRecordContext.Provider value={contextValue}>
      <RecordPagerContainer>
        {/*the block of sharing or joining the event*/}
        {isFetchRecordFromDBSucceed ? (
          <BlockContainer>
            <Text.h2
              status={'primary'}
              fontSize={'40px'}
              width={'100%'}
              textAlign={'center'}
              marginTop={0}
              marginBottom={'8px'}
              lineHeight={'3rem'}
              isAutoWrap={true}
              background={
                '-webkit-linear-gradient(-45deg, #E6DA44 0%, #FEF392 50%, #E6DA44 100%);'
              }
              isGradient={true}
              children={shareBlockTitle}
            />
            <RecordedShare
              isFetchRecordFromDBSucceed={isFetchRecordFromDBSucceed}
              isOwner={isOwner}
              isShow={isFileUploaded || (isFetchRecordFromDBSucceed && isOwner)}
              shareMessage={shareMessage}
            />
          </BlockContainer>
        ) : null}

        <BlockContainer>
          <Text.h2
            status={'primary'}
            fontSize={'40px'}
            lineHeight={'3rem'}
            isAutoWrap={true}
            background={
              '-webkit-linear-gradient(-45deg, #E6DA44 0%, #FEF392 50%, #E6DA44 100%);'
            }
            isGradient={true}
            marginTop={0}
            marginBottom={'8px'}
            children={firstBlockTitle}
          />
          <RecordsUploaded
            audioURL={audioURL}
            nftImageURL={nftImageURL}
            isOwner={isOwner}
            isShow={isFileUploaded}
            serialNumber={record?._id ?? ''}
            questionText={questionText}
            walletAddress={walletAddress}
            voiceTraits={voiceTraitsFromDB ? voiceTraitsFromDB : voiceTraits}
          />
          <RecorderFirstTitle
            isShow={!isFileUploaded}
            questionText={questionText}
          />
        </BlockContainer>

        {/*the block of recording the audio*/}
        {isFetchRecordFromDBSucceed ? null : (
          <CommonFlexContainer flexDirection={'column'} width={'100%'}>
            <BlockContainer>
              <CommonFlexContainer
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                width={'100%'}
              >
                <Text.h2
                  status={'primary'}
                  fontSize={'40px'}
                  width={'100%'}
                  textAlign={'center'}
                  marginTop={0}
                  marginBottom={'8px'}
                  lineHeight={'3rem'}
                  isAutoWrap={true}
                  background={
                    '-webkit-linear-gradient(-45deg, #E6DA44 0%, #FEF392 50%, #E6DA44 100%);'
                  }
                  isGradient={true}
                  children={recordingBlockTitle}
                />
                <RecorderTimer
                  recorderState={recorderState}
                  isShow={isShowTimer}
                />

                <RecordingStaging
                  audioURL={audioURL}
                  isShow={isFileStaging}
                  isWalletConnected={isSignedIn}
                  walletAddress={walletAddress}
                />
              </CommonFlexContainer>
              <RecordAudioButton isShow={!recordedURL && !isFileUploaded} />
            </BlockContainer>
            <VideoTutorial />
            <Terms />
          </CommonFlexContainer>
        )}

        <FramerModal {...uploadResultModalProps} />
        <FramerModal {...copyLinkResultModalProps} />
        <FramerModal {...duplicateMintingModalProps} />
        <CountdownModal
          seconds={prepareCountdownSec}
          startText={text.recording_modal_description_countdown_start}
          isShow={isPrepareCountActivated}
          isTimesUp={prepareCountdownEnded}
        />
        <ModalLoading isShow={isLoading} message={loadingMessage} />
        {TxStatusEle}
      </RecordPagerContainer>
    </PageRecordContext.Provider>
  );
};
