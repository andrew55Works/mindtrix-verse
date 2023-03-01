import { TFunction } from 'next-i18next';
import { I18N_NS_ENUM } from '../../utils/i18n-utils';
import { ILandmarkModal, IPack } from '../../types/vienna-world.types';
import React from 'react';
import { TxStatusRes } from '../common/loading/tx-status.hooks';
import { ChildAccountInfo } from '../../types/creator.type';

export const getViennaWoodsLandmarkCommonI18n = (t: TFunction) => {
  const i18n = {
    landmark_common: (key: string) =>
      t(`${I18N_NS_ENUM.landmark_common}:${key}`),
  };

  return {
    button_buy: i18n.landmark_common('button_buy'),
    button_sold_out: i18n.landmark_common('button_sold_out'),
    card_inventory: i18n.landmark_common('card_inventory'),
    card_inventory_hover: i18n.landmark_common('card_inventory_hover'),
    card_purchase_date: i18n.landmark_common('card_purchase_date'),
    card_purchase_date_detail: i18n.landmark_common(
      'card_purchase_date_detail',
    ),
    card_purchase_date_hover: i18n.landmark_common('card_purchase_date_hover'),
    card_purchase_notes: i18n.landmark_common('card_purchase_notes'),
    card_purchase_notes_hover: i18n.landmark_common(
      'card_purchase_notes_hover',
    ),
    card_supports: i18n.landmark_common('card_supports'),
    card_tab_pack_information: i18n.landmark_common(
      'card_tab_pack_information',
    ),
    card_tab_utility: i18n.landmark_common('card_tab_utility'),
  };
};

