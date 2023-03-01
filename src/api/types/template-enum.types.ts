enum TYPE {
  EPISODE_DONATION = 'EPISODE_DONATION', // 1
  PROJECT_DONATION = 'PROJECT_DONATION', // 2
  POAP = 'POAP', // 3
  CUSTOM = 'CUSTOM', // 4
}

enum STATUS {
  DRAFT = 'DRAFT', // 1
  SCHEDULED = 'SCHEDULED', // 2
  LISTING = 'LISTING', // 3
  EXPIRED = 'EXPIRED', // 4
}

export const TEMPLATE_ENUM = {
  TYPE,
  STATUS,
};

export type TEMPLATE_ENUM_TYPE = TYPE;
export type TEMPLATE_ENUM_STATUS = STATUS;

/***
 *  pub enum VoiceSerial: UInt8 {
 *   index  + padding = VoiceSerial Number
 *    pub case EPISODE_DONATION = 0 + 1 = 1
 *    pub case PROJECT_DONATION = 1 + 1 = 2
 *    pub case POAP = 2 + 1 = 3
 *    pub case CUSTOM = 3 + 1 = 4
 *  }
 * @param targetEnum
 */
export const convertTemplateEnumInNumberCode = (targetEnum: TYPE): number => {
  let num = -1;
  Object.keys(TYPE).forEach((type, index) => {
    if (targetEnum === type) num = index;
  });
  return num + 1;
};

export const convertNumberCodeToTemplateEnum = (num: number): TYPE => {
  const keys = Object.keys(TYPE) as Array<TYPE>;
  const index = num - 1;
  if (index < 0) throw new Error('Cannot cover the num to NFT Enum:' + num);
  return keys[index];
};

export const convertStatusEnumInNumberCode = (targetEnum: STATUS): number => {
  let num = -1;
  Object.keys(STATUS).forEach((type, index) => {
    if (targetEnum === type) num = index;
  });
  return num + 1;
};

export const convertNumberCodeToStatusEnum = (num: number): STATUS => {
  const keys = Object.keys(STATUS) as Array<STATUS>;
  const index = num - 1;
  if (index < 0) throw new Error('Cannot cover the num to NFT Enum:' + num);
  return keys[index];
};
