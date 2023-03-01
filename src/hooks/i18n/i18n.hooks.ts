import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { getBrowserLocaleCode, getISO31661Code } from '../../utils/lang.utils';
import { useTranslation } from 'next-i18next';
import { I18N_NS_ENUM } from '../../utils/i18n-utils';

export const useCurrentLocale = () => {
  const { locale: nextLang } = useRouter();
  return { nextLang, iso31661Code: getISO31661Code() };
};

export const useChangeLocale = (router: NextRouter, nextLocale: string) => {
  const supportedLocale = ['en', 'zh'];
  useEffect(() => {
    if (!router || !nextLocale) return;
    const { locale: currentLocale, pathname, asPath, query } = router;
    const isLocaleSupported = supportedLocale.some(
      (lang) => lang === nextLocale,
    );
    const isNeedToChangeLocale =
      currentLocale !== nextLocale && isLocaleSupported;
    if (isNeedToChangeLocale) {
      router.push({ pathname, query }, asPath, {
        locale: nextLocale,
      });
    }
  }, [nextLocale]);
};

export const useBrowserLocale = () => {
  const router = useRouter();
  const defaultLocale = router?.defaultLocale ?? 'en';
  const browserLocale = getBrowserLocaleCode(defaultLocale);
  useChangeLocale(router, browserLocale);
};

export const useCreatorAccountI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_account: (key: string) =>
      t(`${I18N_NS_ENUM.creator_account}:${key}`),
  };

  const text = {
    button_reset_password: i18n.creator_account('button_reset_password'),
    h3_account_security: i18n.creator_account('h3_account_security'),
    h3_blockchain_wallet: i18n.creator_account('h3_blockchain_wallet'),
    h3_distribution_platforms: i18n.creator_account(
      'h3_distribution_platforms',
    ),
    h3_podcast_rss_feed: i18n.creator_account('h3_podcast_rss_feed'),
    h3_sales_overview_of_creations: i18n.creator_account(
      'h3_sales_overview_of_creations',
    ),
    h4_quantity_of_creations: i18n.creator_account('h4_quantity_of_creations'),
    h4_quantity_of_creations_sold: i18n.creator_account(
      'h4_quantity_of_creations_sold',
    ),
    h4_total_revenue: i18n.creator_account('h4_total_revenue'),
    h4_wallet_address: i18n.creator_account('h4_wallet_address'),
    h4_wallet_balance: i18n.creator_account('h4_wallet_balance'),
    h5_edit_link: i18n.creator_account('h5_edit_link'),
    modal_button_cancel_reset_password: i18n.creator_account(
      'modal_button_cancel_reset_password',
    ),
    modal_button_confirm_reset_password: i18n.creator_account(
      'modal_button_confirm_reset_password',
    ),
    p_revenue_unit: i18n.creator_account('p_revenue_unit'),
    p_wallet_immutability: i18n.creator_account('p_wallet_immutability'),
  };

  return {
    text,
  };
};

export const useCreatorReadyI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_common: (key: string) => t(`${I18N_NS_ENUM.creator_common}:${key}`),
    creator_ready: (key: string) => t(`${I18N_NS_ENUM.creator_ready}:${key}`),
  };

  const text = {
    h1_creator_login: i18n.creator_ready('h1_creator_login'),
    button_connect_wallet: i18n.creator_ready('button_connect_wallet'),
    button_disconnect_wallet: i18n.creator_ready('button_disconnect_wallet'),
    p_blocto_recommendation: i18n.creator_ready('p_blocto_recommendation'),
    p_cannot_change_wallet_reminder: i18n.creator_ready(
      'p_cannot_change_wallet_reminder',
    ),
    input_essence_name_at: i18n.creator_common(
      'input_essence_name_assistive_text',
    ),
    input_essence_description_at: i18n.creator_common(
      'input_essence_description_assistive_text',
    ),
    input_list_price_at: i18n.creator_common('input_list_price_assistive_text'),
    input_edition_number_at: i18n.creator_common(
      'input_edition_number_assistive_text',
    ),
    select_podcast_episode_at: i18n.creator_common(
      'select_podcast_episode_assistive_text',
    ),
  };

  return {
    text,
  };
};

