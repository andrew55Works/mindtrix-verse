import NonFungibleToken from 0xNonfungibleToken
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import MetadataViews from 0xMetadataViews
import MindtrixViews from  0xMindtrixNFT
import Mindtrix from 0xMindtrixNFT
import MindtrixEssence from  0xMindtrixEssence
import MindtrixVerifier from 0xMindtrixNFTVerifier

transaction(
    essenceOffChainId: String,
    maxEdition: UInt64,
    mintPrice: UFix64,
    royaltyDictionary: {Address: [AnyStruct]},
    metadata: {String: String},
    socials: {String: String},
    isEnableTimeLock: Bool,
    isEnableLimitedQuantity: Bool,
    publicMintStartTime: UInt64,
    publicMintEndTime: UInt64
) {
    /// Reference to the receiver's collection
    let essenceCollection: &MindtrixEssence.EssenceCollection

    prepare(signer: AuthAccount) {

        if signer.borrow<&MindtrixEssence.EssenceCollection>(from: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath) == nil {
            signer.save(<- MindtrixEssence.createEmptyEssenceCollection(), to: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath)
            signer.link<&MindtrixEssence.EssenceCollection>(MindtrixEssence.MindtrixEssenceV2CollectionPublicPath, target: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath)
            log("Init Mindtirx Essence successful.")
        }

        if signer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
            signer.save(<-Mindtrix.createEmptyCollection(), to: Mindtrix.MindtrixCollectionStoragePath)
            signer.link<&{NonFungibleToken.CollectionPublic, Mindtrix.MindtrixCollectionPublic, MetadataViews.ResolverCollection}>(
                Mindtrix.MindtrixCollectionPublicPath,
                target: Mindtrix.MindtrixCollectionStoragePath
            )
            log("Init Mindtirx collection successful.")
        }

        if signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) == nil {
            signer.save(<-FlowToken.createEmptyVault(), to: /storage/flowTokenVault)
            signer.link<&FlowToken.Vault{FungibleToken.Receiver}>(
                /public/flowTokenReceiver,
                target: /storage/flowTokenVault
            )
            signer.link<&FlowToken.Vault{FungibleToken.Balance}>(
                /public/flowTokenBalance,
                target: /storage/flowTokenVault
            )
            log("Init Flow Vault successful.")
        }

        // Borrow the creators'essence public NFT reference
        self.essenceCollection = signer
            .borrow<&MindtrixEssence.EssenceCollection>(from: MindtrixEssence.MindtrixEssenceV2CollectionStoragePath)
            ?? panic("Could not get receiver reference to the NFT Collection")

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

        var TimeLock: MindtrixVerifier.TimeLock? = nil
        var LimitedQuantity: MindtrixVerifier.LimitedQuantity? = nil
        // Add the price check for premium mint
        // var MinimumBalance: FLOATVerifiers.MinimumBalance? = nil
        let verifiers: [{MindtrixViews.IVerifier}] = []
        // init verifier
        if isEnableTimeLock {
            TimeLock = MindtrixVerifier.TimeLock(
                startTime: UFix64(publicMintStartTime),
                endTime: UFix64(publicMintEndTime)
            )
            verifiers.append(TimeLock!)
        }

        if isEnableLimitedQuantity {
            LimitedQuantity = MindtrixVerifier.LimitedQuantity(maxEdition: maxEdition, maxMintTimesPerAddress: 1)
            verifiers.append(LimitedQuantity!)
        }

        log("verifiers before create:")
        log(verifiers)
        var prices: {String: MindtrixViews.FT}? = {}
        log("essence price:".concat(mintPrice.toString()))
        if mintPrice > 0.0 {
            prices = {
                "A.1654653399040a61.FlowToken.Vault":
                MindtrixViews.FT(path: /public/flowTokenReceiver, price: mintPrice)
            }
        } else {
            prices = nil
        }


        // Mint the NFT and deposit it to the recipient's collection
        self.essenceCollection.createEssence(
            essenceOffChainId: essenceOffChainId,
            maxEdition: maxEdition,
            mintPrices: prices,
            royalties: royalties,
            metadata: metadata,
            socials: socials,
            verifiers: verifiers,
            components: {}
        )
    }

    post {
        // check if the new Essence Exist in the authAccount's dictionary
    }
}
