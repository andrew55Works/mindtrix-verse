import Mindtrix from 0xd162b02676d63c36
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
// This transaction was auto-generated with the NFT Catalog (https://github.com/dapperlabs/nft-catalog)
//
// This transaction initializes a user's collection to support a specific NFT
//
// Collection Identifier: Mindtrix
//
// Version: 0.1.1

transaction {

  prepare(signer: AuthAccount) {
    if signer.borrow<&Mindtrix.Collection>(from: /storage/MindtrixNFTCollection) == nil {
      let collection <- Mindtrix.createEmptyCollection()
      signer.save(<-collection, to: /storage/MindtrixNFTCollection)
    }
    if (signer.getCapability<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/MindtrixNFTCollection).borrow() == nil) {
      signer.unlink(/public/MindtrixNFTCollection)
      signer.link<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/MindtrixNFTCollection, target: /storage/MindtrixNFTCollection)
    }
  }

}
