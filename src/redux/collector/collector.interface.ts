import { Show } from '../show/show.interface';
import { Wallet } from '../../types/wallet.type';
import { Images } from '../../components/navigation/top-navigation.component';

export enum USER_ROLE_ENUM {
  COLLECTOR = 'COLLECTOR',
  CREATOR = 'CREATOR',
}

export interface CollectorProfile {
  _id?: string | null | undefined;
  email: string | undefined;
  images: Images;
  name: string | undefined;
  revenue?: {
    flow: 0;
  };
  role: USER_ROLE_ENUM | undefined;
  shows?: {
    [key: string]: Show;
  };
  wallet: Wallet;
}
