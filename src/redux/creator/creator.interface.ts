import { CreatorRssInfo } from '../../types/creator.type';
import { Show } from '../show/show.interface';

export interface CreatorProfile extends CreatorRssInfo {
  issue_end_date?: number;
  issue_start_date?: number;
  revenue?: {
    flow: 0;
  };
  shows?: {
    [key: string]: Show;
  };
}
