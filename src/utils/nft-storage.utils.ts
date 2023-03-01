import { NFTStorage, File } from 'nft.storage';
import { getNftApiKey } from './config.web.utils';

export const getNftStorageClient = new NFTStorage({ token: getNftApiKey() });

class NftStorageService {
  private readonly nftApiKey: string | null = null;
  public client: NFTStorage | null = null;

  constructor() {
    this.nftApiKey = getNftApiKey();
    this.client = new NFTStorage({ token: this?.nftApiKey ?? '' });
  }

  async uploadFile(file: Iterable<File>, fileDescription: string) {
    if (!this.client) throw new Error('The NFT client cannot be empty!');
    // const fileName = file?.name ?? '';
    // const fileType = file?.type ?? '';
    return await this.client.storeDirectory(file);
    // {
    //   name: fileName,
    //     description: fileDescription,
    //   image: new File(
    //   [
    //     /* data */
    //   ],
    //   `${fileName}.mp3`,
    //   { type: fileType },
    // ),
    // }
  }
}

export const NftStorageSingleton = new NftStorageService();