export const getViennaWoodsLandmarkI18n = (t: TFunction) => {
  const i18n = {
    landmark_bush_village: (key: string) =>
      t(`${I18N_NS_ENUM.landmark_bush_village}:${key}`),
    landmark_echo_cliff: (key: string) =>
      t(`${I18N_NS_ENUM.landmark_echo_cliff}:${key}`),
    landmark_green_bazaar: (key: string) =>
      t(`${I18N_NS_ENUM.landmark_green_bazaar}:${key}`),
    landmark_kabbalah_sacred_trees: (key: string) =>
      t(`${I18N_NS_ENUM.landmark_kabbalah_sacred_trees}:${key}`),
    landmark_landmark_mimir_swamp: (key: string) =>
      t(`${I18N_NS_ENUM.landmark_mimir_swamp}:${key}`),
    landmark_landmark_podment_temple: (key: string) =>
      t(`${I18N_NS_ENUM.landmark_podment_temple}:${key}`),
  };

  return {
    bush_village: {
      card_landmark_utility: i18n.landmark_bush_village(
        'card_landmark_utility',
      ),
      card_pack_inventory: i18n.landmark_bush_village('card_pack_inventory'),
      card_pack_name: i18n.landmark_bush_village('card_pack_name'),
      card_title_landmark: i18n.landmark_bush_village('card_title_landmark'),
      label_landmark_introduction: i18n.landmark_bush_village(
        'label_landmark_introduction',
      ),
      title_landmark: i18n.landmark_bush_village('title_landmark'),
    },
    echo_cliff: {
      card_landmark_utility: i18n.landmark_echo_cliff('card_landmark_utility'),
      card_pack_inventory: i18n.landmark_echo_cliff('card_pack_inventory'),
      card_pack_name: i18n.landmark_echo_cliff('card_pack_name'),
      card_title_landmark: i18n.landmark_echo_cliff('card_title_landmark'),
      label_landmark_introduction: i18n.landmark_echo_cliff(
        'label_landmark_introduction',
      ),
      title_landmark: i18n.landmark_echo_cliff('title_landmark'),
    },
    green_bazaar: {
      card_landmark_utility: i18n.landmark_green_bazaar(
        'card_landmark_utility',
      ),
      card_pack_inventory: i18n.landmark_green_bazaar('card_pack_inventory'),
      card_pack_name: i18n.landmark_green_bazaar('card_pack_name'),
      card_title_landmark: i18n.landmark_green_bazaar('card_title_landmark'),
      label_landmark_introduction: i18n.landmark_green_bazaar(
        'label_landmark_introduction',
      ),
      title_landmark: i18n.landmark_green_bazaar('title_landmark'),
    },
    kabbalah_sacred_trees: {
      card_landmark_utility: i18n.landmark_kabbalah_sacred_trees(
        'card_landmark_utility',
      ),
      card_pack_inventory: i18n.landmark_kabbalah_sacred_trees(
        'card_pack_inventory',
      ),
      card_pack_name: i18n.landmark_kabbalah_sacred_trees('card_pack_name'),
      card_title_landmark: i18n.landmark_kabbalah_sacred_trees(
        'card_title_landmark',
      ),
      label_landmark_introduction: i18n.landmark_kabbalah_sacred_trees(
        'label_landmark_introduction',
      ),
      title_landmark: i18n.landmark_kabbalah_sacred_trees('title_landmark'),
    },
    mimir_swamp: {
      card_landmark_utility: i18n.landmark_landmark_mimir_swamp(
        'card_landmark_utility',
      ),
      card_pack_inventory: i18n.landmark_landmark_mimir_swamp(
        'card_pack_inventory',
      ),
      card_pack_name: i18n.landmark_landmark_mimir_swamp('card_pack_name'),
      card_title_landmark: i18n.landmark_landmark_mimir_swamp(
        'card_title_landmark',
      ),
      label_landmark_introduction: i18n.landmark_landmark_mimir_swamp(
        'label_landmark_introduction',
      ),
      title_landmark: i18n.landmark_landmark_mimir_swamp('title_landmark'),
    },
    podment_temple: {
      card_landmark_utility: i18n.landmark_landmark_podment_temple(
        'card_landmark_utility',
      ),
      card_pack_inventory: i18n.landmark_landmark_podment_temple(
        'card_pack_inventory',
      ),
      card_pack_name: i18n.landmark_landmark_podment_temple('card_pack_name'),
      card_title_landmark: i18n.landmark_landmark_podment_temple(
        'card_title_landmark',
      ),
      label_landmark_introduction: i18n.landmark_landmark_podment_temple(
        'label_landmark_introduction',
      ),
      title_landmark: i18n.landmark_landmark_podment_temple('title_landmark'),
    },
  };
};

export const getViennaWoodsBuyMethodI18n = (t: TFunction) => {
  const i18n = {
    vienna_woods_buy_method: (key: string) =>
      t(`${I18N_NS_ENUM.vienna_woods_buy_method}:${key}`),
  };

  return {
    button_bridge_coins: i18n.vienna_woods_buy_method('button_bridge_coins'),
    button_bridge_coins_helps_hover: i18n.vienna_woods_buy_method(
      'button_bridge_coins_helps_hover',
    ),
    button_buy_credit_card: i18n.vienna_woods_buy_method(
      'button_buy_credit_card',
    ),
    button_buy_stable_coin: i18n.vienna_woods_buy_method(
      'button_buy_stable_coin',
    ),
    button_cancel: i18n.vienna_woods_buy_method('button_cancel'),
    button_connect_wallet: i18n.vienna_woods_buy_method(
      'button_connect_wallet',
    ),
    button_swap_coins: i18n.vienna_woods_buy_method('button_swap_coins'),
    button_swap_coins_helps_hover: i18n.vienna_woods_buy_method(
      'button_swap_coins_helps_hover',
    ),
    card_button_cta: i18n.vienna_woods_buy_method('card_button_cta'),
    card_button_cta_sold_out: i18n.vienna_woods_buy_method(
      'card_button_cta_sold_out',
    ),
    card_tab_pack_information: i18n.vienna_woods_buy_method(
      'card_tab_pack_information',
    ),
    card_tab_purchase_date: i18n.vienna_woods_buy_method(
      'card_tab_purchase_date',
    ),
    card_tab_purchase_date_helps: i18n.vienna_woods_buy_method(
      'card_tab_purchase_date_helps',
    ),
    card_tab_purchase_notes: i18n.vienna_woods_buy_method(
      'card_tab_purchase_notes',
    ),
    card_title: i18n.vienna_woods_buy_method('card_title'),
    dialog_purchase_limit: i18n.vienna_woods_buy_method(
      'dialog_purchase_limit',
    ),
    dialog_repeat_purchase: i18n.vienna_woods_buy_method(
      'dialog_repeat_purchase',
    ),
    label_buy_description: i18n.vienna_woods_buy_method(
      'label_buy_description',
    ),
    label_coin_type: i18n.vienna_woods_buy_method('label_coin_type'),
    label_pay_price: i18n.vienna_woods_buy_method('label_pay_price'),
    label_your_blance: i18n.vienna_woods_buy_method('label_your_blance'),
    label_your_blance_connected: i18n.vienna_woods_buy_method(
      'label_your_blance_connected',
    ),
    label_your_blance_not_connected: i18n.vienna_woods_buy_method(
      'label_your_blance_not_connected',
    ),
    label_your_blance_warming: i18n.vienna_woods_buy_method(
      'label_your_blance_warming',
    ),
    text_coin_type: i18n.vienna_woods_buy_method('text_coin_type'),
  };
};