export const useCreatorRegisterI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_register: (key: string) =>
      t(`${I18N_NS_ENUM.creator_register}:${key}`),
  };

  const text = {
    button_resend_verification_email: i18n.creator_register(
      'button_resend_verification_email',
    ),
    button_verify: i18n.creator_register('button_verify'),
    h2_invite_code_rules: i18n.creator_register('h2_invite_code_rules'),
    h3_input_invite_code: i18n.creator_register('h3_input_invite_code'),
    h3_input_podcast_rss_feed: i18n.creator_register(
      'h3_input_podcast_rss_feed',
    ),
    label_mindtrix_terms: i18n.creator_register('label_mindtrix_terms'),
    modal_button_confirm_send_verification_email: i18n.creator_register(
      'modal_button_confirm_send_verification_email',
    ),
    modal_button_confirm_set_password: i18n.creator_register(
      'modal_button_confirm_set_password',
    ),
    modal_button_discard_set_password: i18n.creator_register(
      'modal_button_discard_set_password',
    ),
    modal_content_send_verification_email: i18n.creator_register(
      'modal_content_send_verification_email',
    ),
    modal_input_placeholder_set_password: i18n.creator_register(
      'modal_input_placeholder_set_password',
    ),
    modal_title_send_verification_email: i18n.creator_register(
      'modal_title_send_verification_email',
    ),
    modal_title_set_password: i18n.creator_register('modal_title_set_password'),
    p_fail_to_verify: i18n.creator_register('p_fail_to_verify'),
    p_fail_to_verify_invite_code: i18n.creator_register(
      'p_fail_to_verify_invite_code',
    ),
    p_invite_code_format_reminder: i18n.creator_register(
      'p_invite_code_format_reminder',
    ),
    p_podcast_rss_feed_format_reminder: i18n.creator_register(
      'p_podcast_rss_feed_format_reminder',
    ),
  };

  return {
    text,
  };
};

export const useCreatorVerifyEmailI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_verify_email: (key: string) =>
      t(`${I18N_NS_ENUM.creator_verify_email}:${key}`),
  };

  const text = {
    h2_successfully_verified: i18n.creator_verify_email(
      'h2_successfully_verified',
    ),
    h5_closing_page_warning: i18n.creator_verify_email(
      'h5_closing_page_warning',
    ),
  };

  return {
    text,
  };
};

export const useCreatorVerifyPasswordI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_verify_password: (key: string) =>
      t(`${I18N_NS_ENUM.creator_verify_password}:${key}`),
  };

  const text = {
    button_submit_set_password: i18n.creator_verify_password(
      'button_submit_set_password',
    ),
    h3_set_password: i18n.creator_verify_password('h3_set_password'),
    input_format_warning_set_password: i18n.creator_verify_password(
      'input_format_warning_set_password',
    ),
    input_placeholder_set_password: i18n.creator_verify_password(
      'input_placeholder_set_password',
    ),
    modal_button_confirm_failed_with_email_link: i18n.creator_verify_password(
      'modal_button_confirm_failed_with_email_link',
    ),
    modal_button_confirm_failed_with_unknown_error:
      i18n.creator_verify_password(
        'modal_button_confirm_failed_with_unknown_error',
      ),
    modal_button_confirm_successful_verify: i18n.creator_verify_password(
      'modal_button_confirm_successful_verify',
    ),
    modal_content_failed_with_email_link: i18n.creator_verify_password(
      'modal_content_failed_with_email_link',
    ),
    modal_content_failed_with_unknown_error: i18n.creator_verify_password(
      'modal_content_failed_with_unknown_error',
    ),
    modal_content_successful_verify: i18n.creator_verify_password(
      'modal_content_successful_verify',
    ),
    modal_title_failed_with_email_link: i18n.creator_verify_password(
      'modal_title_failed_with_email_link',
    ),
    modal_title_failed_with_unknown_error: i18n.creator_verify_password(
      'modal_title_failed_with_unknown_error',
    ),
    modal_title_successful_verify: i18n.creator_verify_password(
      'modal_title_successful_verify',
    ),
    p_content_set_password: i18n.creator_verify_password(
      'p_content_set_password',
    ),
  };

  return {
    text,
  };
};

