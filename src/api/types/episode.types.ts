import {
  Images,
  imagesDefaultState,
} from '../../components/navigation/top-navigation.component';

export interface Episode {
  create_date_time: number;
  description: string;
  duration: number;
  episode_guid: string;
  episode_index: number;
  file_url: string;
  firebase_file_url: string;
  images: Images;
  ipfs_cid: string;
  link: string;
  name: string;
  preview_link?: string;
  published_date_time: number;
  show_guid: string;
  updated_date_time: number;
}

export interface GetEpisodesByShowGuid {
  findEpisodesByShowGuid: Array<Episode>;
}

export interface SyncPodcastEpisodesRes {
  // syncPodCastsByParsingRss: {
  //   episodes: Array<Episode>;
  //   error: string;
  //   show: Show;
  // };

  syncPodCastsByParsingRss: Array<Episode>;
}

export const episodeDefaultState: Episode = {
  episode_index: -1,
  create_date_time: 0,
  description: '',
  duration: 0,
  episode_guid: '',
  images: imagesDefaultState,
  firebase_file_url: '',
  file_url: '',
  ipfs_cid: '',
  link: '',
  name: '',
  published_date_time: 0,
  show_guid: '',
  updated_date_time: 0,
};

export type EpisodeSelectItem = Pick<Episode, 'name' | 'episode_guid'>;
