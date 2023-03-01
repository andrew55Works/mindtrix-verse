import { getFlowEnv } from './config.web.utils';

export const getTxFlowScanLink = (txId: string) => {
  const flowScanDomain = getFlowEnv().FLOW_SCAN_DOMAIN;
  return `${flowScanDomain}/transaction/${txId}`;
};
