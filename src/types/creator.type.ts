import { imagesDefaultState } from '../components/navigation/top-navigation.component';
import { initialWallet, Wallet } from './wallet.type';
import { USER_ROLE_ENUM } from '../redux/collector/collector.interface';

export class CreatorRssInfo {
  public _id?: string | null | undefined = undefined;
  public category: string | undefined = undefined;
  public child_wallet_account: ChildWalletAccount;
  public content_type: Array<string> = [];
  public create_date_time = '';
  public creator_id?: string | null | undefined = undefined;
  public creator_name: string | undefined = undefined;
  public description: string | undefined = undefined;
  public email: string | undefined = undefined;
  public images = imagesDefaultState;
  public link: string | undefined = undefined;
  public name: string | undefined = undefined;
  public published_date_time = 0;
  public role: USER_ROLE_ENUM | undefined = undefined;
  public rss_generator: string | undefined = undefined;
  public rss_link: string | undefined = undefined;
  public show_guid?: string | undefined = undefined;
  public show_guids?: Array<string> = [];
  public update_date_time = 0;
  public wallet: Wallet = initialWallet;
}

export class ChildWalletAccount {
  public address = '';
  public keypair = new KeyPair();
}

export class KeyPair {
  public privateKey = '';
  public publicKey = '';
}

export class ChildAccountInfo {
  public _id = '';
  public child_wallet_account = new ChildWalletAccount();
  public email = '';
  public isCreatingChildAccount = false;
}
