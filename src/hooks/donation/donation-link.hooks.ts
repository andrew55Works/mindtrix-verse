import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getShortLink } from '../../services/firebase/firebase-links';
import { PAGE_URL } from '../../utils/page-router.utils';
import { selectCreatorShowGuids } from '../../redux/creator/creator.selector';
import { getFrontendMindtrixWebDomain } from '../../utils/config.web.utils';

export const useGetDonationLongLink = () => {
  const [donationLongLink, setDonationLongLink] = useState('');
  const showGuids = useSelector(selectCreatorShowGuids);
  const frontendMindtrixWebDomain = getFrontendMindtrixWebDomain();

  useEffect(() => {
    if (!showGuids || (showGuids?.length ?? 0) < 1) return;
    const showGuid = showGuids[0];
    // 預設先產中文，後續讓創作者可選
    const url = `${frontendMindtrixWebDomain}/zh/${PAGE_URL.collectors_donate.name}/${showGuid}`;
    setDonationLongLink(url);
  }, [showGuids]);

  return { donationLongLink };
};

export const useDonationLink = (
  isEnableDonation: boolean,
  donationLongLink: string,
  donationPrice: number,
) => {
  const [donationShortLink, setDonationShortLink] = useState('');

  useEffect(() => {
    const updateDonationLink = async () => {
      if (
        donationLongLink &&
        donationPrice !== null &&
        donationPrice !== undefined &&
        !isNaN(donationPrice) &&
        isEnableDonation
      ) {
        const shortLinkRes = await getShortLink(donationLongLink, {});
        const shortLink = shortLinkRes?.data?.shortLink ?? '';
        setDonationShortLink(shortLink);
      }
    };
    updateDonationLink();
  }, [isEnableDonation, donationLongLink, donationPrice]);
  return {
    donationShortLink,
  };
};
