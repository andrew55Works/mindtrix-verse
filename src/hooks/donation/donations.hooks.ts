import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  DonationVo,
  GetDonationByIdRes,
  GetDonationsRes,
} from '../../api/types/donation.types';
import {
  GQL_GET_DONATION_BY_DONATION_ID,
  GQL_GET_DONATIONS_BY_CREATOR_ID,
} from '../../api/graphql/donation.graphql';
import { useSelector } from 'react-redux';
import {
  selectCreatorEpisodeObjByDefault,
  selectCreatorProfile,
} from '../../redux/creator/creator.selector';
import { DonationIncome } from '../../types/donation.type';
import { _get } from '../../utils/lodash.utils';

export const useGetDonationsByCreatorId = () => {
  const creator = useSelector(selectCreatorProfile);
  const creator_id = creator?._id ?? '';
  const episodeObj = useSelector(selectCreatorEpisodeObjByDefault);
  const [donations, setDonations] = useState<Array<DonationVo>>([]);
  const [donationIncomes, setDonationIncomes] = useState<Array<DonationIncome>>(
    [],
  );
  const { refetch: getDonationsByCreatorId } = useQuery<GetDonationsRes>(
    GQL_GET_DONATIONS_BY_CREATOR_ID,
    {
      skip: true,
    },
  );

  useEffect(() => {
    const fetch = async () => {
      const donationRes = await getDonationsByCreatorId({ creator_id });
      const donationError = donationRes?.error ?? null;
      const donationsTmp = donationRes?.data?.findDonationsByCreatorId ?? [];
      const isSuccess = !donationError && donationsTmp;
      if (isSuccess) {
        const donationIncomesTmp: Array<DonationIncome> = donationsTmp
          ?.map((d: DonationVo) => {
            const donate_price = _get(d, ['prices', '0', 'price'], 0) as number;
            const episode_guid = d?.episode_guid ?? '';
            return {
              amount: donate_price,
              name: d?.donor_name ?? '',
              create_date_time: new Date(
                d?.create_date_time ?? new Date(),
              ).getTime(),
              episode_name: _get(
                episodeObj,
                [episode_guid, 'name'],
                '',
              ) as string,
              message: d?.donor_message ?? '',
              show_guid: d?.show_guid ?? '',
              episode_guid,
              transaction_hash: d?.transaction_address ?? '',
              royalties: d?.royalties ?? [],
            };
          })
          ?.sort(
            (d1, d2) =>
              (d2?.create_date_time ?? new Date(Date.now()).getTime()) -
              (d1?.create_date_time ?? new Date(Date.now()).getTime()),
          );
        setDonations(donationsTmp);
        setDonationIncomes(donationIncomesTmp);
      }
    };
    fetch();
  }, []);

  return { donations, donationIncomes };
};

export const useGetDonationByDonationId = () => {
  const { refetch: getDonationByDonationId } = useQuery<GetDonationByIdRes>(
    GQL_GET_DONATION_BY_DONATION_ID,
    {
      skip: true,
    },
  );

  const getDonationByDonationIdApi = async (
    donation_id: string,
  ): Promise<{ data: DonationVo | null; isSuccess: boolean }> => {
    // 開啟 Modal 才會觸發獲取流程
    if (!donation_id) return { isSuccess: false, data: null };
    const donationRes = await getDonationByDonationId({
      donation_id,
    });
    const data = (donationRes.data?.findDonationByDonationId ??
      null) as DonationVo;
    const error = donationRes?.error ?? null;
    const isSuccess = !error && !data;
    return {
      isSuccess,
      data,
    };
  };

  return { getDonationByDonationIdApi };
};
