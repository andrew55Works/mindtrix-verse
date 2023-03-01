import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GQL_FIND_ONE_CAMPAIGN_BY_CAMPAIGN_CODE } from '../../api/graphql/campaign';
import {
  Campaign,
  CampaignByCampaignCode,
  defaultCampaign,
} from '../../api/types/campaign.types';

export const useCampaign = (campaignCode: string) => {
  const [campaign, setCampaign] = useState<Campaign>(defaultCampaign);
  const { refetch: getCampaignByCode } = useQuery<CampaignByCampaignCode>(
    GQL_FIND_ONE_CAMPAIGN_BY_CAMPAIGN_CODE,
    {
      skip: true,
      onError: (error) => {
        console.error('confirmPassword error:', error);
      },
    },
  );

  useEffect(() => {
    if (!campaignCode) return;
    const fetch = async () => {
      const variables = {
        dto: {
          code: campaignCode,
          description: '',
          name: '',
        },
      };
      const res = await getCampaignByCode(variables);
      const error = res?.error ?? null;
      const data = res?.data?.findCampaign ?? null;
      setCampaign(data);
    };
    fetch();
  }, [campaignCode]);

  return {
    campaign,
  };
};
