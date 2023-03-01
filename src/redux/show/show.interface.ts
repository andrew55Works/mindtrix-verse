import { imagesDefaultState } from '../../components/navigation/top-navigation.component';
import { Episode } from '../../api/types/episode.types';
import { CreatorRssInfo } from '../../types/creator.type';

export enum MediaTypeEnum {
  AUDIO = 'AUDIO',
  LIVE = 'LIVE',
  LIVE_UPCOMING = 'LIVE_UPCOMING',
  VIDEO = 'VIDEO',
}

export interface DistributionPlatformDto {
  create_date_time: string;
  name?: string;
  platform_id: string;
  update_date_time: string;
  url: string;
}

export interface Show extends Omit<CreatorRssInfo, 'wallet'> {
  creator_name: string;
  distribution_platform: Array<DistributionPlatformDto>;
  episodes: { [episode_guid: string]: Episode } | null;
  languages: Array<string>;
  model_name?: string;
  preview_url: string;
  primary_cut: number;
  secondary_cut: number;
}

export const showDefaultState: Show = {
  category: '',
  content_type: [''],
  creator_name: '',
  create_date_time: '0',
  distribution_platform: [],
  email: '',
  description: '',
  episodes: {},
  show_guid: '',
  show_guids: [],
  images: imagesDefaultState,
  name: '',
  languages: [''],
  link: '',
  role: undefined,
  rss_link: '',
  preview_url: '',
  primary_cut: 0,
  secondary_cut: 0,
  published_date_time: 0,
  rss_generator: '',
  update_date_time: 0,
};
