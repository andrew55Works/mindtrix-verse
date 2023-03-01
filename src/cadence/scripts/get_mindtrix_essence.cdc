import MindtrixEssence from 0xMindtrixEssence

// import MetadataViews from "../../contracts/MetadataViews.cdc"

pub fun main(essenceId: UInt64): MindtrixEssence.EssenceStruct? {
    log("essenceId:".concat(essenceId.toString()))
    return MindtrixEssence.getOneEssenceStruct(essenceId: essenceId)
}
