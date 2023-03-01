import MindtrixTemplate from 0xMindtrixNFT
import MindtrixEssence from 0xMindtrixNFT
import MindtrixViews from 0xMindtrixNFT
import DapperUtilityCoin from 0xDapperToken

// The script is compatible with EssenceStruct, converting it to MindtrixTemplateStruct so that the frontend can just handle one struct.
pub fun main(templateOrEssenceId: UInt64): MindtrixTemplate.MindtrixTemplateStruct? {
  let essence: MindtrixEssence.EssenceStruct? = MindtrixEssence.getOneEssenceStruct(essenceId: templateOrEssenceId)
  if essence != nil {
    let strMetadata: {String: String} = essence!.getMetadata()
    let paymentTypeIdentifier = DapperUtilityCoin.getType().identifier
    var mintPrice: {String: MindtrixViews.FT} = {}
    let flowPrice = MindtrixViews.FT(path: /public/dapperUtilityCoinReceiver, price:0.0)

    // all essences are free, so no worry about the exchange from FLOW to USD.
    mintPrice.insert(key: paymentTypeIdentifier, flowPrice)
    let veriferDic: {String: [{MindtrixViews.IVerifier}]} = essence!.getVerifiers()
    var verifiers: [{MindtrixViews.IVerifier}] = []
    for key in veriferDic.keys {
      let verifiersInOneMap = veriferDic[key]!
      verifiers.concat(verifiersInOneMap)
    }

    return MindtrixTemplate.MindtrixTemplateStruct(
        templateId: essence?.essenceId ?? 0,
        name: strMetadata["collectionName"] ?? "",
        description: strMetadata["collectionDescription"] ?? "",
        strMetadata: strMetadata,
        intMetadata: {},
        maxEdition: essence?.maxEdition ?? 0,
        // The essence should only accept DUC as secondary txn cut.
        paymentType: Type<DapperUtilityCoin>(),
        mintPrice: mintPrice,
        royalties: essence!.getRoyalties(),
        socials: essence!.socials,
        components: essence!.components,
        verifiers: verifiers
    )
  }
  // The script will get either an essence or a template.
  return MindtrixTemplate.getMindtrixTemplateByTemplateId(templateId: templateOrEssenceId)
}