export const useCreatorVerifyResetPasswordI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_verify_reset_password: (key: string) =>
      t(`${I18N_NS_ENUM.creator_verify_reset_password}:${key}`),
  };

  const text = {
    button_modal_submit_fail_to_reset: i18n.creator_verify_reset_password(
      'button_modal_submit_fail_to_reset',
    ),
    button_modal_submit_successful_reset: i18n.creator_verify_reset_password(
      'button_modal_submit_successful_reset',
    ),
    button_submit_reset_password: i18n.creator_verify_reset_password(
      'button_submit_reset_password',
    ),
    h3_reset_password: i18n.creator_verify_reset_password('h3_reset_password'),
    h4_modal_description_fail_to_reset: i18n.creator_verify_reset_password(
      'h4_modal_description_fail_to_reset',
    ),
    h4_modal_description_successful_reset: i18n.creator_verify_reset_password(
      'h4_modal_description_successful_reset',
    ),
    h4_modal_title_fail_to_reset: i18n.creator_verify_reset_password(
      'h4_modal_title_fail_to_reset',
    ),
    h4_modal_title_successful_reset: i18n.creator_verify_reset_password(
      'h4_modal_title_successful_reset',
    ),
    input_placeholder_confirm_password: i18n.creator_verify_reset_password(
      'input_placeholder_confirm_password',
    ),
    input_placeholder_set_new_password: i18n.creator_verify_reset_password(
      'input_placeholder_set_new_password',
    ),
    p_confirm_new_password_format_reminder: i18n.creator_verify_reset_password(
      'p_confirm_new_password_format_reminder',
    ),
    p_content_reset_password: i18n.creator_verify_reset_password(
      'p_content_reset_password',
    ),
  };

  return {
    text,
  };
};

export const useCreatorCommonI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_common: (key: string) => t(`${I18N_NS_ENUM.creator_common}:${key}`),
  };

  const text = {
    navigation_button_give_feedback: i18n.creator_common(
      'navigation_button_give_feedback',
    ),
    navigation_side_label_back: i18n.creator_common(
      'navigation_side_label_back',
    ),
    navigation_side_menu_item_add_image_essence: i18n.creator_common(
      'navigation_side_menu_item_add_image_essence',
    ),
    navigation_side_menu_item_add_audio_essence: i18n.creator_common(
      'navigation_side_menu_item_add_audio_essence',
    ),
    navigation_side_menu_item_home: i18n.creator_common(
      'navigation_side_menu_item_home',
    ),
    navigation_side_menu_item_notification: i18n.creator_common(
      'navigation_side_menu_item_notification',
    ),
    navigation_side_menu_donation: i18n.creator_common(
      'navigation_side_menu_donation',
    ),
    top_navigation_button_account_setting: i18n.creator_common(
      'top_navigation_button_account_setting',
    ),
    navigation_side_menu_item_logout: i18n.creator_common(
      'navigation_side_menu_item_logout',
    ),
    p_audio_essence_type: i18n.creator_common('p_audio_essence_type'),
    p_delete_essence: i18n.creator_common('p_delete_essence'),
    p_draft_essence_list_status: i18n.creator_common(
      'p_draft_essence_list_status',
    ),
    p_image_essence_type: i18n.creator_common('p_image_essence_type'),
    p_invite_code_format_reminder: i18n.creator_common(
      'p_invite_code_format_reminder',
    ),
    p_minted_essence_list_status: i18n.creator_common(
      'p_minted_essence_list_status',
    ),
    p_created_essence_list_status: i18n.creator_common(
      'p_created_essence_list_status',
    ),
    p_verify_password_error: i18n.creator_common('p_verify_password_error'),
  };

  return {
    text,
  };
};

export const useCreatorHomeI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_home: (key: string) => t(`${I18N_NS_ENUM.creator_home}:${key}`),
  };

  const text = {
    button_at_top_table_to_add_creation: i18n.creator_home(
      'button_at_top_table_to_add_creation',
    ),
    input_at_top_table_to_search_placeholder: i18n.creator_home(
      'input_at_top_table_to_search_placeholder',
    ),
  };

  return {
    text,
  };
};

