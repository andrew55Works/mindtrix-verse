import Mindtrix from 0xMindtrixNFT

transaction(nftIds: [UInt64]){
  let collectionRes: &Mindtrix.Collection
  prepare(signer: AuthAccount){
    self.collectionRes = signer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) ?? panic("Cannot borrow Mindtrix collection. Please init first.")
  }

  execute {
    for id in nftIds {
      self.collectionRes.burn(id: id)
    }
  }
}
