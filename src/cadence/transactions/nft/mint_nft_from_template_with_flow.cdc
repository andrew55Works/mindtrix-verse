// testnet
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import NonFungibleToken from 0xNonfungibleToken
import MetadataViews from 0xMetadataViews
import MindtrixTemplate from 0xMindtrixNFT
import MindtrixViews from 0xMindtrixNFT
import Mindtrix from 0xMindtrixNFT

// This txn is for a donor to mint podcast NFTs with $DUC and $FUT
transaction(templateId: UInt64){
    let nftRecipiant: &Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic}
    var mintPriceUFix64: UFix64
    let paymentVault: @FungibleToken.Vault

    prepare(buyer: AuthAccount) {
        if buyer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
            let collection <- Mindtrix.createEmptyCollection()
            buyer.save(<-collection, to: Mindtrix.MindtrixCollectionStoragePath)
            buyer.link<&Mindtrix.Collection{NonFungibleToken.CollectionPublic, Mindtrix.MindtrixCollectionPublic, MetadataViews.ResolverCollection}>(
                Mindtrix.MindtrixCollectionPublicPath,
                target: Mindtrix.MindtrixCollectionStoragePath
            )
        }
        self.nftRecipiant = buyer.getCapability<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic}>(Mindtrix.MindtrixCollectionPublicPath).borrow() ?? panic("Cannot borrow Mindtrix Collection. Please setup first")
        var receiverPath: CapabilityPath = /public/dapperUtilityCoinReceiver
        let template = MindtrixTemplate.getMindtrixTemplateByTemplateId(templateId: templateId) ?? panic("Cannot get specific template.")
        let paymentType = template.getPaymentType()

        let flowVault = buyer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FlowToken vault from acct storage")

        let mintPriceDuc: MindtrixViews.FT = template.getMintPrice(identifier: FlowToken.getType().identifier)!
        self.mintPriceUFix64 = mintPriceDuc.price

        self.paymentVault <- flowVault.withdraw(amount: self.mintPriceUFix64)
    }

    execute {
        MindtrixTemplate.buyWithFlowToken(recipient: self.nftRecipiant, paymentVault: <- self.paymentVault, mintPriceUFix64: self.mintPriceUFix64, templateId: templateId)
    }
}
