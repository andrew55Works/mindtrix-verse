import { gql } from '@apollo/client';

export const GQL_VERIFY_INVITATION_CODE = gql`
  query verifyInvitationCode($invitation_code: String!, $rss_link: String!) {
    verifyInvitationCode(
      invitation_code: $invitation_code
      rss_link: $rss_link
    ) {
      _id
      is_qualified
      is_used
      verification_hash
    }
  }
`;
