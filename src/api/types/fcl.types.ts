export enum LicenseIdentifierEnum {
  'CC-BY-NC-1.0' = 'CC-BY-NC-1.0',
  'CC-BY-NC-2.0' = 'CC-BY-NC-2.0',
  'CC-BY-NC-3.0' = 'CC-BY-NC-3.0',
  'CC-BY-NC-4.0' = 'CC-BY-NC-4.0',
}

export enum MIMETypeEnum {
  'image/svg+xml' = 'image/svg+xml',
  'image/png' = 'image/png',
  'image/jpeg' = 'image/jpeg',
  'image/gif' = 'image/gif',
  'image/avif' = 'image/avif',
  'image/webp' = 'image/webp',
  'audio/webm' = 'audio/webm',
  'audio/wav' = 'audio/wav',
  'audio/wave' = 'audio/wave',
  'audio/x-wav' = 'audio/x-wav',
  'audio/x-pn-wav' = 'audio/x-pn-wav',
  'audio/ogg' = 'audio/ogg',
  'video/mp4' = 'video/mp4',
  'video/webm' = 'video/webm',
  'video/ogg' = 'video/ogg',
}

export interface RoyaltyDictionary {
  // the value in dictionary should be used a type-safe type(such as [number, string]) instead of an AnyStruct object: https://forum.onflow.org/t/mixed-type-types/686
  // [cut: number, description: string]
  [address: string]: [string, string];
}

export interface RoyaltyVo {
  cut: string; // ex: "0.3"
  description: string;
  recipientAddress: string;
}

export interface Component {
  // component Name
  key: string;
  // UInt64
  value: number;
}

export interface Social {
  // socialPlatformName
  key: string;
  // socialPlatformUrl
  value: string;
}

export interface AudioEssence {
  endTime: string;
  fullEpisodeDuration: string;
  startTime: string;
}

export interface StrMetadata {
  // metadata key
  key: string;
  // metadata value
  value: string;
}

export interface IntMetadata {
  // metadata key
  key: string;
  // metadata UInt64 value
  value: number;
}

export interface NFTMeta {
  audioEssence: AudioEssence;
  collectionDescription: string;
  collectionExternalURL: string;
  collectionName: string;
  collectionSocials: Array<Social>;
  // collectionSquareImageType: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  collectionSquareImageType: MIMETypeEnum | '';
  collectionSquareImageUrl: string;
  description: string;
  editionQuantity: number;
  episodeGuid?: string;
  essenceExternalURL: string;
  extraMetadatas: Array<StrMetadata>;
  fifthSerial: number; // e.g. the 10th segment of an episode
  firstSerial: number; // e.g. the Podcast, Literature, or Video
  fourthSerial: number; // e.g. the 18th episode of a podcast show
  ipfsCid: string;
  ipfsDirectory: string;
  isEnableLimitedQuantity: boolean;
  isEnableTimeLock: boolean;
  issueEndTime: number;
  issueStartTime: number;
  // licenseIdentifier: https://spdx.org/licenses/
  licenseIdentifier: LicenseIdentifierEnum | '';
  name: string;
  offChainedId: string;
  // UFix64 需用字串帶小數，例如：'161.0'，但如果是 UInt 類型，則要帶數字 161
  price: string;
  recipientAddress: string;
  royalties: Array<RoyaltyVo>;
  secondSerial: number; // e.g. the Essence, Cover, or Quest in a Podcast Show
  showGuid?: string;
  thirdSerial: number; // e.g. the 2nd podcast show of a creator
  thumbnail: string;
}

export interface NFTStructReq {
  essenceOffChainId: string;
  isEnableLimitedQuantity: boolean;
  isEnableTimeLock: boolean;
  issueEndTime: number;
  issueStartTime: number;
  maxEdition: number;
  metadata: Array<StrMetadata>;
  // UFix64 需用字串帶小數，例如：'161.0'，但如果是 UInt 類型，則要帶數字 161
  mintPrices: string;
  recipientAddress: string;
  // 只填二級分潤
  royalties: Array<RoyaltyVo>;
  socials: Array<Social>;
}

export interface TemplateStruct {
  components: { [name: string]: number };
  createdTime: number;
  currentEdition: number;
  description: string;
  intMetadata: { [name: string]: number };
  locked: boolean;
  maxEdition: number;
  minters: { [address: string]: Array<NFTIdentifier> };
  mintPrice: { [identifier: string]: FT };
  name: string;
  paymentType: string;
  royalties: Array<RoyaltyVo>;
  socials: { [name: string]: string };
  strMetadata: { [name: string]: string };
  templateId: number;
  verifiers: { [identifier: string]: Array<TimeLock | LimitedQuantity> };
}

export interface TemplateStructReq {
  components: Array<Component>;
  description: string;
  intMetadata: Array<IntMetadata>;
  isEnableLimitedQuantity: boolean;
  isEnableTimeLock: boolean;
  issueEndTime: number;
  issueStartTime: number;
  maxEdition: number;
  name: string;
  // UFix64 需用字串帶小數，例如：'161.0'，但如果是 UInt 類型，則要帶數字 161
  priceUSD: string;
  // 只填二級分潤
  royalties: Array<RoyaltyVo>;
  socials: Array<Social>;
  strMetadata: Array<StrMetadata>;
}

export interface DonationNFTStructReq {
  creatorAddress: string;
  donorAddress: string;
  metadata: Array<StrMetadata>;
  // UFix64 需用字串帶小數，例如：'161.0'，但如果是 UInt 類型，則要帶數字 161
  mintPrice: string;
  offChainedId: string;
  // 只填二級分潤
  royalties: Array<RoyaltyVo>;
  socials: Array<Social>;
}

export interface FT {
  path: string;
  price: number;
}

export interface NFTIdentifier {
  createdTime: number;
  holder: string;
  serial: number;
  uuid: number;
}

export interface TimeLock {
  endTime: number;
  startTime: number;
}

export class LimitedQuantity {
  public maxEdition = 0;
  public maxMintTimesPerAddress = 0;
}
