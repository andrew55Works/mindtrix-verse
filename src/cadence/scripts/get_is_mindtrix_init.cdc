import MetadataViews from 0xMetadataViews
import Mindtrix from 0xMindtrixNFT
import FungibleToken from 0xFungibleToken

pub fun main(address: Address): Bool {
    let account = getAccount(address)
    let isMindtrixCollectionInited = account
        .getCapability(Mindtrix.MindtrixCollectionPublicPath)
        .borrow<&{Mindtrix.MindtrixCollectionPublic}>() != nil
    let flowTokenReceiverPublic = /public/flowTokenReceiver
    let isFlowVaultInited = account
        .getCapability(flowTokenReceiverPublic)
        .borrow<&{FungibleToken.Receiver}>() != nil
    let isInit = isMindtrixCollectionInited && isFlowVaultInited
    log("isInit:")
    log(isInit)
    return isInit
}
