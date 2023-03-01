import * as fcl from '@onflow/fcl';

export const signMessage = async (message: string) => {
  const MSG = Buffer.from(message).toString('hex');
  try {
    return await fcl.currentUser.signUserMessage(MSG);
  } catch (error) {
    console.error(error);
  }
};
