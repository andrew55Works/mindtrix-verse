import { RoyaltyVo } from '../api/types/fcl.types';
import { RoyaltyDonationVo } from '../api/types/donation.types';

export const getRoyaltyDictionary = (
  creatorAddress: string,
): Array<RoyaltyVo> => [
  {
    recipientAddress: creatorAddress,
    cut: '0.1',
    description: 'Creator 10% royalty from secondary sales.',
  },
];

export const getDonationRoyaltyDictionary = (
  creatorAddress: string,
): Array<RoyaltyDonationVo> => [
  {
    address: creatorAddress,
    cut: 0.1,
    description: 'Mindtrix 5% royalty from secondary sales.',
  },
];
