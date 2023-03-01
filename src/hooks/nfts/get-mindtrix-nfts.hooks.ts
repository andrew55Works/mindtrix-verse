import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMindtrixNFTsFcl } from '../../api/fcl/scripts.fcl';
import { selectCreatorAddress } from '../../redux/creator/creator.selector';
import { NFTMetadata } from '../../types/on-chain.type';

export const useGetMindtrixNfts = () => {
  const [nfts, setNfts] = useState<Array<NFTMetadata>>([]);
  const walletAddress = useSelector(selectCreatorAddress);
  useEffect(() => {
    const getNfts = async () => {
      if (!walletAddress) return;
      const [nftsRes, nftsError] = await getMindtrixNFTsFcl(walletAddress);
      console.info('nftsRes:', nftsRes);
      if (nftsError) {
        console.error('getMindtrixNfts error:', nftsError);
        setNfts([]);
        return;
      }
      setNfts(nftsRes?.data ?? []);
    };
    getNfts();
  }, [walletAddress]);

  return { mindtrixNfts: nfts };
};
