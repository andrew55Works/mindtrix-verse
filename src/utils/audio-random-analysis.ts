import { _cloneDeep, _get } from './lodash.utils';
import { getRandomArbitrary } from './random.utils';

export interface VoiceTrait {
  en: string;
  percentage?: string;
  key: string;
  zh: string;
}

export interface VoiceTraitObj {
  [key: string]: VoiceTrait;
}

export const voiceTraitTemplate: VoiceTraitObj = {
  Ardent: {
    zh: '熱情',
    en: 'Ardent',
    key: 'Ardent',
  },
  Confident: {
    zh: '自信',
    en: 'Confident',
    key: 'Confident',
  },
  Fortitude: {
    zh: '堅毅',
    en: 'Fortitude',
    key: 'Fortitude',
  },
  Honest: {
    zh: '正直',
    en: 'Honest',
    key: 'Honest',
  },
  Humble: {
    zh: '謙虛',
    en: 'Humble',
    key: 'Humble',
  },
  Intellectual: {
    zh: '知性',
    en: 'Intellectual',
    key: 'Intellectual',
  },
  Romantic: {
    zh: '浪漫',
    en: 'Romantic',
    key: 'Romantic',
  },
  Skillful: {
    zh: '靈巧',
    en: 'Skillful',
    key: 'Skillful',
  },
  Stable: {
    zh: '平穩',
    en: 'Stable',
    key: 'Stable',
  },
  Vigor: {
    zh: '霸氣',
    en: 'Vigor',
    key: 'Vigor',
  },
};
export const getAudioRandomVoiceTraits = (audioFile: File) => {
  const voiceTraits = [];
  let i = 0;
  const voiceTraitTemCopy = _cloneDeep(voiceTraitTemplate);
  for (i = 0; i < 3; i++) {
    const traitKeys = Object.keys(voiceTraitTemCopy);
    const fakeDataLen = traitKeys?.length ?? 0;
    const random = Math.random();
    const index = Math.floor(random * fakeDataLen);
    const randomOver60 = getRandomArbitrary(0.6, 0.99);
    const voiceTrait: VoiceTrait = {
      ...(_get(voiceTraitTemCopy, [traitKeys[index]], {}) as VoiceTrait),
      percentage: (randomOver60 * 100).toFixed(0) + '%',
    };
    voiceTraits.push(voiceTrait);
    delete voiceTraitTemCopy[traitKeys[index]];
  }

  return voiceTraits;
};
