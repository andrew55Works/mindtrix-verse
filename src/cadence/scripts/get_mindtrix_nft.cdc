import Mindtrix from 0xMindtrixNFT
import Essence from  0xMindtrixEssence
import MetadataViews from 0xMetadataViews

// import Mindtrix from "../contracts/Mindtrix.cdc"
// import MetadataViews from "../contracts/MetadataViews.cdc"

pub struct NFT {
    pub let name: String
    pub let description: String
    pub let thumbnail: String
    pub let mintedTime: UFix64
    pub let ipfsUrl: String
    pub let ipfsFile: MetadataViews.IPFSFile
    pub let owner: Address
    pub let type: String
    pub let royalties: [MetadataViews.Royalty]
    pub let serialNumber: UInt64
    pub let collectionPublicPath: PublicPath
    pub let collectionStoragePath: StoragePath
    pub let collectionProviderPath: PrivatePath
    pub let collectionPublic: String
    pub let collectionPublicLinkedType: String
    pub let collectionProviderLinkedType: String
    pub let collectionName: String
    pub let collectionDescription: String
    pub let collectionExternalURL: String
    pub let collectionSquareImage: String
    pub let collectionBannerImage: String
    pub let collectionSocials: {String: String}
    pub let essenceIdentifier: Essence.EssenceIdentifier
    pub let edition: MetadataViews.Edition
    pub let license: String

    init(
        name: String,
        description: String,
        thumbnail: String,
        mintedTime: UFix64,
        ipfsUrl: String,
        ipfsFile: MetadataViews.IPFSFile,
        owner: Address,
        nftType: String,
        royalties: [MetadataViews.Royalty],
        serialNumber: UInt64,
        collectionPublicPath: PublicPath,
        collectionStoragePath: StoragePath,
        collectionProviderPath: PrivatePath,
        collectionPublic: String,
        collectionPublicLinkedType: String,
        collectionProviderLinkedType: String,
        collectionName: String,
        collectionDescription: String,
        collectionExternalURL: String,
        collectionSquareImage: String,
        collectionBannerImage: String,
        collectionSocials: {String: String},
        edition: MetadataViews.Edition,
        essenceIdentifier: Essence.EssenceIdentifier,
        license: String
    ) {
        self.name = name
        self.description = description
        self.thumbnail = thumbnail
        self.mintedTime = mintedTime
        self.ipfsUrl = ipfsUrl
        self.ipfsFile = ipfsFile
        self.owner = owner
        self.type = nftType
        self.royalties = royalties
        self.serialNumber = serialNumber
        self.collectionPublicPath = collectionPublicPath
        self.collectionStoragePath = collectionStoragePath
        self.collectionProviderPath = collectionProviderPath
        self.collectionPublic = collectionPublic
        self.collectionPublicLinkedType = collectionPublicLinkedType
        self.collectionProviderLinkedType = collectionProviderLinkedType
        self.collectionName = collectionName
        self.collectionDescription = collectionDescription
        self.collectionExternalURL = collectionExternalURL
        self.collectionSquareImage = collectionSquareImage
        self.collectionBannerImage = collectionBannerImage
        self.collectionSocials = collectionSocials
        self.essenceIdentifier = essenceIdentifier
        self.edition = edition
        self.license = license
    }
}

pub fun main(address: Address, id: UInt64): NFT {
    let account = getAccount(address)

    let collection = account
        .getCapability(Mindtrix.MindtrixCollectionPublicPath)
        .borrow<&{Mindtrix.MindtrixCollectionPublic}>()
        ?? panic("Could not borrow a reference to the collection")

    let nft = collection.borrowMindtrix(id: id)!

    // Get the basic display information for this NFT
    let displayView = MetadataViews.getDisplay(nft)!
    // Get the royalty information for the given NFT
    let royaltiesView = MetadataViews.getRoyalties(nft)!

    let externalURLView = MetadataViews.getExternalURL(nft)!

    let collectionDisplayView = MetadataViews.getNFTCollectionDisplay(nft)!
    let nftCollectionView = MetadataViews.getNFTCollectionData(nft)!

    let nftEditionView = MetadataViews.getEditions(nft)!
    let serialNumberView = MetadataViews.getSerial(nft)!

    let traitsView = MetadataViews.getTraits(nft)!
    let licenseView = MetadataViews.getLicense(nft)!

    let essenceIdentifierView = nft.resolveView(Type<Essence.EssenceIdentifier>())! as! Essence.EssenceIdentifier

    let serialGenuses = nft.resolveView(Type<Essence.SerialGenuses>())! as! [Essence.SerialGenus]
    let audioEssence = nft.resolveView(Type<Essence.AudioEssence>())! as! Essence.AudioEssence
    let serialString = nft.resolveView(Type<Essence.SerialString>())! as! Essence.SerialString

    let ipfsBaseUrl = "https://infura-ipfs.io/ipfs/"
    let ipfsFileView = nft.resolveView(Type<MetadataViews.IPFSFile>())! as! MetadataViews.IPFSFile
    let ipfsDirectory = (ipfsFileView.path?.length ?? 0) > 0 ? ipfsFileView.path?.concat("/") ?? "" : ""
    let ipfsUrl = ipfsBaseUrl.concat(ipfsDirectory).concat(ipfsFileView.cid)

    let owner: Address = nft.owner!.address!
    let nftType = nft.getType()

    let collectionSocialDic: {String: String} = {}
    for key in collectionDisplayView.socials.keys {
        collectionSocialDic[key] = collectionDisplayView.socials[key]!.url
    }
    var mintedTime = UFix64(0.0)
    let traitDic: {String: AnyStruct} = {}
    for ele in traitsView.traits {
        let key = ele.name
        traitDic[key] = ele
        let isKeyEqualsMintedTime = key == "mintedTime"
        if isKeyEqualsMintedTime {
            let trait =  (traitDic[key]!) as! MetadataViews.Trait
            mintedTime = trait.value as? UFix64 ?? mintedTime
        }
    }

    return NFT(
        name: displayView.name,
        description: displayView.description,
        thumbnail: displayView.thumbnail.uri(),
        mintedTime: mintedTime,
        ipfsUrl: ipfsUrl,
        ipfsFile: ipfsFileView,
        owner: owner,
        nftType: nftType.identifier,
        royalties: royaltiesView.getRoyalties(),
        serialNumber: serialNumberView.number,
        collectionPublicPath: nftCollectionView.publicPath,
        collectionStoragePath: nftCollectionView.storagePath,
        collectionProviderPath: nftCollectionView.providerPath,
        collectionPublic: nftCollectionView.publicCollection.identifier,
        collectionPublicLinkedType: nftCollectionView.publicLinkedType.identifier,
        collectionProviderLinkedType: nftCollectionView.providerLinkedType.identifier,
        collectionName: collectionDisplayView.name,
        collectionDescription: collectionDisplayView.description,
        collectionExternalURL: collectionDisplayView.externalURL.url,
        collectionSquareImage: collectionDisplayView.squareImage.file.uri(),
        collectionBannerImage: collectionDisplayView.bannerImage.file.uri(),
        collectionSocials: collectionSocialDic,
        edition: nftEditionView.infoList[0],
        essenceIdentifier: essenceIdentifierView,
        license: licenseView.spdxIdentifier
    )
}

