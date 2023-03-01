import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GQL_FIND_ONE_CAMPAIGN_PARTICIPANT_BY_CANPAIGN_CODE_AND_WALLET_ADDRESS } from '../../api/graphql/campaign-participant';
import {
  CampaignParticipant,
  CampaignParticipantByCampaignCodeAndWalletAddressRes,
} from '../../api/types/campaign-participant.types';

export const useFetchRecordByCampaignCodeAndWalletAddress = (
  campaign_code: string,
  participant_wallet_address: string,
) => {
  const [record, setRecord] = useState<CampaignParticipant | null>(null);
  const { refetch: getRecordByCampaignCodeAndWalletAddress } =
    useQuery<CampaignParticipantByCampaignCodeAndWalletAddressRes>(
      GQL_FIND_ONE_CAMPAIGN_PARTICIPANT_BY_CANPAIGN_CODE_AND_WALLET_ADDRESS,
      {
        skip: true,
      },
    );
  useEffect(() => {
    const fetch = async () => {
      if (!participant_wallet_address || !campaign_code) return;
      const res = await getRecordByCampaignCodeAndWalletAddress({
        dto: {
          campaign_code,
          participant_wallet_address,
        },
      });
      const data =
        res?.data?.findOneCampaignParticipantByCampaignCodeAndWalletAddress ??
        null;
      const error = res?.error ?? null;
      const isSuccess = !error && !!data;
      if (isSuccess) {
        setRecord(data);
      }
    };

    fetch();
  }, [participant_wallet_address, campaign_code]);
  return {
    record,
    setRecord,
  };
};
