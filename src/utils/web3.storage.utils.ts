import { getWeb3Storage } from './config.web.utils';
import { Web3Storage } from 'web3.storage';
import { listDirectoryContent } from './ipfs.utils';

const web3StorageToken = getWeb3Storage().IPFS_WEB3_STORAGE_API_TOKEN;
const web3Storage = new Web3Storage({ token: web3StorageToken });

export const storeFilesToWeb3Storage = async (files: Array<File>) => {
  console.info('storeFilesToWeb3Storage files:', files);
  // @ts-ignore
  const cid = await web3Storage.put(files);
  console.info('stored files with cid:', cid);
  return cid;
  // return 'ok';
};

export const getFilesFromWeb3Storage = async () => {
  const list = [];
  for await (const upload of web3Storage.list()) {
    list.push(upload?.cid ?? '');
    // console.info(
    //   `${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`,
    // );
  }
  return list;
};

export const getLatestIPFSAudioFileURL = async (): Promise<string> => {
  const cids = await getFilesFromWeb3Storage();
  if (!!cids && (cids?.length ?? 0) > 0) {
    // [0] is the latest ipfs record
    const res = await listDirectoryContent(cids[0]);
    if (!!res && (res?.length ?? 0) > 0) {
      // path eg: "bafybeibljbuwzt2qnfeh7ahqms3efs5pb6yq5xbauhhow7mvbgmkflpfty/1119-con-1668712199830.mp3"
      const path = res[0]?.path ?? '';
      return `https://w3s.link/ipfs/${path}`;
    }
    console.info('listDirectoryContent res:', res);
  }
  return '';
};
