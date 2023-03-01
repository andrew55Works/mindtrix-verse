import {
  useCreatorReadyI18n,
  useCurrentLocale,
} from '../../../hooks/i18n/i18n.hooks';
import {
  MindtrixUserEnum,
  useSignInOutBlocto,
} from '../../../hooks/wallet/wallet.hooks';
import { Button } from '../../../styles/styled-system/button.theme';
import { useMutation } from '@apollo/client';
import { PostCreateUserRes } from '../../../api/types/user.types';
import { GQL_CREATE_USER } from '../../../api/graphql/user.graphql';
import { useEffect, useRef } from 'react';
import { USER_ROLE_ENUM } from '../../../redux/collector/collector.interface';
import { CreatorProfile } from '../../../redux/creator/creator.interface';
import { initialCreatorState } from '../../../redux/creator/creator.slice';
import { getImageCompressor } from '../../../utils/config.web.utils';

const MenuLoginWithWallet = () => {
  const { text: textReady } = useCreatorReadyI18n();
  const { creatorProfile, loggedIn, onClick } = useSignInOutBlocto(
    MindtrixUserEnum.Collector,
  );

  const isCreateOnce = useRef(false);
  const { iso31661Code } = useCurrentLocale();
  const [createUser] = useMutation<PostCreateUserRes>(GQL_CREATE_USER);
  const text = {
    login: loggedIn
      ? textReady.button_disconnect_wallet
      : textReady.button_connect_wallet,
  };
  useEffect(() => {
    const createAccountIfNoneExist = async () => {
      const address = creatorProfile?.wallet?.blocto?.address ?? '';
      const isBreak = !address || isCreateOnce.current;
      if (isBreak) return;
      isCreateOnce.current = true;
      const name = creatorProfile?.name ?? '';
      const email = creatorProfile?.email ?? '';
      const password = '';
      const firebasePassword = '111111';
      const firebaseUid = '1111asdasd';
      const cid = creatorProfile?.wallet?.blocto?.cid ?? null;
      const flowNum = creatorProfile?.wallet?.blocto?.balance?.flow?.num ?? 0;
      const coverImageUrl = creatorProfile?.images.medium.url ?? null;

      const imageCompressorUrl = getImageCompressor()?.IMG_COMPRESSOR_URL ?? '';
      const imageBaseUrl = `${imageCompressorUrl}?url=${coverImageUrl}&li&fit=contain&dpr=1`;
      const images = {
        small: {
          height: 60,
          width: 60,
          url: `${imageBaseUrl}&h=60&w=60`,
        },
        medium: {
          height: 120,
          width: 120,
          url: `${imageBaseUrl}&h=120&w=120`,
        },
        large: {
          height: 360,
          width: 360,
          url: `${imageBaseUrl}&h=360&w=360`,
        },
      };
      const userDto = {
        country: {
          country_dial_code: '',
          country_iso_code: iso31661Code,
        },
        birthday_date_time: 0,
        rss_link: 'sdfsdfsdfsdf',
        name: address,
        email,
        firebaseUid,
        password: firebasePassword,
        role: USER_ROLE_ENUM.COLLECTOR,
        verification_hash: '',
        images,
        wallet: {
          blocto: {
            address,
            cid,
            email,
            balance: {
              flow: flowNum,
              usdc: 0,
              fusd: 0,
            },
          },
        },
        device_info: {
          brand: '',
          firebase_messaging_token: '',
          unique_id: '',
          first_install_time: '',
          manufacturer: '',
          system_version: '',
          used_memory: 0,
        },
      };
      const createUserResTmp = await createUser({
        variables: { dto: userDto },
      });
      const creatorVo: CreatorProfile =
        createUserResTmp?.data?.createUser ??
        initialCreatorState.creatorProfile;
    };
    // check if exist
    // createAccountIfNoneExist();
  }, [creatorProfile]);
  return (
    <Button.Square
      appearance={'filled'}
      size={'medium'}
      status={'primary'}
      width={'100%'}
      justifyContent={'center'}
      onClick={onClick().signInOrOut}
      children={text.login}
    />
  );
};

export default MenuLoginWithWallet;
