import { useTranslation } from 'next-i18next';
import { I18N_NS_ENUM } from '../../utils/i18n-utils';

export const useAccountCommonI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    account_common: (key: string) => t(`${I18N_NS_ENUM.account_common}:${key}`),
  };

  const text = {
    button_share_gallery: i18n.account_common('button_share_gallery'),
    page_title_milestone: i18n.account_common('page_title_milestone'),
    page_title_mycollection: i18n.account_common('page_title_mycollection'),
    page_title_notification: i18n.account_common('page_title_notification'),
    page_title_watching: i18n.account_common('page_title_watching'),
    profile_title_address: i18n.account_common('profile_title_address'),
    profile_title_wallet: i18n.account_common('profile_title_wallet'),
  };

  return {
    text,
  };
};

export const useAccountCreationDetailI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    account_common: (key: string) =>
      t(`${I18N_NS_ENUM.account_creation_detail}:${key}`),
  };

  const text = {
    button_rawfile: i18n.account_common('button_rawfile'),
    button_sharecreation: i18n.account_common('button_sharecreation'),
    button_transactions: i18n.account_common('button_transactions'),
    label_title_creationplatform: i18n.account_common(
      'label_title_creationplatform',
    ),
    label_title_creator: i18n.account_common('label_title_creator'),
    label_title_description: i18n.account_common('label_title_description'),
    label_title_edition: i18n.account_common('label_title_edition'),
    label_title_episode: i18n.account_common('label_title_episode'),
  };

  return {
    text,
  };
};

export const useMenuAccountI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    menu_account: (key: string) => t(`${I18N_NS_ENUM.menu_account}:${key}`),
  };

  const text = {
    button_logout: i18n.menu_account('button_logout'),
    button_wallet: i18n.menu_account('button_wallet'),
    label_account: i18n.menu_account('label_account'),
    label_marketplace: i18n.menu_account('label_marketplace'),
    label_2bdashboard: i18n.menu_account('label_2bdashboard'),
    label_language: i18n.menu_account('label_language'),
    label_mycollections: i18n.menu_account('label_mycollections'),
    label_notification: i18n.menu_account('label_notification'),
    label_title_2b: i18n.menu_account('label_title_2b'),
    label_title_2c: i18n.menu_account('label_title_2c'),
    label_unit: i18n.menu_account('label_unit'),
    label_wallet: i18n.menu_account('label_wallet'),
    label_watching: i18n.menu_account('label_watching'),
    switch_label_eng: i18n.menu_account('switch_label_eng'),
    switch_label_zh: i18n.menu_account('switch_label_zh'),
  };

  return {
    text,
  };
};

export const useMyCollectionI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    account_common: (key: string) =>
      t(`${I18N_NS_ENUM.account_mycollection}:${key}`),
  };

  const text = {
    card_podcast_audio: i18n.account_common('card_podcast_audio'),
    card_podcast_image: i18n.account_common('card_podcast_image'),
    label_title: i18n.account_common('label_title'),
  };

  return {
    text,
  };
};
export const useMarketplaceBuyingI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    marketplace_buying: (key: string) =>
      t(`${I18N_NS_ENUM.marketplace_buying}:${key}`),
  };

  const text = {
    dialog_buyanother_button1: i18n.marketplace_buying(
      'dialog_buyanother_button1',
    ),
    dialog_buyanother_button2: i18n.marketplace_buying(
      'dialog_buyanother_button2',
    ),
    dialog_buyanother_title: i18n.marketplace_buying('dialog_buyanother_title'),
    dialog_buying_button: i18n.marketplace_buying('dialog_buying_button'),
    dialog_buying_title: i18n.marketplace_buying('dialog_buying_title'),
    dialog_buying_unitchange: i18n.marketplace_buying(
      'dialog_buying_unitchange',
    ),
    dialog_success_button_ok: i18n.marketplace_buying(
      'dialog_success_button_ok',
    ),
    dialog_success_label_creation: i18n.marketplace_buying(
      'dialog_success_label_creation',
    ),
    dialog_success_label_episode: i18n.marketplace_buying(
      'dialog_success_label_episode',
    ),
    dialog_success_label_podcast: i18n.marketplace_buying(
      'dialog_success_label_podcast',
    ),
    dialog_unlogin_button: i18n.marketplace_buying('dialog_unlogin_button'),
    dialog_unlogin_title: i18n.marketplace_buying('dialog_unlogin_title'),
    label_success_title: i18n.marketplace_buying('label_success_title'),
    label_fail_title: i18n.marketplace_buying('label_fail_title'),
  };

  return {
    text,
  };
};
