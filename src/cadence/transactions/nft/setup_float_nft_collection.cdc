
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonfungibleToken
import MetadataViews from 0xMetadataViews
import FlowToken from 0xFlowToken
import FLOAT from 0xFLOAT
import FLOATVerifiers from 0xFLOAT
import GrantedAccountAccess from 0xFLOAT

transaction() {

  prepare(acct: AuthAccount) {
    // SETUP COLLECTION
    if acct.borrow<&FLOAT.Collection>(from: FLOAT.FLOATCollectionStoragePath) == nil {
        acct.save(<- FLOAT.createEmptyCollection(), to: FLOAT.FLOATCollectionStoragePath)
        acct.link<&FLOAT.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection, FLOAT.CollectionPublic}>
                (FLOAT.FLOATCollectionPublicPath, target: FLOAT.FLOATCollectionStoragePath)
      log("FLOAT NFT init successfully!")
    }

    // SETUP FLOATEVENTS
    if acct.borrow<&FLOAT.FLOATEvents>(from: FLOAT.FLOATEventsStoragePath) == nil {
      acct.save(<- FLOAT.createEmptyFLOATEventCollection(), to: FLOAT.FLOATEventsStoragePath)
      acct.link<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic, MetadataViews.ResolverCollection}>
                (FLOAT.FLOATEventsPublicPath, target: FLOAT.FLOATEventsStoragePath)
      log("FLOATEvents init successfully!")
    }

    // SETUP SHARED MINTING
    if acct.borrow<&GrantedAccountAccess.Info>(from: GrantedAccountAccess.InfoStoragePath) == nil {
        acct.save(<- GrantedAccountAccess.createInfo(), to: GrantedAccountAccess.InfoStoragePath)
        acct.link<&GrantedAccountAccess.Info{GrantedAccountAccess.InfoPublic}>
                (GrantedAccountAccess.InfoPublicPath, target: GrantedAccountAccess.InfoStoragePath)
      log("GrantedAccountAccess init successfully!")
    }

    // SETUP FLOW VAULT
    if acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) == nil {
        let flowToken <- FlowToken.createEmptyVault()
        acct.save(<-flowToken, to: /storage/flowTokenVault)

        acct.link<&FlowToken.Vault{FungibleToken.Receiver}>(
            /public/flowTokenReceiver,
            target: /storage/flowTokenVault
        )
        log("FlowToken Storage init successfully!")
    }
  }
}
