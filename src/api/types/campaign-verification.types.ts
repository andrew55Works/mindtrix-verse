export interface PostUpdateWalletAddressOfCollectorRes {
  updateWalletAddressOfCollector: {
    discord_id: string;
    is_qualified: boolean;
    twitter_screen_name: string;
    update_date_time: Date;
    user_id: string;
    user_name: string;
    wallet_address: string;
  };
}
