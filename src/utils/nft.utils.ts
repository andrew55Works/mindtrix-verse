import { NFTPodcastAudioEssenceVo } from '../redux/essence/essence.interface';

export const sumOfEssenceCreationsInAnEpisode = (
  audioEssences: Array<NFTPodcastAudioEssenceVo>,
) =>
  audioEssences?.reduce(
    (prev, item) => prev + Number(item?.nft_edition_quantity ?? 0),
    0,
  );
