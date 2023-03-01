import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonfungibleToken
import DapperUtilityCoin from 0xDapperToken
import MetadataViews from 0xMetadataViews
import FlowUtilityToken from 0xDapperToken
import MindtrixTemplate from 0xMindtrixNFT
import MindtrixViews from 0xMindtrixNFT
import Mindtrix from 0xMindtrixNFT

// This txn is for a donor to mint podcast NFTs with $DUC and $FUT
transaction(merchantAccountAddress: Address, templateId: UInt64){
    let nftRecipiant: &Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic}
    var mintPriceUFix64: UFix64
    let paymentVault: @FungibleToken.Vault

    prepare(dapper: AuthAccount, buyer: AuthAccount) {
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

        let ducVault  = dapper.borrow<&DapperUtilityCoin.Vault>(from: /storage/dapperUtilityCoinVault)
            ?? panic("Cannot borrow DUC vault from dapper storage")

        var tempVault <- ducVault.withdraw(amount: 0.0)
        let mintPriceDuc: MindtrixViews.FT = template.getMintPrice(identifier: DapperUtilityCoin.getType().identifier)!
        self.mintPriceUFix64 = mintPriceDuc.price
       if paymentType == Type<@DapperUtilityCoin.Vault>(){

            let oldDucVault <- tempVault <- ducVault.withdraw(amount: self.mintPriceUFix64)
            destroy oldDucVault

            receiverPath = /public/dapperUtilityCoinReceiver

       } else if paymentType == Type<@FlowUtilityToken.Vault>() {

        let mintPriceFut: MindtrixViews.FT = template.getMintPrice(identifier: FlowUtilityToken.getType().identifier)!
        self.mintPriceUFix64 = mintPriceFut.price
        let futVault = dapper.borrow<&FlowUtilityToken.Vault>(from: /storage/flowUtilityTokenVault)
                ?? panic("Cannot borrow FUT vault from dapper storage")

        let oldVault <- tempVault <- futVault.withdraw(amount: 0.0)
        destroy oldVault

        let oldFutVault <- tempVault <- futVault.withdraw(amount: self.mintPriceUFix64)
        destroy oldFutVault

        receiverPath = /public/flowUtilityTokenReceiver

       }
        self.paymentVault <- tempVault
    }

    execute {
        MindtrixTemplate.buyNFT(recipient: self.nftRecipiant, paymentVault: <- self.paymentVault, mintPriceUFix64: self.mintPriceUFix64, templateId: templateId, merchantAccount: merchantAccountAddress)
    }
}
