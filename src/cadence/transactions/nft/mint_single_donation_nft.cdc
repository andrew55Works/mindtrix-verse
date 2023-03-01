import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonfungibleToken
import MetadataViews from 0xMetadataViews
import MindtrixViews from 0xMindtrixNFT
import MindtrixDonationV2 from 0xMindtrixNFT
import Mindtrix from 0xMindtrixNFT
import MindtrixEssence from 0xMindtrixNFT
import FlowToken from 0xFlowToken

transaction(
    creatorAddress: Address,
    donorAddress: Address,
    offChainedId: String,
    mintPrice: UFix64,
    royaltyDictionary: {Address: [AnyStruct]},
    metadata: {String: String},
    socials: {String: String},
) {

    let donorNFTCollection: &{NonFungibleToken.CollectionPublic}
    let flowTokenVault: &FlowToken.Vault

    prepare(signer: AuthAccount) {
        let flowTokenReceiverPunblicPath = /public/flowTokenReceiver
        let flowTokenBalancePunblicPath = /public/flowTokenBalance
        let flowTokenStoragePath = /storage/flowTokenVault

        // Setup Mindtrix Essence collection
        if signer.borrow<&MindtrixEssence.EssenceCollection>(from: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath) == nil {
            signer.save(<- MindtrixEssence.createEmptyEssenceCollection(), to: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath)
            signer.link<&MindtrixEssence.EssenceCollection>(MindtrixEssence.MindtrixEssenceV2CollectionPublicPath, target: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath)
            log("Init Mindtirx Essence successful.")
        }

        // Setup Mindtrix NFT Collection
        if signer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
            signer.save(<-Mindtrix.createEmptyCollection(), to: Mindtrix.MindtrixCollectionStoragePath)
            signer.link<&{NonFungibleToken.CollectionPublic, Mindtrix.MindtrixCollectionPublic, MetadataViews.ResolverCollection}>(
                Mindtrix.MindtrixCollectionPublicPath,
                target: Mindtrix.MindtrixCollectionStoragePath
            )
            log("Init Mindtirx collection successful.")
        }

        // Setup FlowToken
        if signer.borrow<&FlowToken.Vault>(from: flowTokenStoragePath) == nil {
            signer.save(<-FlowToken.createEmptyVault(), to: flowTokenStoragePath)
            signer.link<&FlowToken.Vault{FungibleToken.Receiver}>(
                flowTokenReceiverPunblicPath,
                target: flowTokenStoragePath
            )
            signer.link<&FlowToken.Vault{FungibleToken.Balance}>(
                flowTokenBalancePunblicPath,
                target: flowTokenStoragePath
            )
            log("Init Flow Vault successful.")
        }

         // Borrow the recipient's public NFT collection reference, so the recipient needs to init storage at front-end
        self.donorNFTCollection = getAccount(donorAddress)
            .getCapability(Mindtrix.MindtrixCollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        self.flowTokenVault = signer.borrow<&FlowToken.Vault>(from: flowTokenStoragePath)
                ?? panic("Could not borrow the FlowToken.Vault from the signer.")
    }

    execute {

        var royalties: [MetadataViews.Royalty] = []
            let royaltyReceiverPublicPath: PublicPath = /public/flowTokenReceiver

            for key in royaltyDictionary.keys {
            let beneficiaryCapability = getAccount(key)
                .getCapability<&{FungibleToken.Receiver}>(royaltyReceiverPublicPath)
            if !beneficiaryCapability.check() { panic("Beneficiary capability is not valid!") }

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
        log("essence price:".concat(mintPrice.toString()))
        if mintPrice > 0.0 {
            let payment <- self.flowTokenVault.withdraw(amount: mintPrice)
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

            log("donationMint essenceStruct:")
            log(essenceStruct)

            let mintPrices = essenceStruct.getMintPrice()
            MindtrixDonationV2.mintNFTFromDonation(
                creatorAddress: creatorAddress,
                offChainedId: offChainedId,
                donorNFTCollection: self.donorNFTCollection,
                payment: <- payment,
                essenceStruct: essenceStruct
            )
            log("Mint NFT from Donation success!")
        } else {
            mindtPriceDic = nil
            log("Mint failed because the donation price should not be free")
        }
    }
}

