export interface TwitterUserProfile {
  entities: any;
  name: string;
  profile_image_url_https: string;
  status: {
    text: string;
  };
}
export interface DiscordUserProfile {
  accent_color?: any;
  avatar: string;
  avatar_decoration?: any;
  banner?: any;
  banner_color?: any;
  discriminator: string;
  id: string;
  public_flags: number;
  username: string;
}

export interface GetTwitterFriendshipsRes {
  isFollowingMindtrix: boolean;
}

export interface PostTwitterTweetInteractionRes {
  connectedWalletAddress: string;
  discordProfile: DiscordUserProfile;
  error: {
    message: string;
    status?: number;
    statusCode: number;
  };
  invitedFriendsInDiscord: number;
  isConnectedWallet: boolean;
  isFollowingMindtrix: boolean;
  isRetweeted: boolean;
  isVerifiedInvitedFriendsInDiscord: boolean;
  twitterProfile: TwitterUserProfile;
}
export interface PostTwitterTweetInteractionBody {
  discord_user_id: string;
}
