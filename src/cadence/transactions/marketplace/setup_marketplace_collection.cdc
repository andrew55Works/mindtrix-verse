import Mindtrix from 0xMindtrixNFT
import NonFungibleToken from 0xNonfungibleToken
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import Marketplace from 0xMindtrixMarketplace

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- Mindtrix.createEmptyCollection(), to: /storage/MindtrixCollection)
    acct.link<&Mindtrix.Collection{Mindtrix.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/MindtrixCollection, target: /storage/MindtrixCollection)
    acct.link<&Mindtrix.Collection>(/private/MindtrixCollection, target: /storage/MindtrixCollection)

    let MindtrixCollection = acct.getCapability<&Mindtrix.Collection>(/private/MindtrixCollection)
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    acct.save(<- Marketplace.createSaleCollection(MindtrixCollection: MindtrixCollection, FlowTokenVault: FlowTokenVault), to: /storage/MindtrixSaleCollection)
    acct.link<&Marketplace.SaleCollection{Marketplace.SaleCollectionPublic}>(/public/MindtrixSaleCollection, target: /storage/MindtrixSaleCollection)
  }

  execute {
    log("A user stored a Collection and a SaleCollection inside their account")
  }
}
