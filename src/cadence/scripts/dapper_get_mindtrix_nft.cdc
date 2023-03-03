import MetadataViews from 0x631e88ae7f1d7c20
import DapperUtilityCoin from 0x82ec283f88a62e65
import Mindtrix from 0xd162b02676d63c36
import MindtrixTemplate from 0xd162b02676d63c36

pub struct PurchaseData {
    pub let id: UInt64
    pub let name: String
    pub let amount: UFix64
    pub let description: String
    pub let imageURL: String
    pub let paymentVaultTypeID: Type

    init(id: UInt64, name: String, amount: UFix64, description: String, imageURL: String, paymentVaultTypeID: Type) {
        self.id = id
        self.name = name
        self.amount = amount
        self.description = description
        self.imageURL = imageURL
        self.paymentVaultTypeID = paymentVaultTypeID
    }
}

pub fun main(merchantAccountAddress: Address, templateId: UInt64): PurchaseData {

    let template = MindtrixTemplate.getMindtrixTemplateByTemplateId(templateId: templateId) ?? panic("Cannot get nil template")
    let strMetadata: {String: String} = template.getStrMetadata()

    return PurchaseData(
        id: templateId,
        name: template.name,
        amount: template.getMintPrice(identifier: DapperUtilityCoin.getType().identifier)!.price,
        description: strMetadata["collectionDescription"] ?? "",
        imageURL: strMetadata["essenceImagePreviewUrl"] ?? "",
        paymentVaultTypeID: Type<@DapperUtilityCoin.Vault>()
    )
}
