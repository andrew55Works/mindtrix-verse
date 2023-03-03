import { GetServerSideProps, NextPage } from 'next';
import { PageLayout } from '../../types/interface';
import React, { ReactElement, useEffect, useState } from 'react';
import { ViennaWoodsPreScene } from '../../components/world/vienna-woods/vienna-woods-pre-scene/vienna-woods-pre-scene.component';
import { useInitSound } from '../../hooks/world/use-init-sound';
import {
  updateLandmarkModalInfoI18nText,
  useLandmarkModalInfo,
} from '../../hooks/world/use-landmark';
import { useInitViennaScene } from '../../hooks/world/use-init-scene';
import { ViennaWoodsMainScene } from '../../components/world/vienna-woods/vienna-woods-main-scene/vienna-woods-main-scene.component';
import { ViennaWoodsLoadingScene } from '../../components/world/vienna-woods/vienna-woods-loading-scene/vienna-woods-loading-scene.component';
import { FirebaseAuth } from '../../services/firebase/auth';
import { signMessage } from '../../api/fcl/signatures.fcl';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../hooks/wallet/wallet.hooks';
import Layout from '../../components/layout';
import { I18N_NS_ENUM } from '../../utils/i18n-utils';
import { ProductTypeEnum } from '../../components/navigation';
import { getEssencePageSEO } from '../../utils/seo.utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  getViennaWoodsI18ns,
  IViennaWoodsContext,
} from '../../hooks/i18n/i18n-vienna-woods.hooks';
import { useTranslation } from 'next-i18next';
import { IPack } from '../../types/vienna-world.types';
import { useTxStatus } from '../../hooks/common/loading/tx-status.hooks';
import { ModalLoading } from '../../components/common/loading/modal-loading/modal-loading.component';
import { ChildAccountInfo } from '../../types/creator.type';

export const ViennaWoodsContext =
  React.createContext<IViennaWoodsContext | null>(null);

const ViennaWoodsPage: NextPage<GetServerSideProps> & PageLayout = () => {
  const { t } = useTranslation();
  const { texts } = getViennaWoodsI18ns(t);
  const [isPreSceneAnimating, setIsPreSceneAnimating] = useState(false);
  const [isEnterWorld, setIsEnterWorld] = useState(false);
  const [childAccountInfo, setChildAccountInfo] = useState(
    new ChildAccountInfo(),
  );
  const [purchasedPack, setPurchasedPack] = useState<IPack | null>(null);
  const [isShowLoadingLogo, setIsShowLoadingLogo] = useState(false);
  const SoundUtils = useInitSound();
  const SceneUtils = useInitViennaScene();
  const { onClick: connectWallet } = useSignInOutBlocto(
    MindtrixUserEnum.Collector,
  );
  const isSceneLoading = SceneUtils?.isSceneLoading ?? true;
  const sceneLoadingProgress = SceneUtils?.sceneLoadingProgress ?? 0;
  const landmarkModalInfoOrg = useLandmarkModalInfo(
    SceneUtils?.onClickLocationName ?? '',
  );
  const landmarkModalInfo = updateLandmarkModalInfoI18nText(
    texts.viennaWoodsLandmarkI18nText,
    landmarkModalInfoOrg,
  );

  const onChainTxStatusObj = useTxStatus();
  const { TxStatusEle } = onChainTxStatusObj;

  const context: IViennaWoodsContext = {
    texts,
    landmarkModalInfo,
    setPurchasedPack,
    purchasedPack,
    isShowLoadingLogo,
    childAccountInfo,
    setIsShowLoadingLogo,
    setChildAccountInfo,
    onChainTxStatusObj,
  };
  const onClick = {
    enterWorld: () => {
      setIsEnterWorld(true);
      SoundUtils.playBGM();
    },
    signInWithGooglePopup: async () => {
      const { googleUser, googleAccessToken } =
        await FirebaseAuth.signInWithPopup();
      console.info('googleUser:', googleUser);
    },
    signMessage: async () => {
      const address = await connectWallet().signInOrOutAndGetAddress();
      console.info('signer address:', address);
      const signResult = await signMessage('You are using Mindtrix Service');
      console.info('signResult:', signResult);
    },
  };

  return (
    <ViennaWoodsContext.Provider value={context}>
      <ViennaWoodsMainScene
        isShow={!isSceneLoading && isPreSceneAnimating}
        SceneUtils={SceneUtils}
        SoundUtils={SoundUtils}
        landmarkModalInfo={landmarkModalInfo}
      />
      <ViennaWoodsPreScene
        isShow={!isEnterWorld && !isSceneLoading}
        enterWorld={onClick.enterWorld}
        isPreSceneAnimating={isPreSceneAnimating}
        setIsPreSceneAnimating={setIsPreSceneAnimating}
      />
      <ViennaWoodsLoadingScene
        isSceneLoading={isSceneLoading}
        sceneLoadingProgress={sceneLoadingProgress}
      />
      {TxStatusEle}
      <ModalLoading isShow={isShowLoadingLogo} />
    </ViennaWoodsContext.Provider>
  );
};

ViennaWoodsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout.TopNavigation
      productType={ProductTypeEnum.Village}
      isAbsolutePosition={true}
      isShowPadding={false}
      isShowSearchBar={false}
      isShowNav={false}
      pageBackground={'rgba(255, 255, 255, 1)'}
    >
      {page}
    </Layout.TopNavigation>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
  resolvedUrl,
}) => {
  const localeStr = locale ? locale : 'en';
  const i18nNameSpace = [
    I18N_NS_ENUM.menu_account,
    I18N_NS_ENUM.landmark_bush_village,
    I18N_NS_ENUM.landmark_common,
    I18N_NS_ENUM.landmark_echo_cliff,
    I18N_NS_ENUM.landmark_green_bazaar,
    I18N_NS_ENUM.landmark_kabbalah_sacred_trees,
    I18N_NS_ENUM.landmark_mimir_swamp,
    I18N_NS_ENUM.landmark_podment_temple,
    I18N_NS_ENUM.vienna_woods_buy_method,
    I18N_NS_ENUM.vienna_woods_common,
    I18N_NS_ENUM.marketplace_buying,
  ];

  // const domain = getFrontendMindtrixWebDomain();
  // const i18nRes = await fetch(
  //   `${domain}/locales/${localeStr}/campaign_record_answers.json`,
  // );
  // const previewText = await i18nRes.json();
  const text: { [key: string]: string } = {
    // seo_title: _get(previewText, ['seo_title'], ''),
    // seo_description: _get(previewText, ['seo_description'], ''),
    seo_title: 'Mindtrix Verse | World',
    seo_description: 'Pick your packs to land Now!',
  };
  const previewImage =
    'https://firebasestorage.googleapis.com/v0/b/mindtrix-dev.appspot.com/o/public%2F2023-0228-vienna-woods%2Fmindtrix_verse_cover_1200_630.png?alt=media&token=e997e0f5-663d-49c6-b6e9-2e5fab57cfe6';
  const images = [
    {
      alt: 'Mindtrix Verse',
      // 建議大小 1200 x 630
      height: 630,
      width: 1200,
      url: previewImage,
    },
  ];
  const metadata = getEssencePageSEO(
    text.seo_title,
    text.seo_description,
    images,
    resolvedUrl,
    localeStr,
  );

  return {
    props: {
      ...(await serverSideTranslations(localeStr, i18nNameSpace)),
      metadata,
    },
  };
};

export default ViennaWoodsPage;