export const useCreatorCreateI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_create: (key: string) => t(`${I18N_NS_ENUM.creator_create}:${key}`),
  };

  const text = {
    button_add: i18n.creator_create('button_add'),
    button_add_essence: i18n.creator_create('button_add_essence'),
    button_cancel: i18n.creator_create('button_cancel'),
    button_clear_image_file: i18n.creator_create('button_clear_image_file'),
    button_clear_image_file: i18n.creator_create('button_clear_image_file'),
    button_discard: i18n.creator_create('button_discard'),
    button_draft: i18n.creator_create('button_draft'),
    button_list: i18n.creator_create('button_list'),
    // button_mint: i18n.creator_create('button_mint'),
    button_mint: 'Create',
    button_modal_cancel_confirm_password: i18n.creator_create(
      'button_modal_cancel_confirm_password',
    ),
    button_modal_confirm_confirm_password: i18n.creator_create(
      'button_modal_confirm_confirm_password',
    ),
    button_modal_go_back_to_home: i18n.creator_create(
      'button_modal_go_back_to_home',
    ),
    button_modal_redo: i18n.creator_create('button_modal_redo'),
    button_next_step: i18n.creator_create('button_next_step'),
    h3_audio_essence: i18n.creator_create('h3_audio_essence'),
    h3_image_essence: i18n.creator_create('h3_image_essence'),
    h3_modal_title_add_essence: i18n.creator_create(
      'h3_modal_title_add_essence',
    ),
    h3_start_to_create: i18n.creator_create('h3_start_to_create'),
    h3_step_one_to_create: i18n.creator_create('h3_step_one_to_create'),
    h3_step_two_to_create_audios: i18n.creator_create(
      'h3_step_two_to_create_audios',
    ),
    h3_step_two_to_create_images: i18n.creator_create(
      'h3_step_two_to_create_images',
    ),
    h4_creation_types: i18n.creator_create('h4_creation_types'),
    h4_claim_time: i18n.creator_create('h4_claim_time'),
    h4_description: i18n.creator_create('h4_description'),
    h4_licence: i18n.creator_create('h4_licence'),
    h4_edition_time: i18n.creator_create('h4_edition_time'),
    h4_edition: i18n.creator_create('h4_edition'),
    h4_edit_audio_essence: i18n.creator_create('h4_edit_audio_essence'),
    h4_end_time: i18n.creator_create('h4_end_time'),
    h4_episode: i18n.creator_create('h4_episode'),
    h4_episode_name: i18n.creator_create('h4_episode_name'),
    h4_podcast: i18n.creator_create('h4_podcast'),
    h4_creator: i18n.creator_create('h4_creator'),
    h4_type: i18n.creator_create('h4_type'),
    h4_hosting_platform: i18n.creator_create('h4_hosting_platform'),
    h4_limited_edition: i18n.creator_create('h4_limited_edition'),
    h4_listing_period: i18n.creator_create('h4_listing_period'),
    h4_modal_description: i18n.creator_create('h4_modal_description'),
    h4_modal_description_draft_fail: i18n.creator_create(
      'h4_modal_description_draft_fail',
    ),
    h4_modal_description_draft_success: i18n.creator_create(
      'h4_modal_description_draft_success',
    ),
    h4_modal_description_issue_fail: i18n.creator_create(
      'h4_modal_description_issue_fail',
    ),
    h4_modal_description_issue_success: i18n.creator_create(
      'h4_modal_description_issue_success',
    ),
    h4_modal_description_mint_success: i18n.creator_create(
      'h4_modal_description_mint_success',
    ),
    h4_modal_essence_name: i18n.creator_create('h4_modal_essence_name'),
    h4_modal_list_price: i18n.creator_create('h4_modal_list_price'),
    h4_modal_list_type: i18n.creator_create('h4_modal_list_type'),
    h4_modal_quantity_of_essence: i18n.creator_create(
      'h4_modal_quantity_of_essence',
    ),
    h4_modal_select_audio_essence: i18n.creator_create(
      'h4_modal_select_audio_essence',
    ),
    h4_modal_title_confirm_password: i18n.creator_create(
      'h4_modal_title_confirm_password',
    ),
    h4_preview_image: i18n.creator_create('h4_preview_image'),
    h4_quantity_of_creations: i18n.creator_create('h4_quantity_of_creations'),
    h4_sale_options: i18n.creator_create('h4_sale_options'),
    h4_start_time: i18n.creator_create('h4_start_time'),
    h4_transactions: i18n.creator_create('h4_transactions'),
    h4_copy_room_link: i18n.creator_create('h4_copy_room_link'),
    h4_upload_image: i18n.creator_create('h4_upload_image'),
    h4_marketplace_link: i18n.creator_create('h4_marketplace_link'),
    h6_essence_collect_value: i18n.creator_create('h6_essence_collect_value'),
    h6_essence_design_purpose: i18n.creator_create('h6_essence_design_purpose'),
    h6_essence_issue_method: i18n.creator_create('h6_essence_issue_method'),
    input_essence_description_assistant_text: i18n.creator_create(
      'input_essence_description_assistant_text',
    ),
    input_image_file_assistant_text: i18n.creator_create(
      'input_image_file_assistant_text',
    ),
    input_essence_name_assistant_text: i18n.creator_create(
      'input_essence_name_assistant_text',
    ),
    input_edition_number_assistive_text: i18n.creator_create(
      'input_edition_number_assistive_text',
    ),
    input_list_price_assistive_text: i18n.creator_create(
      'input_list_price_assistive_text',
    ),
    input_placeholder_select_an_episode: i18n.creator_create(
      'input_placeholder_select_an_episode',
    ),
    option_audio_essence_type: i18n.creator_create('option_audio_essence_type'),
    option_image_essence_type: i18n.creator_create('option_image_essence_type'),
    p_audio_essence_collect_value: i18n.creator_create(
      'p_audio_essence_collect_value',
    ),
    p_audio_essence_issue_method: i18n.creator_create(
      'p_audio_essence_issue_method',
    ),
    p_essence_design_purpose: i18n.creator_create('p_essence_design_purpose'),
    p_image_essence_collect_value: i18n.creator_create(
      'p_image_essence_collect_value',
    ),
    p_image_essence_issue_method: i18n.creator_create(
      'p_image_essence_issue_method',
    ),
    placeholder_select_creation_types: i18n.creator_create(
      'placeholder_select_creation_types',
    ),
    p_the_source_of_quantity_for_essence: i18n.creator_create(
      'p_the_source_of_quantity_for_essence',
    ),
    select_podcast_episode_assistive_text: i18n.creator_create(
      'select_podcast_episode_assistive_text',
    ),
    h4_view_original: i18n.creator_create('h4_view_original'),
  };

  return {
    text,
  };
};

