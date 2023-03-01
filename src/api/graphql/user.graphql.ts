import { gql } from '@apollo/client';

export const GQL_GET_EMAIL_FROM_RSS_LINK = gql`
  query getPodCasterInfoByParsingRss($rssLink: String!) {
    getPodCasterInfoByParsingRss(rssLink: $rssLink) {
      name
      category
      content_type
      description
      update_date_time
      creator_name
      create_date_time
      email
      published_date_time
      rss_generator
      show_guid
      images {
        small {
          height
          width
          url
        }
        medium {
          height
          width
          url
        }
        large {
          height
          width
          url
        }
      }
    }
  }
`;

export const GQL_GET_USERS = gql`
  query {
    users {
      _id
      name
      shows
    }
  }
`;

export const GQL_UPDATE_FCM_TOKEN = gql`
  mutation updateUserFCMToken($_id: String!, $fcmToken: String!) {
    updateUserFCMToken(_id: $_id, fcmToken: $fcmToken) {
      name
      device_info {
        firebase_messaging_token
      }
    }
  }
`;

export const GQL_GET_USER_BY_WALLET_ADDRESS = gql`
  query findUserByWalletAddress($walletAddress: String!) {
    findUserByWalletAddress(walletAddress: $walletAddress) {
      _id
      name
      email
      role
      issue_start_date
      issue_end_date
      rss_link
      show_guids
      wallet {
        blocto {
          address
          email
          cid
          balance {
            flow
            fusd
            usdc
          }
        }
      }
      images {
        small {
          height
          width
          url
        }
        medium {
          height
          width
          url
        }
        large {
          height
          width
          url
        }
      }
      child_wallet_account {
        address
        keypair {
          publicKey
          privateKey
        }
      }
    }
  }
`;

export const GQL_GET_SIGN_IN_NONCE = gql`
  query getSignInNonce {
    getSignInNonce {
      nonce
    }
  }
`;

export const GQL_CREATE_USER = gql`
  mutation createUser($dto: CreateUserDto!) {
    createUser(dto: $dto) {
      _id
      name
      email
      rss_link
      role
      wallet {
        blocto {
          address
          email
          cid
          balance {
            flow
            fusd
            usdc
          }
        }
      }
      images {
        small {
          height
          width
          url
        }
        medium {
          height
          width
          url
        }
        large {
          height
          width
          url
        }
      }
    }
  }
`;

export const GQL_GET_CONFIRM_PASSWORD = gql`
  query confirmPassword(
    $password: String!
    $user_id: String!
    $wallet_address: String!
  ) {
    confirmPassword(
      password: $password
      user_id: $user_id
      wallet_address: $wallet_address
    ) {
      _id
      isPassed
    }
  }
`;

export const GQL_UPDATE_CREATOR_PASSWORD = gql`
  mutation updateUserPassword(
    $password: String!
    $user_id: String!
    $wallet_address: String!
  ) {
    updateUserPassword(
      password: $password
      user_id: $user_id
      wallet_address: $wallet_address
    ) {
      _id
      update_date_time
    }
  }
`;

export const GQL_GET_CREATOR_WALLET_ADDRESS_BY_CREATOR_ID = gql`
  query findCreatorWalletAddressByCreatorId($creator_id: String!) {
    findCreatorWalletAddressByCreatorId(creator_id: $creator_id) {
      _id
      address
      name
    }
  }
`;

export const GQL_CREATE_SSO_USER_AND_BIND_CHILD_WALLET_ACCOUNT = gql`
  mutation createSsoUserAndBindChildWalletAccountFromMindtrix(
    $dto: CreateUserDto!
  ) {
    createSsoUserAndBindChildWalletAccountFromMindtrix(dto: $dto) {
      transactionId
      status
      statusCode
      errorMessage
    }
  }
`;

export const GQL_FIND_USER_CHILD_ADDRESS_BY_EMAIL = gql`
  query findUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      email
      child_wallet_account {
        address
      }
    }
  }
`;

export const GQL_FIND_CHILD_ACCOUNT_BY_EMAIL = gql`
  query findChildAccountByEmail($email: String!) {
    findChildAccountByEmail(email: $email) {
      _id
      name
      email
      role
      issue_start_date
      issue_end_date
      rss_link
      show_guids
      wallet {
        blocto {
          address
          email
          cid
          balance {
            flow
            fusd
            usdc
          }
        }
      }
      images {
        small {
          height
          width
          url
        }
        medium {
          height
          width
          url
        }
        large {
          height
          width
          url
        }
      }
      child_wallet_account {
        address
        keypair {
          publicKey
        }
      }
    }
  }
`;
