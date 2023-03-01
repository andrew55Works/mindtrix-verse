import { useEffect, useState } from 'react';
import { AudioBufferUtils } from '../../utils/audio-buffer.utils';

export interface ViennaSoundUtils {
  playBGM: () => void;
  playClickSound: () => void;
  playHoverSound: () => void;
}
export const useInitSound = (): ViennaSoundUtils => {
  const [bgm, setbgm] = useState<AudioBufferUtils>();
  const [clickSound, setClickSound] = useState<AudioBufferUtils>();
  const [hoverSound, setHoverSound] = useState<AudioBufferUtils>();

  useEffect(() => {
    const initSoundEffect = async () => {
      try {
        const bgmBufferUtilTmp = new AudioBufferUtils();
        const clickSoundBufferUtilTmp = new AudioBufferUtils();
        const hoverSoundBufferUtilTmp = new AudioBufferUtils();

        const bgmBuffer = await (
          await fetch('/music/vienna_woods_bgm_sunrise_in_paris.mp3')
        ).arrayBuffer();
        const clickSoundBuffer = await (
          await fetch('/music/vienna_woods_click_sound.mp3')
        ).arrayBuffer();
        const hoverSoundBuffer = await (
          await fetch('/music/vienna_woods_hover_sound.mp3')
        ).arrayBuffer();

        const id = 1;
        await bgmBufferUtilTmp?.decodeFile(bgmBuffer, id);
        await clickSoundBufferUtilTmp?.decodeFile(clickSoundBuffer, id);
        await hoverSoundBufferUtilTmp?.decodeFile(hoverSoundBuffer, id);

        setbgm(bgmBufferUtilTmp);
        setClickSound(clickSoundBufferUtilTmp);
        setHoverSound(hoverSoundBufferUtilTmp);
      } catch (e) {
        console.error(e);
      }
    };
    initSoundEffect();
  }, []);

  const playBGM = () => {
    if (!bgm) return;
    bgm.playMergedAudio();
  };

  const playClickSound = () => {
    if (!clickSound) return;
    clickSound.playMergedAudio();
  };

  const playHoverSound = () => {
    if (!hoverSound) return;
    hoverSound.playMergedAudio();
  };

  return {
    playClickSound,
    playHoverSound,
    playBGM,
  };
};