export const useCreatorTableI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    creator_table: (key: string) => t(`${I18N_NS_ENUM.creator_table}:${key}`),
  };

  const text = {
    table_header_creation_name: i18n.creator_table(
      'table_header_creation_name',
    ),
    table_header_creation_type: i18n.creator_table(
      'table_header_creation_type',
    ),
    table_header_edition_quantity: i18n.creator_table(
      'table_header_edition_quantity',
    ),
    table_header_end_time: i18n.creator_table('table_header_end_time'),
    table_header_essence_name: i18n.creator_table('table_header_essence_name'),
    table_header_hosting_platform: i18n.creator_table(
      'table_header_hosting_platform',
    ),
    table_header_list_price: i18n.creator_table('table_header_list_price'),
    table_header_more_operations: i18n.creator_table(
      'table_header_more_operations',
    ),
    table_header_order: i18n.creator_table('table_header_order'),
    table_header_start_time: i18n.creator_table('table_header_start_time'),
    table_header_status: i18n.creator_table('table_header_status'),
    table_operation_delete: i18n.creator_table('table_operation_delete'),
    table_operation_edit: i18n.creator_table('table_operation_edit'),
  };

  return {
    text,
  };
};

export const useVerifyRoleI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    collector_verify_role: (key: string) =>
      t(`${I18N_NS_ENUM.collector_verify_role}:${key}`),
  };

  const text = {
    a_re_verify: i18n.collector_verify_role('a_re_verify'),
    button_back_to_discord: i18n.collector_verify_role(
      'button_back_to_discord',
    ),
    button_learn_how_to_complete_verification_conditions:
      i18n.collector_verify_role(
        'button_learn_how_to_complete_verification_conditions',
      ),
    button_nominate_podcasters: i18n.collector_verify_role(
      'button_nominate_podcasters',
    ),
    text_duplicated_verify_quest: i18n.collector_verify_role(
      'text_duplicated_verify_quest',
    ),
    text_duplicated_verify_reason: i18n.collector_verify_role(
      'text_duplicated_verify_reason',
    ),
    text_failed_to_verify_message: i18n.collector_verify_role(
      'text_failed_to_verify_message',
    ),
    text_follow_mindtrix_twitter: i18n.collector_verify_role(
      'text_follow_mindtrix_twitter',
    ),
    text_follow_the_steps_to_re_verify: i18n.collector_verify_role(
      'text_follow_the_steps_to_re_verify',
    ),
    text_invite: i18n.collector_verify_role('text_invite'),
    text_invited_three_friends_in_discord: i18n.collector_verify_role(
      'text_invited_three_friends_in_discord',
    ),
    text_modal_content_back_to_discord: i18n.collector_verify_role(
      'text_modal_content_back_to_discord',
    ),
    text_modal_content_learn_how_to_complete_verification_conditions:
      i18n.collector_verify_role(
        'text_modal_content_learn_how_to_complete_verification_conditions',
      ),
    text_modal_content_nominate_podcasters: i18n.collector_verify_role(
      'text_modal_content_nominate_podcasters',
    ),
    text_modal_content_successfully_connect_wallet: i18n.collector_verify_role(
      'text_modal_content_successfully_connect_wallet',
    ),
    text_sign_in_your_twitter: i18n.collector_verify_role(
      'text_sign_in_your_twitter',
    ),
    text_sign_out_current_twitter: i18n.collector_verify_role(
      'text_sign_out_current_twitter',
    ),
    text_successful_verified_message: i18n.collector_verify_role(
      'text_successful_verified_message',
    ),
    text_reenter_mindtrix_discord_to_re_verify: i18n.collector_verify_role(
      'text_reenter_mindtrix_discord_to_re_verify',
    ),
    text_retweet_mindtrix_pinned_post_on_twitter: i18n.collector_verify_role(
      'text_retweet_mindtrix_pinned_post_on_twitter',
    ),
    text_verifying: i18n.collector_verify_role('text_verifying'),
    text_verification_expired: i18n.collector_verify_role(
      'text_verification_expired',
    ),
    text_what_is_blocto_wallet: i18n.collector_verify_role(
      'text_what_is_blocto_wallet',
    ),
  };

  return {
    text,
  };
};

