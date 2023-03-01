import Mindtrix from 0xMindtrixNFT
import MindtrixEssence from 0xMindtrixEssence

pub fun main(): [MindtrixEssence.EssenceStruct?] {
    let essenceIds = MindtrixEssence.getAllEssenceIds()
    var essences: [MindtrixEssence.EssenceStruct?] = []
    for essenceId in essenceIds {
        essences.append(MindtrixEssence.getOneEssenceStruct(essenceId: essenceId))
    }

    return essences
}

