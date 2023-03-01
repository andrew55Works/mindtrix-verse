enum TYPE {
  PODCAST_AUDIO_SEGMENT = 'PODCAST_AUDIO_SEGMENT',
  PODCAST_IMAGE_COVER = 'PODCAST_IMAGE_COVER',
  PODCAST_POAP = 'PODCAST_POAP',
  PODCAST_AUDIO_QA = 'PODCAST_AUDIO_QA',
}

export const NFT_ENUM = {
  TYPE,
};

/***
 *  pub enum VoiceSerial: UInt8 {
 *   index  + padding = VoiceSerial Number
 *    pub case audio = 0 + 1 = 1
 *    pub case image = 1 + 1 = 2
 *    pub case poap = 2 + 1 = 3
 *    pub case quest = 3 + 1 = 4
 *  }
 * @param targetEnum
 */
export const convertNFTEnumInNumberCode = (targetEnum: TYPE): number => {
  let num = -1;
  Object.keys(TYPE).forEach((type, index) => {
    if (targetEnum === type) num = index;
  });
  return num + 1;
};

export const convertNumberCodeToNFTEnum = (num: number): TYPE => {
  const keys = Object.keys(TYPE) as Array<TYPE>;
  const index = num - 1;
  if (index < 0) {
    console.error('Cannot cover the num to NFT Enum:' + num);
    return TYPE.PODCAST_IMAGE_COVER;
  }
  return keys[index];
};

export const isEqualToNFTEnum = {
  PODCAST_AUDIO_SEGMENT: (type: TYPE) => type === TYPE.PODCAST_AUDIO_SEGMENT,
  PODCAST_AUDIO_QA: (type: TYPE) => type === TYPE.PODCAST_AUDIO_QA,
  PODCAST_POAP: (type: TYPE) => type === TYPE.PODCAST_POAP,
  PODCAST_IMAGE_COVER: (type: TYPE) => type === TYPE.PODCAST_IMAGE_COVER,
};

export type NFT_ENUM_TYPE = TYPE;
