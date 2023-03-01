import Mindtrix from 0xd162b02676d63c36
import MetadataViews from 0x631e88ae7f1d7c20
import NFTStorefrontV2 from 0x2d55b98eb200daef
import DapperUtilityCoin from 0x82ec283f88a62e65

// IMPORTANT: Parameter list below should match the parameter list passed to the associated purchase txn
// Please also make sure that the argument order list should be same as that of the associated purchase txn
//pub fun main(merchantAccountAddress: Address, address: Address, listingResourceID: UInt64, expectedPrice: UFix64): PurchaseData {

pub fun main(
    merchantAccountAddress: Address,
    donationId: UInt64,
    creatorAddress: Address,
    donorAddress: Address,
    offChainedId: String,
    mintPrice: UFix64,
    royaltyDictionary: {Address: [AnyStruct]},
    metadata: {String: String},
    socials: {String: String}
    ): Mindtrix.NFTStruct {

    let account = getAccount(donorAddress)

    let collection = account
        .getCapability(Mindtrix.MindtrixCollectionPublicPath)
        .borrow<&{Mindtrix.MindtrixCollectionPublic}>()
        ?? panic("Could not borrow a reference to the collection")

    let nftStruct = collection.borrowNFTStruct(id: donationId)

    let essenceId = nftStruct.essenceId
    let copiedNFTMetadata = nftStruct.getMetadata()
    let royalties = nftStruct.getRoyalties()
    let _metadata = nftStruct.getMetadata()
    copiedNFTMetadata["collectionDescription"] = _metadata["collectionDescription"] ?? ""
    copiedNFTMetadata["collectionExternalURL"] = _metadata["collectionExternalURL"] ?? ""
    copiedNFTMetadata["collectionName"] = _metadata["collectionName"] ?? ""
    copiedNFTMetadata["collectionSocials"] = _metadata["collectionSocials"] ?? ""
    copiedNFTMetadata["collectionSquareImageURL"] = _metadata["collectionSquareImageURL"] ?? ""

    return Mindtrix.NFTStruct(
        nftId: nftStruct.nftId,
        essenceId: nftStruct.essenceId,
        nftEdition: nftStruct.nftEdition,
        currentHolder: nftStruct.currentHolder,
        createdTime: nftStruct.createdTime,
        royalties: royalties,
        metadata: copiedNFTMetadata,
        socials: nftStruct.socials,
        components: nftStruct.components
    )
}
