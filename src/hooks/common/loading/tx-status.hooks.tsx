import { useEffect, useRef, useState } from 'react';
import * as fcl from '@onflow/fcl';
import { TxStatus } from '../../../components/common/loading/tx-status/tx-status.component';
import { SafeFclResponse } from '../../../api/fcl/transactions.fcl';

export class Transaction {
  public errorMessage = '';
  public grpcStatus = 0;
  public id = '';
  public isDeclinedTx = false;
  public isSealed = false;
  // isShow Modal
  public isShow = false;
  public transactionStatus = 0;
}

export interface TxStatusRes {
  setSealedRes: React.Dispatch<SafeFclResponse>;
  showTxStatusModal: () => void;
  tx: Transaction;
  TxStatusEle: JSX.Element;
}

export const useTxStatus = (): TxStatusRes => {
  const [sealedRes, setSealedRes] = useState<SafeFclResponse>(['', undefined]);
  const [tx, setTx] = useState(new Transaction());
  const isSubscribedTx = useRef(false);
  const TxStatusEle = (
    <TxStatus
      isDeclinedTx={tx.isDeclinedTx}
      isShowTxStatus={tx.isShow}
      txErrorMessage={tx?.errorMessage ?? ''}
      txStatus={tx?.transactionStatus ?? 0}
      txStatusCode={tx.grpcStatus}
      txId={tx.id}
    />
  );
  const showTxStatusModal = () => {
    const txInfo: Transaction = {
      errorMessage: '',
      grpcStatus: 0,
      id: '',
      isDeclinedTx: false,
      isSealed: false,
      isShow: true,
      transactionStatus: 0,
    };
    setTx(txInfo);
  };

  // dismiss modal effect
  useEffect(() => {
    const transactionStatus = tx?.transactionStatus ?? 0;
    const grpcStatus = tx?.grpcStatus ?? 0;
    const isNeedToDismissModal =
      tx.isShow &&
      (tx.isDeclinedTx || transactionStatus >= 4 || grpcStatus > 0);
    if (!isNeedToDismissModal) return;
    const dismissAfter2s = setTimeout(() => {
      setTx((prev) => ({ ...prev, isShow: false }));
      isSubscribedTx.current = false;
    }, 2000);
    return () => clearTimeout(dismissAfter2s);
  }, [tx]);

  useEffect(() => {
    const [transactionId, error] = sealedRes;
    const isDeclinedTx = !!error;
    // before approving the transaction, so the txId is empty
    let txInfo: Transaction = {
      errorMessage: '',
      grpcStatus: 0,
      id: transactionId,
      isDeclinedTx,
      isSealed: tx.isSealed,
      isShow: tx.isShow,
      transactionStatus: 0,
    };
    if (!transactionId) {
      setTx(txInfo);
      return;
    }
    if (isSubscribedTx.current) return;
    // the transaction has been executed
    fcl.tx(transactionId).subscribe((res) => {
      txInfo = {
        errorMessage: res?.errorMessage ?? '',
        grpcStatus: res?.statusCode ?? 0,
        id: transactionId,
        isDeclinedTx,
        isSealed: (res?.status ?? 0) >= 4,
        isShow: tx.isShow,
        transactionStatus: res?.status ?? 0,
      };
      setTx(txInfo);
    });
    isSubscribedTx.current = true;
  }, [sealedRes]);

  return {
    // tx: transaction payload
    tx,
    setSealedRes,
    TxStatusEle,
    showTxStatusModal,
  };
};
