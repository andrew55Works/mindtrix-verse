import { useRouter } from 'next/router';
import { splitShowGuidAndNameFromPath } from '../../utils/seo.utils';

export const useShowGuidFromNextDynamicPath = () => {
  const { query } = useRouter();
  const idWithName = (query?.id_with_name ?? '') as string;
  const { id, name } = splitShowGuidAndNameFromPath(idWithName);

  return {
    query,
    id,
    name,
  };
};

export const useNFTNameFromMyGalleryPath = () => {
  // eg: mindtrix.xyz/room/123--EP70
  // eg: mindtrix.xyz/room/showName/123--EP70
  const { query } = useRouter();
  const paths = (query?.nft_name ?? '') as string;
  const len = paths?.length ?? 0;
  const nftName = len > 1 ? paths[len - 1] : paths[0];

  const { id, name } = splitShowGuidAndNameFromPath(nftName);

  return {
    query,
    id,
    name,
  };
};
