import Mindtrix from 0xMindtrixNFT
import NonFungibleToken from 0xNonfungibleToken
import Marketplace from 0xMindtrixMarketplace

pub fun main(address: Address): {UInt64: Marketplace.SaleItem} {
  let account = getAccount(address)
  let saleCollection = account.getCapability(/public/MindtrixSaleCollection)
    .borrow<&Marketplace.SaleCollection{Marketplace.SaleCollectionPublic}>()
    ?? panic("Could not borrow the user's SaleCollection")

  let collection = account
        .getCapability(Mindtrix.MindtrixCollectionPublicPath)
        .borrow<&{Mindtrix.MindtrixCollectionPublic}>()
        ?? panic("Could not borrow a reference to the collection")

  let saleIDs = saleCollection.getIDs()

  let returnVals: {UInt64: Marketplace.SaleItem} = {}

  for saleID in saleIDs {
    let price = saleCollection.getPrice(id: saleID)

    let nft = collection.borrowNFT(id: saleID)
    let mindtrixNftRef = collection.borrowMindtrix(id: saleID)!

    returnVals.insert(key: nft.id, Marketplace.SaleItem(_price: price, _nftRef: mindtrixNftRef))
  }

  return returnVals
}
