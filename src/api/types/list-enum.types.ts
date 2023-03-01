enum STATUS {
  // NONE 為初始狀態、已與 RSS 同步
  NONE = 'NONE',
  DRAFT = 'DRAFT',
  // 只創建精華、但尚未開放鑄造
  ESSENCE_CREATED = 'ESSENCE_CREATED',
  ENDED = 'ENDED',
  ERROR = 'ERROR',
  // 精華開放鑄造
  LISTING = 'LISTING',
}

enum TYPE {
  // NONE 為初始狀態、已與 RSS 同步
  NONE = 'NONE',
  FIXED_PRICE = 'FIXED_PRICE',
  LIMITED_EDITION = 'LIMITED_EDITION',
  TIMED_AUCTION = 'TIMED_AUCTION',
}

export const LIST_ENUM = {
  STATUS,
  TYPE,
};

export type LIST_ENUM_TYPE = STATUS | TYPE;
