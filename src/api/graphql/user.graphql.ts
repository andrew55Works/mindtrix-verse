import { gql } from '@apollo/client';

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
      ... on NftMint {
        transactionId
        status
        statusCode
        errorMessage
      }
      ... on UserVo {
        _id
        email
        child_wallet_account {
          address
          keypair {
            publicKey
          }
        }
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
