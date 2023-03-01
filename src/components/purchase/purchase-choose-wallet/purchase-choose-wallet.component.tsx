import React, { FC, useContext, useEffect, useState } from 'react';
import { ViennaWoodsContext } from '../../../pages/world/vienna-woods';
import { PurchaseContext } from '../purchase-nft.container';
import { Text } from '../../../styles/styled-system/text.theme';
import { Button } from '../../../styles/styled-system/button.theme';
import * as NFTStyle from '../purchase-nft.styles';
import { useSelector } from 'react-redux';
import { selectCollectorAddress } from '../../../redux/collector/collector.selector';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../../hooks/wallet/wallet.hooks';
import { PaymentStageEnum } from '../../../hooks/payment/payment.hooks';
import { FirebaseAuth } from '../../../services/firebase/auth';
import { ProductTypeEnum } from '../../navigation';
import { useMutation } from '@apollo/client';
import { PostCreateSsoUserAndBindChildWalletAccountRes } from '../../../api/types/nft.types';
import { GQL_CREATE_SSO_USER_AND_BIND_CHILD_WALLET_ACCOUNT } from '../../../api/graphql/user.graphql';
import { ChildAccountInfo } from '../../../types/creator.type';

interface Props {}

export const PurchaseChooseWallet: FC<Props> = () => {
  const walletAddress = useSelector(selectCollectorAddress);
  const viennaWoodsContext = useContext(ViennaWoodsContext);
  const paymentContext = useContext(PurchaseContext);
  const tx = viennaWoodsContext?.onChainTxStatusObj?.tx;
  const setIsShowLoadingLogo = viennaWoodsContext?.setIsShowLoadingLogo;
  const showTxStatusModal =
    viennaWoodsContext?.onChainTxStatusObj?.showTxStatusModal;
  const childAccountInfo = viennaWoodsContext?.childAccountInfo;
  const isCreatingAccount = childAccountInfo?.isCreatingChildAccount ?? false;
  const setChildAccountInfo = viennaWoodsContext?.setChildAccountInfo;
  const setSealedRes = viennaWoodsContext?.onChainTxStatusObj?.setSealedRes;
  const setSelectedPaymentMethod = paymentContext?.setSelectedPaymentStage;
  const [parentEmail, setParentEmail] = useState('');
  const [createSsoUserAndBindChildWalletAccount] =
    useMutation<PostCreateSsoUserAndBindChildWalletAccountRes>(
      GQL_CREATE_SSO_USER_AND_BIND_CHILD_WALLET_ACCOUNT,
    );
  const { onClick: walletOnClick } = useSignInOutBlocto(
    MindtrixUserEnum.Collector,
  );
  useEffect(() => {
    const isSealed = tx?.isSealed ?? false;
    const isModalDismissed = !(tx?.isShow ?? false);
    if (isSealed && isModalDismissed) {
      const isSuccess = (tx?.transactionStatus ?? -1) === 4;
      if (isSuccess) {
        const isCreatingChildAccount =
          childAccountInfo?.isCreatingChildAccount ?? false;
        console.info('setSelectedPaymentMethod:', setSelectedPaymentMethod);
        if (isCreatingChildAccount && setSelectedPaymentMethod) {
          setSelectedPaymentMethod(PaymentStageEnum.CRYPTO_COINS);
        }
      }
    }
  }, [tx, childAccountInfo]);
  const texts = viennaWoodsContext?.texts?.viennaWoodsBuyMethodI18nText;
  const onClick = {
    checkIsConnectedWallet: async () => {
      let walletAddressTmp = walletAddress;
      if (!walletAddressTmp) {
        walletAddressTmp = await walletOnClick().signInOrOutAndGetAddress();
      }
      if (setSelectedPaymentMethod && walletAddressTmp) {
        setSelectedPaymentMethod(PaymentStageEnum.CRYPTO_COINS);
      }
    },
    signInWithGooglePopup: async () => {
      if (setIsShowLoadingLogo) setIsShowLoadingLogo(true);
      const { googleUser, googleAccessToken } =
        await FirebaseAuth.signInWithPopup();
      console.info('googleUser:', googleUser);
      const email = googleUser?.email ?? '';
      const photoURL = googleUser?.photoURL ?? '';
      const firebaseUid = googleUser?.uid ?? '';
      const providerId = googleUser?.providerId ?? '';
      console.info('providerId:', providerId);

      const variables = {
        dto: {
          name: googleUser?.displayName ?? '',
          birthday_date_time: 0,
          password: email,
          country: {
            country_dial_code: '+',
            country_iso_code: '',
          },
          device_info: {
            brand: 'apple',
            unique_id: '123',
            firebase_messaging_token: '',
            first_install_time: '',
            manufacturer: '',
            system_version: '',
            used_memory: 0,
          },
          role: ProductTypeEnum.Collector.toUpperCase(),
          rss_link: '',
          email,
          images: {
            small: {
              url: photoURL,
              width: 500,
              height: 500,
            },
            medium: {
              url: photoURL,
              width: 500,
              height: 500,
            },
            large: {
              url: photoURL,
              width: 500,
              height: 500,
            },
          },
          wallet: {
            blocto: {
              address: '',
              cid: '',
              email: '',
              balance: {
                flow: 0,
                fusd: 0,
                usdc: 0,
              },
            },
          },
          firebaseUid,
          verification_hash: '',
        },
      };
      const childAccount = new ChildAccountInfo();
      childAccount.email = email;
      childAccount.isCreatingChildAccount = true;
      console.info('childAccount:', childAccount);
      if (setChildAccountInfo) setChildAccountInfo(childAccount);
      if (showTxStatusModal) showTxStatusModal();
      const res = await createSsoUserAndBindChildWalletAccount({ variables });
      const sealedRes =
        res?.data?.createSsoUserAndBindChildWalletAccountFromMindtrix;
      const txTmp = sealedRes?.transactionId ?? '';
      if (setSealedRes) {
        setSealedRes([txTmp, undefined]);
      }
      setParentEmail(email);
      // await onClick.multisign(parentEmail);
    },
  };
  const text = {
    blockchain_native_flow_description: 'Connect your wallet:',
    walletless_onboarding_with_google_sso_flow_description:
      'Or sign in with Google: ',
    button_sign_in: 'Sign In with Google',
    button_creating_account: 'Creating Account...',
  };
  return (
    <NFTStyle.PaymentContainer>
      <Text.h5
        status={'basic'}
        children={text.blockchain_native_flow_description}
      />
      <Button.Square
        appearance={'filled'}
        size={'large'}
        status={'primary'}
        fontSize={'20px'}
        marginBottom={'12px'}
        mx={0}
        height={'50px'}
        width={'100%'}
        justifyContent={'center'}
        onClick={onClick.checkIsConnectedWallet}
        children={'Connect Wallet'}
      />
      <Text.h5
        status={'basic'}
        children={text.walletless_onboarding_with_google_sso_flow_description}
      />
      <Button.Square
        appearance={'filled'}
        size={'large'}
        disabled={isCreatingAccount}
        status={'primary'}
        fontSize={'20px'}
        marginBottom={'12px'}
        mx={0}
        height={'50px'}
        width={'100%'}
        justifyContent={'center'}
        onClick={onClick.signInWithGooglePopup}
        children={
          isCreatingAccount ? text.button_creating_account : text.button_sign_in
        }
      />
    </NFTStyle.PaymentContainer>
  );
};
