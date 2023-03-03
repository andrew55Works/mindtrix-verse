import { NFTEssenceV2 } from '../../api/types/nft.types';
import { useMarketplaceBuyingI18n } from '../i18n/i18n.hooks';
import { NFT_ENUM } from '../../api/types/nft-enum.types';
import { getEssenceSoldStatus } from '../../utils/essence.utils';
import { statusColorSystemStr } from '../../styles/styled-system/color.theme';
import { _get } from '../../utils/lodash.utils';
import { getViennaWoodsBuyMethodI18n } from '../i18n/i18n-vienna-woods.hooks';
import { Trans, useTranslation } from 'next-i18next';
import { I18N_NS_ENUM } from '../../utils/i18n-utils';
import { Text } from '../../styles/styled-system/text.theme';

export interface PurchaseButtonStatus {
  backgroundColor: string;
  ctaText: string;
  disability: boolean;
}
export const usePurchaseButtonStatus = (
  priceUSD: number,
  essence: NFTEssenceV2 | null,
  walletAddress: string,
) => {
  const { t } = useTranslation();
  const { text } = useMarketplaceBuyingI18n();
  const essenceId = essence?.essence_uuid ?? 0;

  const listStartTime = new Date(
    essence?.nft_list_start_date_time ?? 0,
  ).getTime();
  const listEndTime = new Date(essence?.nft_list_end_date_time ?? 0).getTime();
  const listPrice = essence?.nft_list_price ?? 0;
  const mintedQuantity = essence?.nft_minted_quantity ?? 0;
  const capacity = essence?.nft_edition_quantity ?? 0;
  const isPOAP = essence?.nft_type === NFT_ENUM.TYPE.PODCAST_POAP;

  const soldStatus = getEssenceSoldStatus(
    listStartTime,
    listEndTime,
    listPrice,
    mintedQuantity,
    capacity,
    essence?.nft_reach_claimed_limitation ?? true,
    !!walletAddress,
  );

  const ctaText = {
    NOT_CONNECTED_WALLET: isPOAP
      ? text.button_join_event
      : text.button_connect_wallet_to_claim,
    NOT_STARTED: text.button_coming_soon,
    HAS_CLAIMED: text.button_claimed,
    FREE_CLAIM: text.button_free_claim,
    PREMIUM_CLAIM: (
      <Trans
        i18nKey={`${I18N_NS_ENUM.landmark_common}:button_buy`}
        defaults={''}
        values={{
          pack_price: priceUSD,
        }}
        components={[
          <Text.h2
            key='0'
            status={'basic'}
            my={0}
            mx={'2px'}
            children={priceUSD}
          />,
        ]}
      />
    ),
    SOLD_OUT: text.button_sold_out,
    EXPIRED: text.button_expired,
  };

  const disability = {
    NOT_CONNECTED_WALLET: false,
    NOT_STARTED: true,
    HAS_CLAIMED: true,
    FREE_CLAIM: false,
    PREMIUM_CLAIM: false,
    SOLD_OUT: true,
    EXPIRED: true,
  };

  const btBackgroundColor = {
    NOT_CONNECTED_WALLET: statusColorSystemStr.basic,
    NOT_STARTED: statusColorSystemStr.disabledBackground,
    HAS_CLAIMED: statusColorSystemStr.disabledBackground,
    FREE_CLAIM: statusColorSystemStr.basic,
    PREMIUM_CLAIM: statusColorSystemStr.basic,
    SOLD_OUT: statusColorSystemStr.disabledBackground,
    EXPIRED: statusColorSystemStr.disabledBackground,
  };

  return {
    ctaText: _get(ctaText, [soldStatus], 'Expired'),
    disability: _get(disability, [soldStatus], true) as boolean,
    backgroundColor: _get(
      btBackgroundColor,
      [soldStatus],
      statusColorSystemStr.disabledBackground,
    ),
  };
};
