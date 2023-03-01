import MindtrixDonationV2 from 0xMindtrixNFT

pub fun main(showGuid: String): Bool {
    return MindtrixDonationV2.getIsShowGuidExistInRoyalties(showGuid: showGuid)
}
