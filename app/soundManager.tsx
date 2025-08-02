// lib/soundManager.ts
import { Howl } from 'howler';

let soundEnabled = true;
type SoundName = 'click1' | 'click1_low' | 'click2_low' | 'click2' | 'bird' | 'chest_open' | 'light_torch' | 'puff_torch';

const sounds: Record<SoundName, Howl> = {
  click1: new Howl({ src: ['/sounds/click1.mp3'], volume: 0.6 }),
  click1_low: new Howl({ src: ['/sounds/click1.mp3'], volume: 0.25 }),
  click2: new Howl({ src: ['/sounds/click2.mp3'], volume: 0.6 }),
  click2_low: new Howl({ src: ['/sounds/click2.mp3'], volume: 0.4 }),
  bird: new Howl({ src: ['/sounds/bird.wav'], volume: 0.8 }),
  chest_open: new Howl({ src: ['/sounds/chest_open.wav'], volume: 0.8 }),
  light_torch: new Howl({ src: ['/sounds/light_torch.wav'], volume: 0.8 }),
  puff_torch: new Howl({ src: ['/sounds/puff_torch.wav'], volume: 0.8 })
};

export const playSound = (name: SoundName) => {
  if (!soundEnabled) return;
  const sound = sounds[name];
  if (sound) {
    sound.play();
  } else {
    console.warn(`Sound "${name}" not found.`);
  }
};

export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;
