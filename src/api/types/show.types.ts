import { Show } from '../../redux/show/show.interface';

export interface GetSingleShowByShowGuid {
  findShowByShowGuid: Show;
}

export interface GetShowDicByShowGuids {
  findShowsByShowGuids: Array<Show>;
}

export interface GetAllShows {
  findAllShows: Array<Show>;
}

export interface PostUpdateDistributionPlatforms {
  updateDistributionPlatforms: Show;
}
