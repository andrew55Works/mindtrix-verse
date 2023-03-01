export const ViennaWorldFiles = {
  time_mode: {
    morning: '/img/world/vienna_woods/world_morning.png',
    night: '/img/world/vienna_woods/world_night.png',
  },
  landmarks: {
    echo_cliff: {
      id: 'echo_cliff',
      description: '',
      detailedImgUrl: '/img/world/vienna_woods/landmark_echo_cliff.png',
      isContainsPack: true,
      name: 'Echo Cliff',
      themeColor: '#186778',
    },
    bush_village: {
      id: 'bush_village',
      description: '',
      detailedImgUrl: '/img/world/vienna_woods/landmark_bush_village.png',
      isContainsPack: true,
      name: 'Bush Village',
      themeColor: '#C87F07',
    },
    green_bazaar: {
      id: 'green_bazaar',
      description: '',
      detailedImgUrl: '/img/world/vienna_woods/landmark_green_bazaar.png',
      isContainsPack: true,
      name: 'Green Bazaar',
      themeColor: '#166C29',
    },
    podment_temple: {
      id: 'podment_temple',
      description: '',
      detailedImgUrl: '/img/world/vienna_woods/landmark_podment_temple.png',
      isContainsPack: true,
      name: 'Podment Temple',
      themeColor: '#8C8477',
    },
    mimir_swamp: {
      id: 'mimir_swamp',
      description: '',
      detailedImgUrl: '/img/world/vienna_woods/landmark_mimir_swamp.png',
      isContainsPack: true,
      name: 'Mimir Swamp',
      themeColor: '#4E521D',
    },
    kabbalah_sacred_trees: {
      id: 'kabbalah_sacred_trees',
      description: '',
      detailedImgUrl:
        '/img/world/vienna_woods/landmark_kabbalah_sacred_trees.png',
      isContainsPack: true,
      name: 'Kabbalah Sacred Trees',
      themeColor: '#08B569',
    },
    kabbalah_cape: {
      id: 'kabbalah_cape',
      description: '',
      detailedImgUrl: '',
      isContainsPack: false,
      name: 'Kabbalah Cape',
      themeColor: '',
    },
    sound_gallery: {
      id: 'sound_gallery',
      description: '',
      detailedImgUrl: '',
      isContainsPack: false,
      name: 'Sound Gallery',
      themeColor: '',
    },
    puzzle_henge: {
      id: 'puzzle_henge',
      description: '',
      detailedImgUrl: '',
      isContainsPack: false,
      name: 'Puzzle Henge',
      themeColor: '',
    },
    world_ice: {
      id: 'world_ice',
      description: '',
      detailedImgUrl: '',
      isContainsPack: false,
      name: 'World Ice',
      themeColor: '',
    },
    world_lava: {
      id: 'world_lava',
      description: '',
      detailedImgUrl: '',
      isContainsPack: false,
      name: 'World Lava',
      themeColor: '',
    },
    world_sky: {
      id: 'world_sky',
      description: '',
      detailedImgUrl: '',
      isContainsPack: false,
      name: 'World Sky',
      themeColor: '#',
    },
    world_island: {
      id: 'world_island',
      description: '',
      detailedImgUrl: '/img/world/vienna_woods/landmark_world_island.png',
      isContainsPack: false,
      name: 'World Island',
      themeColor: '#',
    },
  },
  packs: {
    echo_cliff: {
      id: 'echo_cliff',
      name: '',
      description: 'A pack for landing',
      utilityDescription: '',
      price: 3.0,
      editionLimit: 100,
      editionRemaining: 100,
      purchasedStartDate: 1676899860,
      purchasedEndDate: 1679976000,
      gifUrl: '/img/world/vienna_woods/pack_echo_cliff.gif',
    },
    bush_village: {
      id: 'bush_village',
      name: '',
      description: 'A pack for landing',
      utilityDescription: '',
      price: 3.0,
      editionLimit: 100,
      editionRemaining: 100,
      purchasedStartDate: 1676899860,
      purchasedEndDate: 1679976000,
      gifUrl: '/img/world/vienna_woods/pack_bush_village.gif',
    },
    green_bazaar: {
      id: 'green_bazaar',
      name: '',
      description: 'A pack for landing',
      utilityDescription: '',
      price: 3.0,
      editionLimit: 100,
      editionRemaining: 100,
      purchasedStartDate: 1676899860,
      purchasedEndDate: 1679976000,
      gifUrl: '/img/world/vienna_woods/pack_green_bazaar.gif',
    },
    podment_temple: {
      id: 'podment_temple',
      name: '',
      description: 'A pack for landing',
      utilityDescription: '',
      price: 3.0,
      editionLimit: 100,
      editionRemaining: 100,
      purchasedStartDate: 1676899860,
      purchasedEndDate: 1679976000,
      gifUrl: '/img/world/vienna_woods/pack_podment_temple.gif',
    },
    mimir_swamp: {
      id: 'mimir_swamp',
      name: '',
      description: 'A pack for landing',
      utilityDescription: '',
      price: 3.0,
      editionLimit: 100,
      editionRemaining: 100,
      purchasedStartDate: 1676899860,
      purchasedEndDate: 1679976000,
      gifUrl: '/img/world/vienna_woods/pack_mimir_swamp.gif',
    },
    kabbalah_sacred_trees: {
      id: 'kabbalah_sacred_trees',
      name: '',
      description: 'A pack for landing',
      utilityDescription: '',
      price: 3.0,
      editionLimit: 100,
      editionRemaining: 100,
      purchasedStartDate: 1676899860,
      purchasedEndDate: 1679976000,
      gifUrl: '/img/world/vienna_woods/pack_kabbalah_sacred_trees.gif',
    },
  },
};

export interface IPack {
  description: string;
  editionLimit: number;
  editionRemaining: number;
  gifUrl: string;
  id: string;
  name: string;
  price: number;
  purchasedEndDate: number;
  purchasedStartDate: number;
  utilityDescription: string;
}

export interface ILandmark {
  description: string;
  detailedImgUrl: string;
  id: string;
  isContainsPack: boolean;
  name: string;
  themeColor: string;
}

export interface ILandmarkModal {
  landmark: ILandmark;
  pack: IPack;
}
