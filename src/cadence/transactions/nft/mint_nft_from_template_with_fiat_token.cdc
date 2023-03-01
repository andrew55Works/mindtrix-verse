import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonfungibleToken
import FlowToken from 0xFlowToken
import FiatToken from 0xFiatToken
import MetadataViews from 0xMetadataViews
import Mindtrix from 0xMindtrixNFT
import MindtrixTemplate from 0xMindtrixNFT
import MindtrixViews from 0xMindtrixNFT
import FUSD from 0xFusdToken

// This txn is for a donor to mint podcast NFTs with $DUC and $FUT
transaction(templateId: UInt64, paymentIdentifier: String){
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

        if (buyer.getCapability<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/MindtrixNFTCollection).borrow() == nil) {
           buyer.unlink(/public/MindtrixNFTCollection)
           buyer.link<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(/public/MindtrixNFTCollection, target: /storage/MindtrixNFTCollection)
        }
        self.nftRecipiant = buyer.getCapability<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic}>(Mindtrix.MindtrixCollectionPublicPath).borrow() ?? panic("Cannot borrow Mindtrix Collection. Please setup first")

        var buyerCap: CapabilityPath = /public/dapperUtilityCoinReceiver
        let template = MindtrixTemplate.getMindtrixTemplateByTemplateId(templateId: templateId) ?? panic("Cannot get specific template.")
        // templateStatus: : 1. DRAFT 2. SCHEDULED 3. LISTING 4. EXPIRED
        assert(template.getIntMetadata()["templateStatus"]! == 3, message: "The template is not ready to mint!")

        var tokenVault: &FungibleToken.Vault? = nil

        switch paymentIdentifier {
            case FlowToken.getType().identifier:
                tokenVault = buyer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) ?? panic("Cannot borrow the vault from acct storage")
            case FiatToken.getType().identifier:
                tokenVault = buyer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath) ?? panic("Cannot borrow the FiatVault from acct storage")
            case FUSD.getType().identifier:
                tokenVault = buyer.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Cannot borrow the FUSD from acct storage")
            default:
                tokenVault = buyer.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Cannot borrow the FUSD from acct storage")
        }

        let mintPriceDuc: MindtrixViews.FT = template.getMintPrice(identifier: paymentIdentifier)
            ?? panic("Cannot support your token payment:".concat(paymentIdentifier))
        self.mintPriceUFix64 = mintPriceDuc.price

        self.paymentVault <- tokenVault!.withdraw(amount: self.mintPriceUFix64)
    }

    execute {
        // TODO: buyNFT 中做分潤
        MindtrixTemplate.buyNFT(recipient: self.nftRecipiant, paymentVault: <- self.paymentVault, mintPriceUFix64: self.mintPriceUFix64, templateId: templateId, merchantAccount: nil)
    }
}
