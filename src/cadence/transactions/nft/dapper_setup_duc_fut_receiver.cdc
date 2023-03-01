import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import Mindtrix from 0xd162b02676d63c36
import DapperUtilityCoin from 0x82ec283f88a62e65
import FlowUtilityToken from 0x82ec283f88a62e65
import TokenForwarding from 0x51ea0e37c27a1f1a
import NFTStorefrontV2 from 0x23f4b83c39a03089

transaction(){

    prepare(signer: AuthAccount) {
        if signer.borrow<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(from: /storage/dapperUtilityCoinReceiver) == nil {

            let dapper = getAccount(0x82ec283f88a62e65)
            let dapperDUCReceiver = dapper.getCapability<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(/public/dapperUtilityCoinReceiver)!

            // Create a new Forwarder resource for DUC and store it in the new account''s storage
            let ducForwarder <- TokenForwarding.createNewForwarder(recipient: dapperDUCReceiver)
            signer.save(<-ducForwarder, to: /storage/dapperUtilityCoinReceiver)

            // Publish a Receiver capability for the new account, which is linked to the DUC Forwarder
            signer.link<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(
                /public/dapperUtilityCoinReceiver,
                target: /storage/dapperUtilityCoinReceiver
            )
        }

        // if the account doesn''t already have a flow utility toke receiver
        if signer.borrow<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(from: /storage/flowUtilityTokenReceiver) == nil {

            let dapper = getAccount(0x82ec283f88a62e65)
            let dapperFUTReceiver = dapper.getCapability<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(/public/flowUtilityTokenReceiver)!

            // Create a new Forwarder resource for FUT and store it in the new account''s storage
            let futForwarder <- TokenForwarding.createNewForwarder(recipient: dapperFUTReceiver)
            signer.save(<-futForwarder, to: /storage/flowUtilityTokenReceiver)

            // Publish a Receiver capability for the new account, which is linked to the FUT Forwarder
            signer.link<&TokenForwarding.Forwarder{FungibleToken.Receiver}>(
                /public/flowUtilityTokenReceiver,
                target: /storage/flowUtilityTokenReceiver
            )
        }

        if signer.borrow<&Mindtrix.Collection>(from: Mindtrix.MindtrixCollectionStoragePath) == nil {
            signer.save(<-<- Mindtrix.createEmptyCollection(), to: Mindtrix.MindtrixCollectionStoragePath)
            signer.link<&Mindtrix.Collection{Mindtrix.MindtrixCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(Mindtrix.MindtrixCollectionPublicPath, target: Mindtrix.MindtrixCollectionStoragePath)
        }

        if signer.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) == nil {

            // Create a new empty Storefront
            let storefront <- NFTStorefrontV2.createStorefront() as! @NFTStorefrontV2.Storefront

            // save it to the account
            signer.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)

            // create a public capability for the Storefront
            signer.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(NFTStorefrontV2.StorefrontPublicPath, target: NFTStorefrontV2.StorefrontStoragePath)
        }

    }
}
