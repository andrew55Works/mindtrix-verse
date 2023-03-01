import FungibleToken from 0xFungibleToken
import FUSD from 0xFusdToken
import FlowToken from 0xFlowToken
import FiatToken from 0xFiatToken

pub fun main(addr: Address): {String: UFix64} {
  var identifierToBalance: {String: UFix64} = {}
  let fusdBalance = getAccount(addr).getCapability<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance).borrow()?.balance ?? 0.0
  let usdcBalance = getAccount(addr).getCapability<&FiatToken.Vault{FungibleToken.Balance}>(FiatToken.VaultBalancePubPath).borrow()?.balance ?? 0.0
  let flowBalance = getAccount(addr).getCapability<&FlowToken.Vault{FungibleToken.Balance}>(/public/flowTokenBalance).borrow()?.balance ?? 0.0

  identifierToBalance.insert(key: FUSD.getType().identifier, fusdBalance)
  identifierToBalance.insert(key: FiatToken.getType().identifier, usdcBalance)
  identifierToBalance.insert(key: FUSD.getType().identifier, fusdBalance)
  identifierToBalance.insert(key: FlowToken.getType().identifier, flowBalance)

  return identifierToBalance
}
