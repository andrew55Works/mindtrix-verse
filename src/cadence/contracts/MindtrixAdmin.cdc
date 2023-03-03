// testnet
// import FungibleToken from 0x9a0766d93b6608b7
// import NonFungibleToken from 0x631e88ae7f1d7c20
// import MetadataViews from 0x631e88ae7f1d7c20
// import MindtrixViews from 0xd162b02676d63c36
// import Mindtrix from 0xd162b02676d63c36
// import MindtrixEssence from 0xd162b02676d63c36
// import MindtrixDonationV2 from 0xd162b02676d63c36

// emulator
import FungibleToken from 0xee82856bf20e2aa6
import NonFungibleToken from 0xf8d6e0586b0a20c7
import MetadataViews from 0xf8d6e0586b0a20c7
import MindtrixViews from 0xf8d6e0586b0a20c7
import Mindtrix from 0xf8d6e0586b0a20c7
import MindtrixEssence from 0xf8d6e0586b0a20c7
import MindtrixDonationV2 from 0xf8d6e0586b0a20c7
import MindtrixPack from 0xf8d6e0586b0a20c7

// dev
// import FungibleToken from "./FungibleToken.cdc"
// import NonFungibleToken from "./NonFungibleToken.cdc"
// import MetadataViews from "./MetadataViews.cdc"
// import MindtrixViews from "./MindtrixViews.cdc"
// import Mindtrix from "./Mindtrix.cdc"
// import MindtrixEssence from "./MindtrixEssence.cdc"
// import MindtrixDonationV2 from "./MindtrixDonationV2.cdc"
// import MindtrixPack from "./MindtrixPack.cdc"

