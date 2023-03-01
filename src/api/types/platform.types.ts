import { Images } from '../../components/navigation/village-top-navigation/village-top-navigation.component';

export interface Platform {
  _id: string;
  create_date_time: string;
  description: string;
  domain: string;
  images: Images;
  name: string;
  platform_index: number;
  update_date_time: string;
}

export interface GetAllPlatforms {
  platforms: Array<Platform>;
}
