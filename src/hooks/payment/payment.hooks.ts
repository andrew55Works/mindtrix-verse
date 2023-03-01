import { useState } from 'react';

export enum PaymentStageEnum {
  WORLD_PACK = 'WORLD_PACK',
  CREDIT_CARD = 'CREDIT_CARD',
  CRYPTO_COINS = 'CRYPTO_COINS',
  CONNECT_CRYPTO_WALLET = 'CONNECT_CRYPTO_WALLET',
}

export const useSelectedPaymentMethod = (
  defaultPaymentMethod?: PaymentStageEnum,
) => {
  const [selectedPaymentStage, setSelectedPaymentStage] =
    useState<PaymentStageEnum | null>(
      defaultPaymentMethod ? defaultPaymentMethod : null,
    );

  return {
    selectedPaymentStage,
    setSelectedPaymentStage,
  };
};