export const getViennaWoodsCommonI18n = (t: TFunction) => {
  const i18n = {
    vienna_woods_common: (key: string) =>
      t(`${I18N_NS_ENUM.vienna_woods_common}:${key}`),
  };

  return {
    button_explore: i18n.vienna_woods_common('button_explore'),
    button_login: i18n.vienna_woods_common('button_login'),
    button_ok: i18n.vienna_woods_common('button_ok'),
    dialog_another_world_title: i18n.vienna_woods_common(
      'dialog_another_world_title',
    ),
    label_introduction: i18n.vienna_woods_common('label_introduction'),
    label_purchase_date_limit: i18n.vienna_woods_common(
      'label_purchase_date_limit',
    ),
    switch_language_en: i18n.vienna_woods_common('switch_language_en'),
    switch_language_zh: i18n.vienna_woods_common('switch_language_zh'),
  };
};

export interface IViennaWoodsContext {
  childAccountInfo: ChildAccountInfo;
  isShowLoadingLogo: boolean;
  landmarkModalInfo: ILandmarkModal;
  onChainTxStatusObj: TxStatusRes;
  purchasedPack: IPack | null;
  setChildAccountInfo: React.Dispatch<ChildAccountInfo>;
  setIsShowLoadingLogo: React.Dispatch<boolean>;
  setPurchasedPack: React.Dispatch<IPack>;
  texts: {
    viennaWoodsBuyMethodI18nText: ReturnType<
      typeof getViennaWoodsBuyMethodI18n
    >;
    viennaWoodsCommonI18nText: ReturnType<typeof getViennaWoodsCommonI18n>;
    viennaWoodsLandmarkCommonI18nText: ReturnType<
      typeof getViennaWoodsLandmarkCommonI18n
    >;
    viennaWoodsLandmarkI18nText: ReturnType<typeof getViennaWoodsLandmarkI18n>;
  };
}

export const getViennaWoodsI18ns = (t: TFunction) => {
  const viennaWoodsCommonI18nText = getViennaWoodsCommonI18n(t);
  const viennaWoodsLandmarkCommonI18nText = getViennaWoodsLandmarkCommonI18n(t);
  const viennaWoodsBuyMethodI18nText = getViennaWoodsBuyMethodI18n(t);
  const viennaWoodsLandmarkI18nText = getViennaWoodsLandmarkI18n(t);
  const i18ns = {
    viennaWoodsCommonI18nText,
    viennaWoodsLandmarkCommonI18nText,
    viennaWoodsBuyMethodI18nText,
    viennaWoodsLandmarkI18nText,
  };
  return { texts: i18ns };
};
