export interface VerifyInvitationCodeRes {
  verifyInvitationCode: {
    _id: string;
    is_qualified: boolean;
    is_used: boolean;
    verification_hash: string;
  };
}