export const useDonationCommonI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) => t(`${I18N_NS_ENUM.creator_donation_common}:${key}`),
  };

  const text = {
    button_income_feedback: i18n.t('button_income_feedback'),
    button_settings: i18n.t('button_settings'),
    title_donation: i18n.t('title_donation'),
  };

  return {
    text,
  };
};

export const useDonationSettingI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) => t(`${I18N_NS_ENUM.creator_donation_settings}:${key}`),
  };

  const text = {
    assistive_text_donation_link: i18n.t('assistive_text_donation_link'),
    assistive_text_donation_money: i18n.t('assistive_text_donation_money'),
    assistive_text_donation_update_time: i18n.t(
      'assistive_text_donation_update_time',
    ),
    text_donation_money_error: i18n.t('text_donation_money_error'),
    button_money_cancel: i18n.t('button_money_cancel'),
    button_money_ok: i18n.t('button_money_ok'),
    input_text_default: i18n.t('input_text_default'),
    input_text_donation_link: i18n.t('input_text_donation_link'),
    label_donation_link: i18n.t('label_donation_link'),
    label_donation_money: i18n.t('label_donation_money'),
    label_enable: i18n.t('label_enable'),
    label_unit_change: i18n.t('label_unit_change'),
    popup_message_copy: i18n.t('popup_message_copy'),
  };

  return {
    text,
  };
};

export const useDonationIncomeI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) => t(`${I18N_NS_ENUM.creator_donation_income}:${key}`),
  };

  const text = {
    label_donation_people: i18n.t('label_donation_people'),
    label_income_count: i18n.t('label_income_count'),
    label_people_count: i18n.t('label_people_count'),
    label_total_income: i18n.t('label_total_income'),
    label_total_platform_cut: i18n.t('label_total_platform_cut'),
    label_total_creator_cut: i18n.t('label_total_creator_cut'),
    label_unit_change: i18n.t('label_unit_change'),
    row_label_episode: i18n.t('row_label_episode'),
    row_label_message: i18n.t('row_label_message'),
    row_label_money: i18n.t('row_label_money'),
    row_label_name: i18n.t('row_label_name'),
    row_label_time: i18n.t('row_label_time'),
    table_title_episode: i18n.t('table_title_episode'),
    table_title_message: i18n.t('table_title_message'),
    table_title_money: i18n.t('table_title_money'),
    table_title_name: i18n.t('table_title_name'),
    table_title_time: i18n.t('table_title_time'),
    table_title_transaction: i18n.t('table_title_transaction'),
  };

  return {
    text,
  };
};

export const useDonationPayPreviewI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) =>
      t(`${I18N_NS_ENUM.collector_donation_pay_preview}:${key}`),
  };

  const text = {
    button_donation_default: i18n.t('button_donation_default'),
    button_donation_selected: i18n.t('button_donation_selected'),
    input_placeholder_select_reward: i18n.t('input_placeholder_select_reward'),
    label_unsync_episodes: i18n.t('label_unsync_episodes'),
    label_copyright: i18n.t('label_copyright'),
    label_description: i18n.t('label_description'),
    label_disabled_donation: i18n.t('label_disabled_donation'),
    label_question1: i18n.t('label_question1'),
    label_question1_answer: i18n.t('label_question1_answer'),
    label_question2: i18n.t('label_question2'),
    label_question2_answer: i18n.t('label_question2_answer'),
    label_question3: i18n.t('label_question3'),
    label_question3_answer: i18n.t('label_question3_answer'),
    label_question4: i18n.t('label_question4'),
    label_question4_answer: i18n.t('label_question4_answer'),
    label_question4_answer_faq: i18n.t('label_question4_answer_faq'),
    label_question4_answer_customer_service: i18n.t(
      'label_question4_answer_customer_service',
    ),
    label_unit_change: i18n.t('label_unit_change'),
    title_donation: i18n.t('title_donation'),
    title_podcast: i18n.t('title_podcast'),
    title_qa: i18n.t('title_qa'),
  };

  return {
    text,
  };
};

