import Mindtrix from 0xMindtrixNFT
import MindtrixEssence from  0xMindtrixEssence

// import Mindtrix from "../../contracts/Mindtrix.cdc"
// import MindtrixEssence from "../../contracts/MindtrixEssence.cdc"
pub fun main(showGuid: String): [MindtrixEssence.EssenceStruct?] {
    let essenceIdObj = MindtrixEssence.getEssencesByShowGuid(showGuid: showGuid)
    if (essenceIdObj?.keys?.length ?? 0) < 1 {
        return []
    }
    let essenceIds = essenceIdObj!.keys
    var essences: [MindtrixEssence.EssenceStruct?] = []
    for essenceId in essenceIds {
        let isEssenceActivated = essenceIdObj![essenceId] ?? false
        if !isEssenceActivated {
            continue
        }
        let essenceStruct = MindtrixEssence.getOneEssenceStruct(essenceId: essenceId)
        essences.append(essenceStruct)
    }

    return essences
}



