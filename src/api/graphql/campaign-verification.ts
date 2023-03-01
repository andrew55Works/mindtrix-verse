import { gql } from '@apollo/client';

export const GQL_UPDATE_WALLET_ADDRESS = gql`
  mutation updateWalletAddressOfCollector(
    $discord_id: String!
    $wallet_address: String!
  ) {
    updateWalletAddressOfCollector(
      discord_id: $discord_id
      wallet_address: $wallet_address
    ) {
      is_qualified
      discord_id
      wallet_address
      twitter_screen_name
      user_name
      user_id
      update_date_time
    }
  }
`;
