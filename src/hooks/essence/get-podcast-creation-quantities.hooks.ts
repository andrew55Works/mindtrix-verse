import { EssenceStructRes } from '../../types/on-chain.type';
import { PodcastCreationQuantities } from '../../types/essence.types';
import { useMemo } from 'react';
import { TemplateStruct } from '../../api/types/fcl.types';

export const usePodcastCreationQuantities = (
  essences: Array<EssenceStructRes | TemplateStruct>,
) => {
  const podcastCreationQuantities = useMemo(() => {
    if (!!essences && (essences?.length ?? 0) > 0) {
      const quantities: PodcastCreationQuantities = essences.reduce(
        (prev, cur) => {
          return {
            claimedCreationQuantity:
              (prev?.claimedCreationQuantity ?? 0) +
              Number(cur?.currentEdition ?? '0'),
            issuedCreationQuantity:
              (prev?.issuedCreationQuantity ?? 0) +
              Number(cur?.maxEdition ?? '0'),
            unClaimedCreationQuantity: prev?.unClaimedCreationQuantity ?? 0,
          };
        },
        new PodcastCreationQuantities(),
      );
      if (quantities?.unClaimedCreationQuantity !== undefined) {
        quantities.unClaimedCreationQuantity =
          (quantities?.issuedCreationQuantity ?? 0) -
          (quantities?.claimedCreationQuantity ?? 0);
        quantities.unClaimedCreationQuantity =
          (quantities?.unClaimedCreationQuantity ?? 0) < 0
            ? 0
            : quantities?.unClaimedCreationQuantity ?? 0;
      }
      return quantities;
    } else {
      return new PodcastCreationQuantities();
    }
  }, [essences]);

  return { podcastCreationQuantities };
};
