import { gql } from '@apollo/client';

export const GQL_VERIFY_CADENCE_AND_GET_SERVER_SIGN = gql`
  mutation verifyCadenceAndGetChildAccountSign(
    $parent_email: String!
    $signed_payload: String!
    $cadence_dir_and_name: String!
  ) {
    verifyCadenceAndGetChildAccountSign(
      parent_email: $parent_email
      signed_payload: $signed_payload
      cadence_dir_and_name: $cadence_dir_and_name
    ) {
      signature
      message
      isQualified
    }
  }
`;
