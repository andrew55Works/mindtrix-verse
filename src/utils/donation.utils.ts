import { DonationIncome } from '../types/donation.type';
import { getFlowEnv } from './config.web.utils';
import { DATE_FORMAT } from './datetime.utils';
import { DonationVo } from '../api/types/donation.types';
import { getTxFlowScanLink } from './flow-blockchain.utils';

export interface DonationIncomeTableData {
  // create_date_time
  col1_created_date: string;
  // amount
  col2: number;
  // name
  col3_donor_name: string;
  // episode_name
  col4_episode_name: string;
  // message
  col5_donation_message: string;
  // transaction_link
  col6_transaction_link: string;
  options: {
    data: DonationIncome;
    isShow: boolean;
  };
}
interface GetDonationTableDataReturns {
  donationTableData: Array<DonationIncomeTableData>;
  totalCreatorRoyalties: number;
  totalDonors: number;
  totalIncome: number;
  totalPlatformFees: number;
}

export const getDonationTableData = (
  donationIncomes: Array<DonationIncome>,
): GetDonationTableDataReturns => {
  const totalDonors = donationIncomes?.length ?? 0;
  let totalIncome = 0;
  let totalCreatorRoyalties = 0;

  const donationTableData = donationIncomes?.map((d) => {
    // const primaryDonationRoyalties = d?.royalties ?? [];
    // const len = primaryDonationRoyalties?.length ?? 0;
    // const primaryDonationCut: number =
    //   len > 0 ? Number(d?.royalties[0]?.cut ?? '0.2') : 0.2;
    const primaryDonationCut = 0.8;

    const tx = d?.transaction_hash ?? '';
    totalIncome += d?.amount ?? 0;
    totalCreatorRoyalties += (d?.amount ?? 0) * primaryDonationCut;
    return {
      col1_created_date: DATE_FORMAT['YYYY/MM/DD'](
        new Date(d?.create_date_time ?? 0),
      ),
      col2: d?.amount ?? 0,
      col3_donor_name: d?.name ?? '',
      col4_episode_name: d?.episode_name ?? '',
      col5_donation_message: d?.message ?? '',
      col6_transaction_link: getTxFlowScanLink(tx),
      options: {
        isShow: false,
        data: d,
      },
    };
  });
  const totalPlatformFees = totalIncome - totalCreatorRoyalties;
  return {
    totalCreatorRoyalties,
    donationTableData,
    totalDonors,
    totalIncome,
    totalPlatformFees,
  };
};
