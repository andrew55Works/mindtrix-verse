import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import MindtrixViews from  0xd162b02676d63c36
import MindtrixDonationV2 from  0xd162b02676d63c36
import Mindtrix from 0xd162b02676d63c36
import MindtrixEssence from  0xd162b02676d63c36
import DapperUtilityCoin from 0x82ec283f88a62e65

// This transaction purchases an NFT from a dapp directly (i.e. **not** on a peer-to-peer marketplace).
transaction(
    merchantAccountAddress: Address,
    donationId: UInt64,
    creatorAddress: Address,
    donorAddress: Address,
    offChainedId: String,
    mintPrice: UFix64,
    royaltyDictionary: {Address: [AnyStruct]},
    metadata: {String: String},
    socials: {String: String}
    ) {

    let paymentVault: @FungibleToken.Vault
    let nftCollection: &Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}
    let balanceBeforeTransfer: UFix64
    let mainDucVault: &DapperUtilityCoin.Vault

    prepare(dapper: AuthAccount, buyer: AuthAccount) {

        // Setup Mindtrix Essence collection
        if buyer.borrow<&MindtrixEssence.EssenceCollection>(from: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath) == nil {
            buyer.save(<- MindtrixEssence.createEmptyEssenceCollection(), to: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath)
            buyer.link<&MindtrixEssence.EssenceCollection>(
                MindtrixEssence.MindtrixEssenceV2CollectionPublicPath, 
                target: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath
            )
        }

        // Initialize the buyer''s Mindtrix collection if they do not already have one
        if buyer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
            let collection <- Mindtrix.createEmptyCollection()
            buyer.save(<-collection, to: Mindtrix.MindtrixCollectionStoragePath)
        }
        
        if buyer.getCapability<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(Mindtrix.MindtrixCollectionPublicPath).borrow() == nil {
            buyer.unlink(Mindtrix.MindtrixCollectionPublicPath)
            buyer.link<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(Mindtrix.MindtrixCollectionPublicPath, target: Mindtrix.MindtrixCollectionStoragePath)
        }

        // Get access to Dapper's DUC vault
        self.mainDucVault = dapper.borrow<&DapperUtilityCoin.Vault>(from: /storage/dapperUtilityCoinVault)
            ?? panic("Cannot borrow UtilityCoin vault from account storage")

        // Withdraw the appropriate amount of DUC from the vault
        self.balanceBeforeTransfer = self.mainDucVault.balance
        self.paymentVault <- self.mainDucVault.withdraw(amount: mintPrice)

        // Get the collection from the buyer so the NFT can be deposited into it
        self.nftCollection = buyer
            .getCapability<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic, NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(Mindtrix.MindtrixCollectionPublicPath)
            .borrow()
            ?? panic("Could not borrow Mindtrix Collection from provided address")
    }

    pre {
      // Ensure legit merchant account 
      merchantAccountAddress == 0x4a379202282d51cf: "Malformed merchant account address"
    }

    execute {
        var residualReceiver: &{FungibleToken.Receiver}? = nil

        var royalties: [MetadataViews.Royalty] = []
        let royaltyReceiverPublicPath: PublicPath = /public/dapperUtilityCoinReceiver

            for key in royaltyDictionary.keys {
            let isCreatorAddress = key == creatorAddress
            let beneficiaryCapability = getAccount(key).getCapability<&{FungibleToken.Receiver}>(royaltyReceiverPublicPath)
            assert(beneficiaryCapability.check(), message: "Recipient doesn't have $DUC receiving capability")

            if(isCreatorAddress) {
                residualReceiver = beneficiaryCapability.borrow()!
            }

            let nestedDictionary = royaltyDictionary[key] ?? [0.0, ""]
            let cut = nestedDictionary[0] as? UFix64!
            let description = nestedDictionary[1] as? String!

            assert(cut != nil && description != nil, message: "Both the cut and description should be mappable and not be nil.")

            royalties.append(
                MetadataViews.Royalty(
                    receiver: beneficiaryCapability,
                    cut: cut,
                    description: description,
                )
            )
        }

        var mindtPriceDic: {String: MindtrixViews.FT}? = {}

        if mintPrice > 0.0 {
            let payment <- self.paymentVault.withdraw(amount: mintPrice)
            mindtPriceDic!.insert(key: payment.getType().identifier,  MindtrixViews.FT(path: /public/flowTokenReceiver, price: mintPrice))

            let essenceStruct = MindtrixEssence.EssenceStruct(
                essenceId: 0,
                essenceOffChainId: offChainedId,
                essenceClaimable: true,
                maxEdition: 0,
                currentEdition: 0,
                createdTime: getCurrentBlock().timestamp,
                mintPrices: mindtPriceDic,
                royalties: royalties,
                metadata: metadata,
                socials: socials,
                verifiers: {},
                components: {}
            )

            let mintPrices = essenceStruct.getMintPrice()

            assert(residualReceiver != nil, message: "No valid payment receivers")

            // At this point, if all recievers were active and availabile, then the payment Vault will have
            // zero tokens left, and this will functionally be a no-op that consumes the empty vault
            if self.paymentVault.balance > 0.0 {
                residualReceiver!.deposit(from: <-self.paymentVault)
            } else {
                destroy self.paymentVault
            }

            MindtrixDonationV2.mintNFTFromDonation(
                creatorAddress: creatorAddress,
                offChainedId: offChainedId,
                donorNFTCollection: self.nftCollection,
                payment: <- payment,
                essenceStruct: essenceStruct
            )
            // "Mint NFT from Donation success!"
        } else {
            self.mainDucVault.deposit(from: <- self.paymentVault)
            mindtPriceDic = nil
            // "Mint failed because the donation price should not be free"
        }
    }

    // Check that all utilityCoin was routed back to Dapper
    post {
        self.mainDucVault.balance == self.balanceBeforeTransfer: "UtilityCoin leakage"
    }
}