export const useDonationPayCheckoutI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) =>
      t(`${I18N_NS_ENUM.collector_donation_pay_checkout}:${key}`),
  };

  const text = {
    button_buy_flow: i18n.t('button_buy_flow'),
    button_cancel: i18n.t('button_cancel'),
    button_refresh_balance: i18n.t('button_refresh_balance'),
    button_pay: i18n.t('button_pay'),
    label_donation_price: i18n.t('label_donation_price'),
    label_donation_price_detail: i18n.t('label_donation_price_detail'),
    label_donation_reward: i18n.t('label_donation_reward'),
    label_donation_reward_detail: i18n.t('label_donation_reward_detail'),
    label_not_enough_money: i18n.t('label_not_enough_money'),
    label_unit_change: i18n.t('label_unit_change'),
    label_wallet_address: i18n.t('label_wallet_address'),
    label_wallet_money: i18n.t('label_wallet_money'),
    label_wallet_money_detail: i18n.t('label_wallet_money_detail'),
    title_checkout: i18n.t('title_checkout'),
    title_my_wallet: i18n.t('title_my_wallet'),
    title_detail: i18n.t('title_detail'),
    title_message_optional: i18n.t('title_message_optional'),
    title_name_optional: i18n.t('title_name_optional'),
  };

  return {
    text,
  };
};

export const useDonationPaySuccessI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) =>
      t(`${I18N_NS_ENUM.collector_donation_pay_success}:${key}`),
  };

  const text = {
    button_donate_more: i18n.t('button_donate_more'),
    button_share: i18n.t('button_share'),
    button_view_essence: i18n.t('button_view_essence'),
    label_copyright: i18n.t('label_copyright'),
    label_creation_description: i18n.t('label_creation_description'),
    title_donation_success: i18n.t('title_donation_success'),
    title_shared_way: i18n.t('title_shared_way'),
  };

  return {
    text,
  };
};

export const useCreationCommonI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) => t(`${I18N_NS_ENUM.marketplace_common}:${key}`),
  };

  const text = {
    button_filter: i18n.t('button_filter'),
    card_creation_edition_count: i18n.t('card_creation_edition_count'),
    card_podcast_restcreation: i18n.t('card_podcast_restcreation'),
    card_podcast_totalcreation: i18n.t('card_podcast_totalcreation'),
    label_successful_copy_link: i18n.t('label_successful_copy_link'),
    navigation_button_account_default: i18n.t(
      'navigation_button_account_default',
    ),
    navigation_button_account_login: i18n.t('navigation_button_account_login'),
    searchbar_text_default: i18n.t('searchbar_text_default'),
  };

  return {
    text,
  };
};

export const useCreationDetailI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) => t(`${I18N_NS_ENUM.marketplace_creation_detail}:${key}`),
  };

  const text = {
    button_buy: i18n.t('button_buy'),
    button_buy_another: i18n.t('button_buy_another'),
    button_buy_expired: i18n.t('button_buy_expired'),
    button_buy_soldout: i18n.t('button_buy_soldout'),
    button_freeclaim: i18n.t('button_freeclaim'),
    room_identity_owner: i18n.t('room_identity_owner'),
    room_identity_visitor: i18n.t('room_identity_visitor'),
  };

  return {
    text,
  };
};

