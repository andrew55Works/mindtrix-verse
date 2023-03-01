import { useEffect, useRef, useState } from 'react';
import {
  CreateOrUpdateUserDonationSettingRes,
  DonationSetting,
  GetUserSettingByUserIdRes,
  UserSettingDto,
  UserSettingVo,
} from '../../api/types/user-setting.types';
import { useMutation, useQuery } from '@apollo/client';
import {
  GQL_POST_CREATE_OR_UPDATE_USER_DONATION_SETTING,
  GQL_QUERY_GET_USER_SETTING_BY_USER_ID,
} from '../../api/graphql/user-setting.graphql';
import { _get } from '../../utils/lodash.utils';
import { CurrencyUserSetting } from '../../api/types/donation.types';
import { getDonationRoyaltyDictionary } from '../../utils/cadence.utils';
import {
  getIsMindtrixInitFcl,
  getIsShowRoyaltyInit,
} from '../../api/fcl/scripts.fcl';
import { useWalletBalance } from '../wallet/wallet.hooks';

export const useUserDonationSetting = (
  user_id: string,
  show_guid: string,
  creator_wallet_address: string,
  loadingFn: { hide: () => void; show: () => void },
) => {
  const isFetchOnceRef = useRef(false);
  const { flowToFiatCurrency, fiatToFlowCurrency, displayCurrency } =
    useWalletBalance();
  const [donationSetting, setDonationSetting] = useState<UserSettingVo>(
    new UserSettingVo(),
  );
  const [isEnableDonation, setIsEnableDonation] = useState(false);
  const [isInitRoyalty, setIsInitRoyalty] = useState(false);
  const defaultDonationPrice = 1;
  const [donationPrice, setDonationPrice] = useState(defaultDonationPrice);
  const [donationPriceDraft, setDonationPriceDraft] = useState(
    defaultDonationPrice.toString(),
  );
  const [donationFiatPriceDraft, setDonationFiatPriceDraft] = useState(
    flowToFiatCurrency(defaultDonationPrice),
  );

  const { refetch: getUserSettingByUserId } =
    useQuery<GetUserSettingByUserIdRes>(GQL_QUERY_GET_USER_SETTING_BY_USER_ID, {
      skip: true,
    });

  const [createOrUpdateUserDonationSettingApi] =
    useMutation<CreateOrUpdateUserDonationSettingRes>(
      GQL_POST_CREATE_OR_UPDATE_USER_DONATION_SETTING,
    );

  const postApiAndUpdateDonationSettingState = async (dto: UserSettingDto) => {
    loadingFn.show();
    const res = await createOrUpdateUserDonationSettingApi({
      variables: {
        dto,
      },
    });
    loadingFn.hide();
    const error = res?.errors ?? null;
    const data = res?.data?.createOrUpdateUserSetting ?? null;
    const isSuccess = !error && data;
    if (isSuccess) {
      setDonationSetting(data);
    }
    return isSuccess;
  };

  // manual copy to avoid __typename from GraphQL request
  const copyUserSettingDto = (
    oldDonationSetting: DonationSetting,
  ): UserSettingDto => {
    return {
      user_id,
      donation: {
        description: oldDonationSetting?.description ?? '',
        is_enable: oldDonationSetting?.is_enable ?? false,
        prices: oldDonationSetting?.prices?.map((p) => {
          const m = new CurrencyUserSetting();
          m.price = p.price;
          m.code = p.code;
          return m;
        }),
        royalties: getDonationRoyaltyDictionary(creator_wallet_address),
      },
    };
  };

  const updateFns = {
    toggleIsEnableDonation: async (is_enable: boolean) => {
      const copiedUserSettingDto = copyUserSettingDto(
        donationSetting?.donation,
      );
      const newDonationSetting: UserSettingDto = {
        ...copiedUserSettingDto,
        donation: {
          ...copiedUserSettingDto.donation,
          is_enable,
        },
      };
      return await postApiAndUpdateDonationSettingState(newDonationSetting);
    },
    updateDonationPrice: async (donation_price: number) => {
      const copiedUserSettingDto = copyUserSettingDto(
        donationSetting?.donation,
      );
      const newDonationSetting: UserSettingDto = {
        ...copiedUserSettingDto,
        donation: {
          ...copiedUserSettingDto.donation,
          prices: [{ code: 'flow', price: donation_price }],
        },
      };
      return await postApiAndUpdateDonationSettingState(newDonationSetting);
    },
  };

  useEffect(() => {
    const fetch = async () => {
      if (!user_id || !show_guid || isFetchOnceRef.current) return;
      loadingFn.show();
      isFetchOnceRef.current = true;
      const variables = {
        user_id,
      };
      const userSettingRes = await getUserSettingByUserId(variables);
      const donationSettingTmp =
        userSettingRes?.data?.getUserSettingByUserId ?? null;

      const donation = donationSettingTmp?.donation ?? null;
      const donationPriceTmp = _get(
        donation,
        ['prices', '0', 'price'],
        1,
      ) as number;

      const [isInitRes, isInitError] = await getIsShowRoyaltyInit(show_guid);

      console.info('getIsShowRoyaltyInit: ', isInitRes);
      console.info('getIsShowRoyaltyInit isInitError: ', isInitError);
      const isShowRoyaltyInit = isInitRes?.data ?? false;

      setIsInitRoyalty(isShowRoyaltyInit);
      setDonationSetting(donationSettingTmp);
      setIsEnableDonation(donation?.is_enable ?? false);
      setDonationPrice(donationPriceTmp);
      setDonationPriceDraft(donationPriceTmp.toString());
      loadingFn.hide();
    };
    fetch();
  }, [user_id, show_guid]);
  return {
    donationSetting,
    isInitRoyalty,
    isEnableDonation,
    donationPrice,
    donationPriceDraft,
    displayCurrency,
    flowToFiatCurrency,
    fiatToFlowCurrency,
    donationFiatPriceDraft,
    setDonationFiatPriceDraft,
    setIsEnableDonation,
    setDonationPrice,
    setDonationPriceDraft,
    updateFns,
  };
};
