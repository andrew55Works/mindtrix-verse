import MindtrixTemplate from 0xMindtrixNFT

pub fun main(showGuid: String, templateTypes: [UInt64], templateStatus: [UInt64]): [MindtrixTemplate.MindtrixTemplateStruct] {
    return MindtrixTemplate.getMindtrixTemplatesByShowGuId(showGuid: showGuid, templateTypes: templateTypes, templateStatus: templateStatus)
}
