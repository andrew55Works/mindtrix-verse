import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20
import DapperUtilityCoin from 0x82ec283f88a62e65
import FlowToken from 0x7e60df042a9c0868
import FlowUtilityToken from 0x82ec283f88a62e65
import FiatToken from 0xa983fecbed621163
import MetadataViews from 0x631e88ae7f1d7c20
import TokenForwarding from 0x51ea0e37c27a1f1a
import Mindtrix from 0xd162b02676d63c36
import MindtrixTemplate from 0xd162b02676d63c36
import MindtrixViews from 0xd162b02676d63c36
import MindtrixVerifier from 0xd162b02676d63c36
import FUSD from 0xe223d8a629e49c68

transaction(
    name: String,
    description: String,
    maxEdition: UInt64,
    maxMintTimesPerAddress: UInt64,
    maxMintQuantityPerTransaction: UInt64,
    priceUSD: UFix64,
    recipientAddress: Address,
    royaltyDictionary: {Address: [AnyStruct]},
    isEnableLimitedQuantity: Bool,
    isEnableTimeLock: Bool,
    publicMintStartTime: UInt64,
    publicMintEndTime: UInt64,
    socials: {String: String},
    components: {String: UInt64},
    strMetadata:{String: String},
    intMetadata: {String: UInt64}){

    let AdminCap: Capability<&MindtrixTemplate.Admin{MindtrixTemplate.AdminPublic}>
    let ducStoragePath: StoragePath
    let futStoragePath: StoragePath
    let fusdStoragePath: StoragePath
    let ducPublicPath: PublicPath
    let futPublicPath: PublicPath
    let fusdPublicPath: PublicPath
    let flowPublicPath: PublicPath

    prepare(signer: AuthAccount){

        self.ducStoragePath = /storage/dapperUtilityCoinReceiver
        self.futStoragePath = /storage/flowUtilityTokenReceiver
        self.fusdStoragePath = /storage/fusdVault
        self.ducPublicPath = /public/dapperUtilityCoinReceiver
        self.futPublicPath = /public/flowUtilityTokenReceiver
        self.fusdPublicPath = /public/fusdReceiver
        self.flowPublicPath = /public/flowTokenReceiver

        let dapper = getAccount(0x82ec283f88a62e65)

        // setup duc receiver
        if signer.borrow<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(from: self.ducStoragePath) == nil {

            let dapperDUCReceiver = dapper.getCapability<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(self.ducPublicPath)!

            let ducForwarder <- TokenForwarding.createNewForwarder(recipient: dapperDUCReceiver)
            signer.save(<-ducForwarder, to: self.ducStoragePath)
            signer.unlink(self.ducPublicPath)
            signer.link<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(
                self.ducPublicPath,
                target: self.ducStoragePath
            )
        }

        // setup fut receiver
        if signer.borrow<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(from: self.futStoragePath) == nil {

            let dapperFUTReceiver = dapper.getCapability<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(self.futPublicPath)!

             let futForwarder <- TokenForwarding.createNewForwarder(recipient: dapperFUTReceiver)
            signer.save(<-futForwarder, to: self.futStoragePath)
            signer.unlink(self.futPublicPath)
            signer.link<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(
                self.futPublicPath,
                target: self.futStoragePath
            )
        }

        // setup fusd receiver
        if signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
            signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

            signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
                /public/fusdReceiver,
                target: /storage/fusdVault
            )

            signer.link<&FUSD.Vault{FungibleToken.Balance}>(
                /public/fusdBalance,
                target: /storage/fusdVault
            )
        }

        // setup usdc receiver
        if signer.borrow<&FiatToken.Vault{FungibleToken.Receiver}>(from: FiatToken.VaultStoragePath) == nil {
            signer.save(<-FiatToken.createEmptyVault(), to: FiatToken.VaultStoragePath)
            signer.link<&FiatToken.Vault{FungibleToken.Receiver}>(
                FiatToken.VaultReceiverPubPath,
                target: FiatToken.VaultStoragePath
            )

            signer.link<&FiatToken.Vault{FungibleToken.Balance}>(
                FiatToken.VaultBalancePubPath,
                target: FiatToken.VaultStoragePath
            )
        }

        // assign the creator as Template Admin
        if signer.borrow<&MindtrixTemplate.Admin{MindtrixTemplate.AdminPublic}>(from: MindtrixTemplate.MindtrixTemplateAdminStoragePath) == nil {
            signer.save(<- MindtrixTemplate.createAdmin(), to: MindtrixTemplate.MindtrixTemplateAdminStoragePath)
            signer.link<&MindtrixTemplate.Admin{MindtrixTemplate.AdminPublic}>(MindtrixTemplate.MindtrixTemplateAdminPublicPath, target: MindtrixTemplate.MindtrixTemplateAdminStoragePath)
        }
        self.AdminCap = signer.getCapability<&MindtrixTemplate.Admin{MindtrixTemplate.AdminPublic}>(MindtrixTemplate.MindtrixTemplateAdminPublicPath)

        // setup Mindtrix Collection
        if signer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
            signer.save(<- Mindtrix.createEmptyCollection(), to: Mindtrix.MindtrixCollectionStoragePath)
            signer.link<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic, NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(Mindtrix.MindtrixCollectionPublicPath, target: Mindtrix.MindtrixCollectionStoragePath)
        }

    }

    execute {
        var mintPrice: {String: MindtrixViews.FT} = {}
        var royalties: [MetadataViews.Royalty] = []

        for key in royaltyDictionary.keys {

            let nestedDictionary = royaltyDictionary[key] ?? [0.0, ""]
            let cut = nestedDictionary[0] as? UFix64!
            let description = nestedDictionary[1] as? String!

            assert(cut != nil && description != nil, message: "Both the cut and description should be mappable and not be nil.")
            let ducReceiverCap = getAccount(key).getCapability<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(self.ducPublicPath)
            assert(ducReceiverCap.check() == true, message: "Beneficiary capability is not valid! Address:".concat(key.toString()))

            royalties.append(
                MetadataViews.Royalty(
                    receiver: ducReceiverCap,
                    cut: cut,
                    description: description,
                )
            )
        }

        var TimeLock: MindtrixVerifier.TimeLock? = nil
        var LimitedQuantity: MindtrixVerifier.LimitedQuantity? = nil
        var verifiers: [{MindtrixViews.IVerifier}] = []
        if isEnableTimeLock {
            TimeLock = MindtrixVerifier.TimeLock(
                startTime: UFix64(publicMintStartTime),
                endTime: UFix64(publicMintEndTime)
            )
            verifiers.append(TimeLock!)
        }

        if isEnableLimitedQuantity {
            let intDic: {String: UInt64} = {
                "maxEdition": maxEdition,
                "maxMintTimesPerAddress": maxMintTimesPerAddress,
                "maxMintQuantityPerTransaction": maxMintQuantityPerTransaction
            }
            let LimitedQuantityV2 = MindtrixVerifier.LimitedQuantityV2(intDic: intDic, fixDic: {})
            verifiers.append(LimitedQuantityV2)
        }

        mintPrice.insert(key: DapperUtilityCoin.getType().identifier, MindtrixViews.FT(path: self.ducPublicPath, price: priceUSD))
        mintPrice.insert(key: FlowUtilityToken.getType().identifier, MindtrixViews.FT(path: self.futPublicPath, price: priceUSD))
        mintPrice.insert(key: FiatToken.getType().identifier, MindtrixViews.FT(path: FiatToken.VaultReceiverPubPath, price: priceUSD))
        mintPrice.insert(key: FUSD.getType().identifier, MindtrixViews.FT(path: self.fusdPublicPath, price: priceUSD))

        // templateType: 1.EPISODE_DONATION 2.PROJECT_DONATION 3.POAP 4.CUSTOM
        intMetadata.insert(key: "templateType", 1)
        // templateStatus: 1.DRAFT 2.SCHEDULED 3.LISTING 4.EXPIRED
        intMetadata.insert(key: "templateStatus", 3)

        let name = strMetadata["collectionName"] ?? ""
        let description = strMetadata["collectionDescription"] ?? ""
        let primaryPaymentType = Type<@DapperUtilityCoin.Vault>()

        self.AdminCap.borrow()!.createMindtrixTemplateStruct(
            name: name,
            description: description,
            strMetadata: strMetadata,
            intMetadata: intMetadata,
            maxEdition: maxEdition,
            paymentType: primaryPaymentType,
            mintPrice: mintPrice,
            royalties: royalties,
            socials: socials,
            components: components,
            verifiers: verifiers
        )
    }
}
