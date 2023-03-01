import { ModalLoading } from './modal-loading/modal-loading.component';
import { TxStatus } from './tx-status/tx-status.component';

export type LoadingType = typeof ModalLoading;

const Loading = {
  TxStatus,
  Modal: ModalLoading,
};

export default Loading;