export const useMarketplaceBuyingI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) => t(`${I18N_NS_ENUM.marketplace_buying}:${key}`),
  };

  const text = {
    button_buy: i18n.t('button_buy'),
    button_claimed: i18n.t('button_claimed'),
    button_coming_soon: i18n.t('button_coming_soon'),
    button_connect_wallet_to_claim: i18n.t('button_connect_wallet_to_claim'),
    button_expired: i18n.t('button_expired'),
    button_free_claim: i18n.t('button_free_claim'),
    button_join_event: i18n.t('button_join_event'),
    button_sold_out: i18n.t('button_sold_out'),
    dialog_buyanother_button1: i18n.t('dialog_buyanother_button1'),
    dialog_buyanother_button2: i18n.t('dialog_buyanother_button2'),
    dialog_buyanother_title: i18n.t('dialog_buyanother_title'),
    dialog_buying_button: i18n.t('dialog_buying_button'),
    dialog_buying_title: i18n.t('dialog_buying_title'),
    dialog_buying_unitchange: i18n.t('dialog_buying_unitchange'),
    dialog_success_button_ok: i18n.t('dialog_success_button_ok'),
    dialog_success_label_creation: i18n.t('dialog_success_label_creation'),
    dialog_success_label_episode: i18n.t('dialog_success_label_episode'),
    dialog_success_label_podcast: i18n.t('dialog_success_label_podcast'),
    dialog_unlogin_button: i18n.t('dialog_unlogin_button'),
    dialog_unlogin_title: i18n.t('dialog_unlogin_title'),
    label_success_title: i18n.t('label_success_title'),
    label_fail_title: i18n.t('label_fail_title'),
  };

  return {
    text,
  };
};

export const useCampaignRecordAnswersI18n = () => {
  const { t } = useTranslation();
  const i18n = {
    t: (key: string) => t(`${I18N_NS_ENUM.campaign_record_answers}:${key}`),
  };

  const text = {
    recorded_h2_your_turn: i18n.t('recorded_h2_your_turn'),
    recorded_button_copy_link: i18n.t('recorded_button_copy_link'),
    recorded_button_participate_the_event: i18n.t(
      'recorded_button_participate_the_event',
    ),
    recorded_h4_voice_trait: i18n.t('recorded_h4_voice_trait'),
    recording_h4_event_question: i18n.t('recording_h4_event_question'),
    recording_h4_record_owner: i18n.t('recording_h4_record_owner'),
    recording_h4_record_serial_number: i18n.t(
      'recording_h4_record_serial_number',
    ),
    recording_h4_click_warning: i18n.t('recording_h4_click_warning'),
    recording_h4_notice: i18n.t('recording_h4_notice'),
    recording_h2_share_your_answer: i18n.t('recording_h2_share_your_answer'),
    recording_button_record_again: i18n.t('recording_button_record_again'),
    recording_circle_button_record: i18n.t('recording_circle_button_record'),
    recording_circle_button_stop: i18n.t('recording_circle_button_stop'),
    recording_button_upload_file: i18n.t('recording_button_upload_file'),
    recording_h2_event_reward: i18n.t('recording_h2_event_reward'),
    recording_h2_question: i18n.t('recording_h2_question'),
    recording_h2_your_answer: i18n.t('recording_h2_your_answer'),
    recording_modal_h3_copy_link_succeed: i18n.t(
      'recording_modal_h3_copy_link_succeed',
    ),
    recording_modal_h3_upload_audio_succeed: i18n.t(
      'recording_modal_h3_upload_audio_succeed',
    ),
    recording_modal_h3_upload_audio_failed: i18n.t(
      'recording_modal_h3_upload_audio_failed',
    ),
    recording_modal_h3_duplicate_minting: i18n.t(
      'recording_modal_h3_duplicate_minting',
    ),
    recording_uploading_transaction_step_1: i18n.t(
      'recording_uploading_transaction_step_1',
    ),
    recording_uploading_transaction_step_2: i18n.t(
      'recording_uploading_transaction_step_2',
    ),
    recording_input_sharing_message: i18n.t('recording_input_sharing_message'),
    recording_h3_connect_wallet_reminder: i18n.t(
      'recording_h3_connect_wallet_reminder',
    ),
    recording_modal_description_countdown_start: i18n.t(
      'recording_modal_description_countdown_start',
    ),
    seo_description: i18n.t('seo_description'),
    seo_title: i18n.t('seo_title'),
    step1_h0_description: i18n.t('step1_h0_description'),
    step1_h1_title: i18n.t('step1_h1_title'),
    step1_h3_description: i18n.t('step1_h3_description'),
    step1_h3_terms: i18n.t('step1_h3_terms'),
    step1_h3_privacy_policy: i18n.t('step1_h3_privacy_policy'),
    step2_h1_title: i18n.t('step2_h1_title'),
    step2_h3_description: i18n.t('step2_h3_description'),
    step3_button_start_recording: i18n.t('step3_button_start_recording'),
    step3_button_coming_soon: i18n.t('step3_button_coming_soon'),
    step3_button_connect_wallet: i18n.t('step3_button_connect_wallet'),
    step3_h1_title: i18n.t('step3_h1_title'),
    step3_h3_description: i18n.t('step3_h3_description'),
  };

  return {
    text,
  };
};
