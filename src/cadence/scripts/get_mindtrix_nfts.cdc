import Mindtrix from 0xMindtrixNFT
import MindtrixEssence from 0xMindtrixEssence

// import Mindtrix from "../contracts/Mindtrix.cdc"
// import MindtrixEssence from "../contracts/MindtrixEssence.cdc"

pub fun main(address: Address): [Mindtrix.NFTStruct] {
    let account = getAccount(address)
    let nfts: [Mindtrix.NFTStruct] = []

    let collection = account
        .getCapability(Mindtrix.MindtrixCollectionPublicPath)
        .borrow<&{Mindtrix.MindtrixCollectionPublic}>()
        ?? panic("Could not borrow a reference to the collection")

    let nftIds = collection.getIDs();
    for id in nftIds {
        let nftStruct = collection.borrowNFTStruct(id: id)
        let essenceId = nftStruct.essenceId
        let copiedNFTMetadata = nftStruct.getMetadata()
        let royalties = nftStruct.getRoyalties()
        let metadata = nftStruct.getMetadata()
        copiedNFTMetadata["collectionDescription"] = metadata["collectionDescription"] ?? ""
        copiedNFTMetadata["collectionExternalURL"] = metadata["collectionExternalURL"] ?? ""
        copiedNFTMetadata["collectionName"] = metadata["collectionName"] ?? ""
        copiedNFTMetadata["collectionSocials"] = metadata["collectionSocials"] ?? ""
        copiedNFTMetadata["collectionSquareImageURL"] = metadata["collectionSquareImageURL"] ?? ""

        nfts.append(Mindtrix.NFTStruct(
            nftId: nftStruct.nftId,
            essenceId: nftStruct.essenceId,
            nftEdition: nftStruct.nftEdition,
            currentHolder: nftStruct.currentHolder,
            createdTime: nftStruct.createdTime,
            royalties: royalties,
            metadata: copiedNFTMetadata,
            socials: nftStruct.socials,
            components: nftStruct.components
        ))
    }

    return nfts
}

 