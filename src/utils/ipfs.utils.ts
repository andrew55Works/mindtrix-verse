import IPFS from 'ipfs-core';
import { create } from 'ipfs-http-client';
import { getIPFS } from './config.web.utils';

const ipfsConfig = getIPFS();

export const readIPFSData = async (CID: string) => {
  const node = await IPFS.create();

  const stream = node.cat(CID);
  let data = '';

  for await (const chunk of stream) {
    // chunks of data are returned as a Buffer, convert it back to a string
    data += chunk.toString();
  }

  return data;
};

export const listDirectoryContent = async (ipfsDirPath: string) => {
  const url = 'https://dweb.link/api/v0';
  const ipfs = create({ url });

  const links = [];
  for await (const link of ipfs.ls(ipfsDirPath)) {
    links.push(link);
  }
  console.info(links);

  return links;
};

export const uploadToIPFS = async (file: File) => {
  try {
    const projectId = ipfsConfig.IPFS_INFURA_PROJECT_ID;
    const projectSecret = ipfsConfig.IPFS_INFURA_PROJECT_SECRET;
    const auth =
      'Basic ' +
      Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });
    const added = await client.add(file);
    console.info('added:', added);
    const hash = added.path;
    console.info('hash:', hash);
    // const fullIpfsUrl = `${ipfsConfig.IPFS_INFURA_DEDICATED_GATEWAY}/${hash}`;
    const fullIpfsUrl = `https://infura-ipfs.io/ipfs/${hash}`;

    return {
      hash,
      fullIpfsUrl,
    };
  } catch (e) {
    console.error('uploadToIPFS error:', e);
    return {
      hash: '',
      fullIpfsUrl: '',
    };
  }
};