pub contract MindtrixAdmin {

    // ========================================================
    //                          PATH
    // ========================================================

    /// Path where the `Admin` is stored
    pub let MindtrixAdminStoragePath: StoragePath

    /// Path where the private capability for the `Admin` is available
    pub let MindtrixAdminPrivatePath: PrivatePath

    // ========================================================
    //               COMPOSITE TYPES: RESOURCE
    // ========================================================    
 
    pub resource Admin: MindtrixViews.IPackAdminOpener , MindtrixViews.IPackAdminCreator {

        pub fun freeMintNFTFromEssence(recipient: &{NonFungibleToken.CollectionPublic}, essenceId: UInt64, nftAudioPreviewUrl: String?) {
            pre {
                    (MindtrixEssence.getOneEssenceStruct(essenceId: essenceId)?.getMintPrice() ?? nil) == nil: "You have to purchase this essence."
                    (MindtrixEssence.getOneEssenceStruct(essenceId: essenceId)?.getEssenceClaimable() ?? false) == true : "This Essence is not claimable, and thus not currently active."
                }
            // early return if essenceStruct is nil
            let essenceStruct = MindtrixEssence.getOneEssenceStruct(essenceId: essenceId)!
            log("freeMintNFTFromEssence essence:")
            log(essenceStruct)
            // verify minting conditions
            assert(essenceStruct.verifyMintingConditions(
                recipient: recipient, essenceStruct: essenceStruct) == true,
                message: "Cannot pass the minting conditions."
            );
            log("pass all verifyMintingConditions")
            let essenceMetadata = essenceStruct.getMetadata()
            let mintedEdition = essenceStruct.currentEdition + 1
            let isAudioFileExist = nftAudioPreviewUrl != nil
            let nftMetadata: {String: String} = {
                "nftName": essenceMetadata["essenceName"] ?? "",
                "nftDescription": essenceMetadata["essenceDescription"] ?? "",
                "essenceId": essenceId.toString(),
                "showGuid": essenceMetadata["showGuid"] ?? "",
                "collectionName": essenceMetadata["collectionName"] ?? "",
                "collectionDescription": essenceMetadata["collectionDescription"] ?? "",
                // collectionExternalURL is the Podcast link from the hosting platform.
                "collectionExternalURL": essenceMetadata["collectionExternalURL"] ?? "",
                "collectionSquareImageUrl": essenceMetadata["collectionSquareImageUrl"] ?? "",
                "collectionSquareImageType": essenceMetadata["collectionSquareImageType"] ?? "",
                "collectionBannerImageUrl": essenceMetadata["collectionBannerImageUrl"] ?? "",
                "collectionBannerImageType": essenceMetadata["collectionBannerImageType"] ?? "",
                // essenceExternalURL is the Essence page from Mindtrix Marketplace.
                "essenceExternalURL": essenceMetadata["essenceExternalURL"] ?? "",
                "episodeGuid": essenceMetadata["episodeGuid"] ?? "",
                "nftExternalURL": essenceMetadata["nftExternalURL"] ?? "",
                "nftFileIPFSCid": essenceMetadata["essenceFileIPFSCid"] ?? "",
                "nftFileIPFSDirectory": essenceMetadata["essenceFileIPFSDirectory"] ?? "",
                "nftFilePreviewUrl": essenceMetadata["essenceFilePreviewUrl"] ?? "",
                "nftAudioPreviewUrl": isAudioFileExist ? nftAudioPreviewUrl! : "",
                "nftImagePreviewUrl": essenceMetadata["essenceImagePreviewUrl"] ?? "",
                "nftVideoPreviewUrl": essenceMetadata["essenceVideoPreviewUrl"] ?? "",
                "essenceRealmSerial": essenceMetadata["essenceRealmSerial"] ?? "",
                "essenceTypeSerial": essenceMetadata["essenceTypeSerial"] ?? "",
                "showSerial": essenceMetadata["showSerial"] ?? "",
                "episodeSerial": essenceMetadata["episodeSerial"] ?? "",
                "audioEssenceSerial": essenceMetadata["audioEssenceSerial"] ?? "",
                "nftEditionSerial": mintedEdition.toString(),
                "licenseIdentifier": essenceMetadata["licenseIdentifier"] ?? "",
                "audioStartTime": essenceMetadata["audioStartTime"] ?? "",
                "audioEndTime": essenceMetadata["audioEndTime"] ?? "",
                "fullEpisodeDuration": essenceMetadata["fullEpisodeDuration"] ?? ""
            }

            var orgRoyalties = essenceStruct.getRoyalties() as! [MetadataViews.Royalty]
            var royaltiesMap: {Address: MetadataViews.Royalty} = {}
            // the royalties address should not be duplicated
            for royalty in orgRoyalties {
                let receipientAddress = royalty.receiver.address
                if !royaltiesMap.containsKey(receipientAddress) {
                    royaltiesMap.insert(key: receipientAddress, royalty)
                }
            }
            let newRoyalties = royaltiesMap.values

            let data = Mindtrix.NFTStruct(
                nftId: nil,
                essenceId: essenceStruct.essenceId,
                nftEdition: mintedEdition,
                currentHolder: recipient.owner!.address,
                createdTime: getCurrentBlock().timestamp,
                royalties: newRoyalties,
                metadata: nftMetadata,
                socials: essenceStruct.socials,
                components: essenceStruct.components
            )
            recipient.deposit(token: <-  Mindtrix.mintNFT(data: data))
        }

        /// Essence Utilities
        pub fun updateEssenceMetadata(essenceId: UInt64, newMetadata: {String: String}){
            let essence = MindtrixEssence.getOneEssenceStruct(essenceId: essenceId)!
            essence.updateMetadata(newMetadata: newMetadata)
        }

        // Update essence preview URL
        pub fun updatePreviewURL(essenceId: UInt64, essenceVideoPreviewUrl: String?, essenceImagePreviewUrl: String?){
            let essence = MindtrixEssence.getOneEssenceStruct(essenceId: essenceId)!
            essence.updatePreviewURL(essenceVideoPreviewUrl: essenceVideoPreviewUrl ?? "", essenceImagePreviewUrl: essenceImagePreviewUrl ?? "")
        }

        pub fun replaceShowGuidToRoyalties(showGuid: String, creatorAddress: Address, primaryRoyalties: [MetadataViews.Royalty], secondaryRoyalties: [MetadataViews.Royalty]){
            MindtrixDonationV2.replaceShowGuidToRoyalties(showGuid: showGuid, creatorAddress: creatorAddress, primaryRoyalties: primaryRoyalties, secondaryRoyalties: secondaryRoyalties)
        }

        /// MindtrixPack Utilities
        // 
        pub fun createPackTemplate(strMetadata: {String: String}, intMetadata: {String: UInt64}, totalSupply: UInt64, verifiers: {String: {MindtrixViews.IVerifier}}) : UInt64 {
            var newPackTemplate = MindtrixPack.createPackTemplate(strMetadata: strMetadata, intMetadata: intMetadata, totalSupply: totalSupply, verifiers: verifiers)
            return newPackTemplate.templateId
        }

        pub fun createPack(packTemplate: {MindtrixViews.IPackTemplate}, adminRef: Capability<&{MindtrixViews.IPackAdminOpener}>, owner: Address, royalties: [MetadataViews.Royalty]) : @NonFungibleToken.NFT {
            return <- MindtrixPack.createPack(packTemplate: packTemplate, adminRef: adminRef, owner: owner, royalties: royalties)
        }

        pub fun openPack(userPack: &{MindtrixViews.IPack}, packID: UInt64, owner: Address, royalties: [MetadataViews.Royalty]): @[NonFungibleToken.NFT] {
            pre {
                !userPack.isOpen : "User Pack must be closed"    
                !MindtrixPack.checkPackTemplateLocked(packTemplateId: userPack.templateId): "pack template is locked"
            }

            let packTemplate = MindtrixPack.getPackTemplate(templateId: userPack.templateId)! 
            var nfts: @[NonFungibleToken.NFT] <- []

           
            let token <- self.mintNFT(templateId: userPack.templateId, packID: packID, owner: owner, royalties: royalties)
            nfts.append(<- token)

            MindtrixPack.updatePackTemplate(packTemplate: packTemplate)

            return <- nfts
        }

        pub fun mintNFT(templateId: UInt64, packID: UInt64, owner: Address, royalties: [MetadataViews.Royalty]): @Mindtrix.NFT {
            let packTemplate = MindtrixPack.getPackTemplate(templateId: templateId)!
            var royalties: [MetadataViews.Royalty] = []
            let data = Mindtrix.NFTStruct(
                nftId: nil,
                essenceId: templateId,
                nftEdition: packTemplate.currentEdition,
                currentHolder: owner,
                createdTime: getCurrentBlock().timestamp,
                royalties: royalties,
                metadata: packTemplate.strMetadata,
                socials: {},
                components: {}
            )
            return <-  Mindtrix.mintNFT(data: data)
        }

    }

    init() {

        self.MindtrixAdminStoragePath = /storage/MindtrixAdmin
        self.MindtrixAdminPrivatePath = /private/MindtrixAdmin


        if self.account.borrow<&MindtrixAdmin.Admin>(from: MindtrixAdmin.MindtrixAdminStoragePath) == nil {
            self.account.save<@MindtrixAdmin.Admin>(<- create MindtrixAdmin.Admin(), to: MindtrixAdmin.MindtrixAdminStoragePath)
        }

        self.account.link<&MindtrixAdmin.Admin>(MindtrixAdmin.MindtrixAdminPrivatePath, target: MindtrixAdmin.MindtrixAdminStoragePath)!
    }

}
 