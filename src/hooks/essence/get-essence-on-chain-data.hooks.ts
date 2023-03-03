import { useEffect, useRef, useState } from 'react';
import { NFTEssenceV2 } from '../../api/types/nft.types';
import { getMindtrixTemplateOrEssenceByIdFcl } from '../../api/fcl/scripts.fcl';
import { getVerifiers } from '../fcl/fcl.utils';
import { DATE_FORMAT } from '../../utils/datetime.utils';
import { usePrevious } from '../utils/previous.hooks';
import { NFTIdentifier, TemplateStruct } from '../../api/types/fcl.types';
import { LIST_ENUM } from '../../api/types/list-enum.types';
import { convertNumberCodeToNFTEnum } from '../../api/types/nft-enum.types';
import { Show } from '../../redux/show/show.interface';
import { _get } from '../../utils/lodash.utils';
import { getTokenIdentifiers } from '../../utils/token.utils';

export const useEssenceOnChainData = (
  show: Show | null,
  templateOrEssenceId: number,
  walletAddress: string,
  setIsLoading: React.Dispatch<boolean> | undefined,
) => {
  const [essence, setEssence] = useState<NFTEssenceV2 | null>(null);
  const fetchOnce = useRef(false);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const preRefetchIndex = usePrevious(refetchIndex);

  const fetchEssenceByUuid = async () => {
    const [templateRes, templateError] =
      await getMindtrixTemplateOrEssenceByIdFcl(templateOrEssenceId);
    const temp = (templateRes?.data ?? {}) as TemplateStruct;
    const ipfsCid = temp?.strMetadata?.essenceFileIPFSCid ?? '';
    const ipfsDirectory = temp?.strMetadata?.essenceFileIPFSDirectory ?? '';
    const ipfsLink = `https://infura-ipfs.io/ipfs/${ipfsDirectory}/${ipfsCid}`;
    const timeLock = getVerifiers.TimeLock(temp?.verifiers);
    const limitedQuantity = getVerifiers.LimitedQuantity(temp?.verifiers);
    const hasClaimed =
      !!walletAddress && (walletAddress in temp?.minters ?? {});
    const mintIdentifiers = _get(
      temp,
      ['minters', walletAddress],
      [],
    ) as Array<NFTIdentifier>;
    const mintedTimes = mintIdentifiers?.length ?? 0;

    const maxMintTimesPerAddress = Number(
      limitedQuantity?.maxMintTimesPerAddress ?? '0',
    );
    const hasReachClaimLimit = mintedTimes >= maxMintTimesPerAddress;

    const ducIdentifier = getTokenIdentifiers().duc;

    const essenceTmp: NFTEssenceV2 = {
      creator_id: show?.creator_id ?? '',
      essence_uuid: temp.templateId ?? 0,
      generator: show?.rss_generator ?? '',
      show_guid: temp?.strMetadata?.showGuid ?? '',
      episode_guid: temp?.strMetadata?.episodeGuid ?? '',
      nft_name: temp?.strMetadata?.essenceName ?? '',
      nft_description: temp?.strMetadata?.essenceDescription ?? '',
      // would be dynamic value in the future
      nft_list_type: LIST_ENUM.TYPE.LIMITED_EDITION,
      nft_type: convertNumberCodeToNFTEnum(
        Number(temp?.strMetadata?.essenceTypeSerial ?? '2'),
      ),
      nft_collection_name: temp?.strMetadata?.collectionName ?? '',
      nft_edition_id: temp?.strMetadata?.nftEditionSerial ?? '0',
      nft_list_price: _get(temp, ['mintPrice', ducIdentifier, 'price'], 0),
      nft_edition_quantity: Number(temp?.maxEdition ?? '0'),
      nft_author_name: '',
      nft_cid: temp?.strMetadata?.essenceFileIPFSCid ?? '',
      nft_collection_avatar: show?.images?.medium?.url ?? '',
      create_date_time: DATE_FORMAT['YYYY/MM/DD HH:MM'](
        new Date(Number(temp?.createdTime ?? 0) * 1000),
      ),
      nft_external_url: temp?.strMetadata?.essenceExternalURL ?? '',
      nft_ipfs_link: ipfsLink,
      nft_license: temp?.strMetadata.licenseIdentifier ?? 'CC-BY-NC-4.0',
      nft_list_end_date_time: DATE_FORMAT['YYYY/MM/DD HH:MM'](
        new Date(Number(timeLock?.endTime ?? 0) * 1000),
      ),
      nft_list_start_date_time: DATE_FORMAT['YYYY/MM/DD HH:MM'](
        new Date(Number(timeLock?.startTime ?? 0) * 1000),
      ),
      nft_minted_quantity: Number(temp?.currentEdition ?? '0'),
      nft_has_claimed: hasClaimed,
      nft_reach_claimed_limitation: hasReachClaimLimit,
      // if showing up on chain, it means the essence is already created
      list_status: LIST_ENUM.STATUS.ESSENCE_CREATED,
      storage_link: temp?.strMetadata?.essenceFilePreviewUrl ?? '',
    };
    setEssence(essenceTmp);
    if (setIsLoading) setIsLoading(false);
  };

  useEffect(() => {
    const istriggerRefetch = preRefetchIndex !== refetchIndex;
    if (istriggerRefetch) fetchOnce.current = false;
    if (fetchOnce.current || !templateOrEssenceId || !show) return;
    fetchOnce.current = true;

    fetchEssenceByUuid();
  }, [templateOrEssenceId, refetchIndex, show]);

  const refetch = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  return {
    essence,
    refetch,
  };
};
