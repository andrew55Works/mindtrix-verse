export interface RtkRes<T> {
  data: T;
}

export interface OauthRequestTokenRes {
  oauth_token: string;
}

export interface LogoutTwitterRes {
  success: boolean;
}

export interface ClientAccessTokenBody {
  oauth_token: string;
  oauth_verifier: string;
}
