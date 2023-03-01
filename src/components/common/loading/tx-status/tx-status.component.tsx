import React, { FC } from 'react';
import { Text } from '../../../../styles/styled-system/text.theme';
import * as S from './tx-status.styles';
import _get from 'lodash.get';
import { AnimatePresence, motion } from 'framer-motion';
import { getTxFlowScanLink } from '../../../../utils/flow-blockchain.utils';

interface Props {
  isDeclinedTx: boolean;
  isShowTxStatus: boolean;
  txErrorMessage: string;
  txId: string;
  txStatus: number;
  txStatusCode: number;
}
export const TxStatus: FC<Props> = ({
  isDeclinedTx,
  isShowTxStatus,
  txId,
  txErrorMessage,
  txStatus,
  txStatusCode,
}) => {
  const isTxError = txStatusCode === 1;
  const text = {
    txPrefix: {
      '-1': 'Failed',
      '-9': 'Declined',
      0: 'Processing',
      1: 'Processing',
      2: 'Processing',
      3: 'Processing',
      4: 'Finished',
      5: 'Expired',
    },
    txStatus: `(${txStatus ? txStatus : 0}/4)`,
    descriptions: {
      '-1': txErrorMessage,
      '-9': 'You have to approve the transaction to continue.',
      0: 'Transaction Initializing...',
      1: 'Transaction Pending...',
      2: 'Transaction Finalized',
      3: 'Transaction Executed',
      4: 'Transaction Sealed',
      5: 'Transaction Expired',
    },
    progressValue: {
      '-1': 1,
      '-9': 1,
      0: undefined,
      1: undefined,
      2: '0.33',
      3: '0.66',
      4: '1',
      5: undefined,
    },
  };
  // if the status is 4, hide the modal
  const txStatusIncludeError = isDeclinedTx
    ? '-9'
    : isTxError
    ? '-1'
    : txStatus.toString();
  const isAnyErrorOccurred = parseInt(txStatusIncludeError, 10) < 0;
  const prefix = _get(
    text.txPrefix,
    [txStatusIncludeError],
    text.txPrefix['0'],
  );
  const title = `${prefix}${text.txStatus}`;
  const description = _get(
    text.descriptions,
    [txStatusIncludeError],
    text.descriptions['0'],
  );

  const progressValue = _get(
    text.progressValue,
    [txStatusIncludeError],
    text.progressValue['0'],
  );
  const flowScanURL = getTxFlowScanLink(txId);
  const isTxIdExist = !!txId;
  return (
    <AnimatePresence exitBeforeEnter={true}>
      {isShowTxStatus && (
        <motion.div
          style={S.framer.style.modal()}
          variants={S.framer.variant.modal()}
          initial={'hidden'}
          animate={'visible'}
          exit={'hidden'}
        >
          <S.Container>
            <Text.h1
              status={isAnyErrorOccurred ? 'danger' : 'basic'}
              marginTop={0}
              marginBottom={0}
              children={title}
            />
            <Text.h5
              status={'basic'}
              marginTop={0}
              marginBottom={0}
              isAutoWrap={true}
              children={description}
            />
            {isTxIdExist ? (
              <Text.sp status={'basic'} fontSize={'14px'} marginBottom={0}>
                <S.ALink href={flowScanURL} target={'__blank'}>
                  {txId.substr(0, 38) + '...'}
                </S.ALink>
              </Text.sp>
            ) : null}
            <S.Progress value={progressValue} />
          </S.Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
