// lib/soundManager.ts
import { Howl } from 'howler';

type SoundName = 'click1' | 'click2' | 'hover' | 'success' | 'error' | 'bird';

const sounds: Record<SoundName, Howl> = {
  click1: new Howl({ src: ['/sounds/click1.mp3'], volume: 0.6 }),
  click2: new Howl({ src: ['/sounds/click2.mp3'], volume: 0.6 }),
  hover: new Howl({ src: ['/sounds/hover.mp3'], volume: 0.3 }),
  success: new Howl({ src: ['/sounds/success.mp3'], volume: 0.6 }),
  error: new Howl({ src: ['/sounds/error.mp3'], volume: 0.6 }),
  bird: new Howl({ src: ['/sounds/bird.wav'], volume: 0.8 })
};

export const playSound = (name: SoundName) => {
  const sound = sounds[name];
  if (sound) {
    sound.play();
  } else {
    console.warn(`Sound "${name}" not found.`);
  }
};
