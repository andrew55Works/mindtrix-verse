import MetadataViews from 0xMetadataViews
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import FLOAT from 0xFLOAT
import FLOATVerifiers from 0xFLOAT
import GrantedAccountAccess from 0xFLOAT

pub fun main(address: Address): Bool {
    let account = getAccount(address)
    let isFloatCollectionInited = account
        .getCapability(FLOAT.FLOATCollectionPublicPath)
        .borrow<&{FLOAT.CollectionPublic}>() != nil
    let isFloatEventInited = account
        .getCapability(FLOAT.FLOATEventsPublicPath)
        .borrow<&{FLOAT.FLOATEventsPublic}>() != nil
    let isGrantedAccountAccessInited = account
        .getCapability(GrantedAccountAccess.InfoPublicPath)
        .borrow<&{GrantedAccountAccess.InfoPublic}>() != nil

    let flowTokenReceiverPublic = /public/flowTokenReceiver
    let isFlowVaultInited = account
        .getCapability(flowTokenReceiverPublic)
        .borrow<&{FungibleToken.Receiver}>() != nil

    let isInit = isFloatCollectionInited && isFloatEventInited && isGrantedAccountAccessInited && isFlowVaultInited
    log("isInit:")
    log(isInit)
    return isInit
}
