import { getFrontendMindtrixWebDomain } from './config.web.utils';

const frontendMindtrixWebDomain = getFrontendMindtrixWebDomain();
export const PAGE_URL = {
  creators_account: '/account',
  creators_login: '/login',
  creators_logout: '/logout',
  creators_create: '/create',
  creators_create_audio_essence: '/create/audio-essence',
  creators_create_image_essence: '/create/image-essence',
  creators_monetization_donation_setting: '/monetization/donation/setting',
  creators_monetization_donation_income: '/monetization/donation/income',
  creators_verify_password: '/verify/creator/password',
  creators_reset_password: '/verify/creator/reset-password',
  creators_revenue_essence: '/revenue/essence',
  creators_home: '/home',
  creators_register: '/register',
  collectors_campaign_voice_to_run_guideline: {
    name: 'voice-to-run-guideline',
    path: '/voice-to-run/guideline',
    fullPath: `${frontendMindtrixWebDomain}/voice-to-run/guideline`,
  },
  collectors_campaign_voice_to_run_record: {
    name: 'voice-to-run-record',
    path: '/voice-to-run/record',
    fullPath: `${frontendMindtrixWebDomain}/zh/voice-to-run/record`,
  },
  collectors_donate: {
    name: 'donate',
    path: '/donate',
    fullPath: `${frontendMindtrixWebDomain}/donate`,
  },
  collectors_marketplace: {
    name: 'marketplace',
    path: '/marketplace',
    fullPath: `${frontendMindtrixWebDomain}/marketplace`,
  },
  collectors_verify_discord_roles: '/verify/discord/role',
  collectors_my: {
    name: 'Collection',
    path: '/room',
    fullPath: `${frontendMindtrixWebDomain}/room`,
  },
  creator_essence: (essenceId: string, essenceName: string) =>
    `/essence/${essenceId}--${essenceName}`,
  creator_show: (showId: string, showName: string) =>
    `/show/${showId}--${showName}`,
  org_register: '/org-register',
};
