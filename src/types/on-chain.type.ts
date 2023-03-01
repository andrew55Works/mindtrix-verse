import { AudioEssence } from '../api/types/fcl.types';
import { NFT_ENUM_TYPE } from '../api/types/nft-enum.types';

export class NftInfo {
  public cid: string | null = null;
  public uri: string | null = null;
}

export interface MetadataViews {
  Edition: {
    max?: number;
    name: string;
    number: number;
  };
  IPFSFile: {
    cid: string;
    path?: string;
  };
  Royalty: {
    cut: number;
    description: string;
  };
}

interface EssenceIdentifier {
  createdTime: string;
  episodeGuid: string;
  holder: string;
  serial: string;
  showGuid: string;
  uuid: string;
}

interface FT {
  path: string;
  price: number;
}

interface SerialGenusStruct {
  description: string;
  name: string;
  number: number;
  tier: number;
}

interface EssencePrices {
  [ftName: string]: FT;
}

export interface EssenceMetadata {
  audioEssence: AudioEssence;
  collectionDescription: string;
  collectionExternalURL: string;
  collectionName: string;
  collectionSocials: { string: string };
  collectionSquareImageURL: string;
  description: string;
  edition: MetadataViews['Edition'];
  essenceExternalURL: string;
  essenceIdentifier: EssenceIdentifier;
  ipfsFile: Pick<MetadataViews, 'IPFSFile'>;
  ipfsUrl: string;
  licenseIdentifier: string;
  limitedEdition: number;
  name: string;
  // assigned in off-chain
  nftType: NFT_ENUM_TYPE;
  prices?: EssencePrices;
  royalties: Array<MetadataViews['Royalty']>;
  serialGenuses: Array<SerialGenusStruct>;
  serialNumber: number;
  thumbnail: string;
}

// should be deprecated
export interface NFTMetadata {
  collectionBannerImage: string;
  collectionDescription: string;
  collectionExternalURL: string;
  collectionName: string;
  collectionProviderLinkedType: string;
  collectionProviderPath: string;
  collectionPublic: string;
  collectionPublicLinkedType: string;
  collectionPublicPath: string;
  collectionSocials: { string: string };
  collectionSquareImage: string;
  collectionSquareImageURL: string;
  collectionStoragePath: string;
  description: string;
  edition: MetadataViews['Edition'];
  essenceIdentifier: EssenceIdentifier;
  ipfsFile: Pick<MetadataViews, 'IPFSFile'>;
  ipfsUrl: string;
  licenseIdentifier: string;
  mintedTime: number;
  name: string;
  owner: string;
  prices?: EssencePrices;
  royalties: Array<Pick<MetadataViews, 'Edition'>>;
  serialGenuses: Array<SerialGenusStruct>;
  thumbnail: string;
  type: string;
}

export interface NFTIdentifier {
  createdTime: string; // eg: "1665816021.00000000"
  holder: string;
  serial: string; // eg: "1"
  uuid: string; // eg: "44"
}

export interface Minter {
  [address: string]: Array<NFTIdentifier>;
}

export interface EssenceMetadataRes {
  audioEndTime: string;
  audioEssenceSerial: string;
  audioStartTime: string;
  collectionDescription: string;
  collectionExternalURL: string;
  collectionName: string;
  collectionSquareImageType: string;
  collectionSquareImageUrl: string;
  episodeGuid: string;
  episodeSerial: string;
  essenceDescription: string;
  essenceExternalURL: string;
  essenceFileIPFSCid: string;
  essenceFileIPFSDirectory: string;
  essenceFilePreviewUrl: string;
  essenceImagePreviewUrl: string;
  essenceName: string;
  essenceRealmSerial: string;
  essenceTypeSerial: string;
  essenceVideoPreviewUrl: string;
  fullEpisodeDuration: string;
  licenseIdentifier: string;
  nftEditionSerial: string;
  showGuid: string;
  showSerial: string;
}

export interface Socials {
  [platform_name: string]: string;
}

export interface Components {
  [component_id: string]: number;
}

export interface TimeLockVerifier {
  // "1665815885.00000000"
  endTime: string;
  startTime: string;
}

export interface LimitedQuantityVerifier {
  // "1665815885.00000000"
  maxEdition: string;
  maxMintQuantityPerTransaction: string;
  maxMintTimesPerAddress: string;
}

export interface Verifiers<T> {
  [verifier_type: string]: Array<T>;
}

export interface Minters {
  [minter_address: string]: {
    createdTime: string;
    holder: string;
    serial: string;
    uuid: string;
  };
}

export interface EssenceStructRes {
  components: Components;
  createdTime: string;
  currentEdition: string;
  essenceClaimable: boolean;
  essenceId: string;
  essenceOffChainId: string;
  maxEdition: string;
  metadata: EssenceMetadataRes;
  minters: Minters;
  mintPrices?: EssencePrices;
  royalties: Array<Pick<MetadataViews, 'Edition'>>;
  socials: Socials;
  verifiers: Verifiers<TimeLockVerifier | LimitedQuantityVerifier>;
}

export interface NFTMetadataRes {
  audioEndTime: string;
  audioEssenceSerial: string;
  audioStartTime: string;
  collectionDescription: string;
  collectionExternalURL: string;
  collectionName: string;
  collectionSocials: { string: string };
  collectionSquareImageURL: string;
  episodeGuid: string;
  episodeSerial: string;
  essenceRealmSerial: string;
  essenceTypeSerial: string;
  essenceVideoPreviewUrl: string;
  fullEpisodeDuration: string;
  licenseIdentifier: string;
  maxEdition: string;
  nftDescription: string;
  nftEditionSerial: string;
  nftExternalURL: string;
  nftFileIPFSCid: string;
  nftFileIPFSDirectory: string;
  nftFilePreviewUrl: string;
  nftImagePreviewUrl: string;
  nftName: string;
  showGuid: string;
  showSerial: string;
}

export interface NFTStructRes {
  components: Components;
  createdTime: string;
  currentHolder: string;
  essenceId: string;
  metadata: NFTMetadataRes;
  nftEdition: string;
  nftId: string;
  royalties: Array<Pick<MetadataViews, 'Edition'>>;
  socials: Socials;
}

export type BalanceDicRes = { [tokenIdentifier: string]: number };
