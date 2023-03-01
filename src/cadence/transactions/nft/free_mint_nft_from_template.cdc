import NonFungibleToken from 0xNonfungibleToken
import MetadataViews from 0xMetadataViews
import DapperUtilityCoin from 0xDapperToken
import Mindtrix from 0xMindtrixNFT
import MindtrixTemplate from 0xMindtrixNFT
import MindtrixViews from 0xMindtrixNFT

transaction(templateId: UInt64){
  let nftRecipiant: &Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic}

  prepare(buyer: AuthAccount) {
    if buyer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
      let collection <- Mindtrix.createEmptyCollection()
      buyer.save(<-collection, to: Mindtrix.MindtrixCollectionStoragePath)
    }
    if !buyer.getCapability<&Mindtrix.Collection{NonFungibleToken.CollectionPublic, Mindtrix.MindtrixCollectionPublic, MetadataViews.ResolverCollection}>(Mindtrix.MindtrixCollectionPublicPath).check() {
      buyer.unlink(Mindtrix.MindtrixCollectionPublicPath)
      buyer.link<&Mindtrix.Collection{NonFungibleToken.CollectionPublic, Mindtrix.MindtrixCollectionPublic, MetadataViews.ResolverCollection}>(
          Mindtrix.MindtrixCollectionPublicPath,
          target: Mindtrix.MindtrixCollectionStoragePath
      )
    }
    self.nftRecipiant = buyer.getCapability<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic}>(Mindtrix.MindtrixCollectionPublicPath).borrow() ?? panic("Cannot borrow Mindtrix Collection. Please setup first")
  }

  pre {
    MindtrixTemplate.getMindtrixTemplateByTemplateId(templateId: templateId)!.getMintPrice(identifier: DapperUtilityCoin.getType().identifier)!.price <= 0.0 : "This is not a free mint!"
  }

  execute {
    MindtrixTemplate.freeMintNFT(recipient: self.nftRecipiant, templateId: templateId)
  }
}

