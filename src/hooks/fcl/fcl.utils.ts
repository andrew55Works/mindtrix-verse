import { getFlowCadenceContractAddress } from '../../utils/config.web.utils';
import {
  LimitedQuantityVerifier,
  TimeLockVerifier,
  Verifiers,
} from '../../types/on-chain.type';
import { _get } from '../../utils/lodash.utils';

const contracts = getFlowCadenceContractAddress();
const prefix = 'A.';

export const getContractFullAddress = {
  Verifier:
    prefix +
    contracts.MINDTRIX_NFT_VERIFIER.replace('0x', '') +
    '.MindtrixVerifier',
};

export const getVerifiers = {
  TimeLock: (verifiers?: Verifiers<any>) => {
    const defaultData = {
      endTime: '',
      startTime: '',
    } as TimeLockVerifier;
    if (!verifiers) return defaultData;
    const address = getContractFullAddress.Verifier + '.TimeLock';
    const timeLockVerifier = _get(
      verifiers,
      [address, '0'],
      defaultData,
    ) as TimeLockVerifier;
    return timeLockVerifier;
  },
  LimitedQuantity: (verifiers?: Verifiers<any>) => {
    const defaultData = {
      maxEdition: '0',
      maxMintQuantityPerTransaction: '0',
      maxMintTimesPerAddress: '0',
    } as LimitedQuantityVerifier;
    if (!verifiers) return defaultData;
    const address = getContractFullAddress.Verifier + '.LimitedQuantityV2';
    const limitedQuantityVerifier = _get(
      verifiers,
      [address, '0', 'intDic'],
      defaultData,
    ) as LimitedQuantityVerifier;
    return limitedQuantityVerifier;
  },
};
