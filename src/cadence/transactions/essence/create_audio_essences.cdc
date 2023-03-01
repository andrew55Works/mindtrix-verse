import NonFungibleToken from 0xNonfungibleToken
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import MetadataViews from 0xMetadataViews
import MindtrixViews from  0xMindtrixNFT
import Mindtrix from 0xMindtrixNFT
import MindtrixEssence from  0xMindtrixEssence
import MindtrixVerifier from 0xMindtrixNFTVerifier

transaction(
    essenceOffChainIds: [String],
    maxEditions: [UInt64],
    mintPrices: [UFix64],
    royaltyDictionary: {Address: [AnyStruct]},
    metadatas: [{String: String}],
    socials: [{String: String}],
    isEnableTimeLocks: [Bool],
    isEnableLimitedQuantities: [Bool],
    publicMintStartTimes: [UInt64],
    publicMintEndTimes: [UInt64]
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

        var mintPriceDics: [{String: MindtrixViews.FT}?] = []
        var verifiersList: [[{MindtrixViews.IVerifier}]] = []

        var i = 0
        for essenceOffChainId in essenceOffChainIds {
            log("i:")
            log(i)
            var verifiers: [{MindtrixViews.IVerifier}] = []

            var TimeLock: MindtrixVerifier.TimeLock? = nil
            var LimitedQuantity: MindtrixVerifier.LimitedQuantity? = nil
            // Add the price check for premium mint
            // var MinimumBalance: FLOATVerifiers.MinimumBalance? = nil
            log("publicMintStartTimes:")
            log(publicMintStartTimes[i])

            log("publicMintEndTimes:")
            log(publicMintEndTimes[i])
            // init verifier
            if isEnableTimeLocks[i] {
                let issueStartTime = UFix64(publicMintStartTimes[i]!)
                let issueEndTime = UFix64(publicMintEndTimes[i]!)
                TimeLock = MindtrixVerifier.TimeLock(startTime: issueStartTime, endTime: issueEndTime)
                verifiers.append(TimeLock!)
            }

            if isEnableLimitedQuantities[i] {
                LimitedQuantity = MindtrixVerifier.LimitedQuantity(maxEdition: maxEditions[i], maxMintTimesPerAddress: 1)
                verifiers.append(LimitedQuantity!)
            }

            log("verifiers before create:")
            log(verifiers)

            let mintPrice = mintPrices[i]
            log("essence price:".concat(mintPrice.toString()))
            if mintPrice > 0.0 {
                mintPriceDics.append({
                    "A.1654653399040a61.FlowToken.Vault":
                    MindtrixViews.FT(path: /public/flowTokenReceiver, price: mintPrice)
                })
            } else {
                mintPriceDics.append(nil)
            }

            verifiersList.append(verifiers)
            i = i + 1
        }


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

        // Mint the NFT and deposit it to the recipient's collection
        self.essenceCollection.batchCreateEssence(
            essenceOffChainIds: essenceOffChainIds,
            maxEditions: maxEditions,
            mintPrices: mintPriceDics,
            royalties: royalties,
            metadatas: metadatas,
            socials: socials,
            verifiers: verifiersList
        )
    }

    post {
        // check if the new Essence Exist in the authAccount's dictionary
    }
}
