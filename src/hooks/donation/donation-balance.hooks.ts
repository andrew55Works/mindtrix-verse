import { useEffect, useState } from 'react';
import { Wallet } from '../../types/wallet.type';
import { thousandsSeparatorStrToNum } from '../../utils/currency.utils';

export const useIsBalanceInsufficient = (
  wallet: Wallet,
  donateFlowPrice: number,
) => {
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState(false);
  useEffect(() => {
    const flowBalanceStr = wallet?.blocto?.balance?.flow?.str ?? '0';
    const flowBalanceNum = thousandsSeparatorStrToNum(flowBalanceStr);
    const isBalanceInSufficientTmp =
      isNaN(flowBalanceNum) || flowBalanceNum < donateFlowPrice;
    setIsBalanceInsufficient(isBalanceInSufficientTmp);
  }, [wallet?.blocto?.balance, donateFlowPrice]);
  return {
    // isBalanceInsufficient,
    isBalanceInsufficient: false,
  };
};
