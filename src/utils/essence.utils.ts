import { SALE_STATUS } from '../types/sale-enum.types';

export const getEssenceSoldStatus = (
  listStartTime: number,
  listEndTime: number,
  listPrice: number,
  soldQuantity: number,
  capacity: number,
  isReachMaxMintQuantity: boolean,
  isConnectedWallet: boolean,
): SALE_STATUS => {
  let saleStatus = SALE_STATUS.NOT_CONNECTED_WALLET;

  if (!isConnectedWallet || !listEndTime || !listStartTime)
    return SALE_STATUS.NOT_CONNECTED_WALLET;
  const currentTime = new Date(Date.now()).getTime();
  if (currentTime < listEndTime && currentTime < listStartTime) {
    saleStatus = SALE_STATUS.NOT_STARTED;
  } else if (currentTime < listEndTime && currentTime > listStartTime) {
    // 販售期間
    const isSoldOut = soldQuantity >= capacity;
    const isFree = listPrice === 0;
    if (isReachMaxMintQuantity) {
      saleStatus = SALE_STATUS.HAS_CLAIMED;
    } else if (isSoldOut) {
      saleStatus = SALE_STATUS.SOLD_OUT;
    } else {
      saleStatus = isFree ? SALE_STATUS.FREE_CLAIM : SALE_STATUS.PREMIUM_CLAIM;
    }
  } else if (currentTime > listEndTime && currentTime > listStartTime) {
    // 已過販售期間
    saleStatus = SALE_STATUS.EXPIRED;
  }
  return saleStatus;
};
