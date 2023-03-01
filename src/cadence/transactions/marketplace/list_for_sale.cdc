import Marketplace from 0xMindtrixMarketplace

transaction(id: UInt64, price: UFix64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&Marketplace.SaleCollection>(from: /storage/MindtrixSaleCollection)
  ?? panic("This SaleCollection does not exist")

    saleCollection.listForSale(id: id, price: price)
  }

  execute {
    log("A user listed an NFT for Sale")
  }
}
