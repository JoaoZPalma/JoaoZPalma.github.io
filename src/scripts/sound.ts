// Tiny vanilla replacement for howler — each play spawns a fresh Audio so
// rapid clicks can overlap.
export type SoundName =
  | 'click1' | 'click1_low' | 'click2_low' | 'click2'
  | 'bird' | 'chest_open' | 'light_torch' | 'puff_torch';

const SOUNDS: Record<SoundName, { src: string; volume: number }> = {
  click1: { src: '/sounds/click1.mp3', volume: 0.6 },
  click1_low: { src: '/sounds/click1.mp3', volume: 0.25 },
  click2: { src: '/sounds/click2.mp3', volume: 0.6 },
  click2_low: { src: '/sounds/click2.mp3', volume: 0.4 },
  bird: { src: '/sounds/bird.wav', volume: 0.8 },
  chest_open: { src: '/sounds/chest_open.wav', volume: 0.8 },
  light_torch: { src: '/sounds/light_torch.wav', volume: 0.8 },
  puff_torch: { src: '/sounds/puff_torch.wav', volume: 0.8 },
};

const STORAGE_KEY = 'sound-enabled';

let soundEnabled = localStorage.getItem(STORAGE_KEY) !== 'false';

export const playSound = (name: SoundName): void => {
  if (!soundEnabled) return;
  const def = SOUNDS[name];
  if (!def) {
    console.warn(`Sound "${name}" not found.`);
    return;
  }
  const audio = new Audio(def.src);
  audio.volume = def.volume;
  void audio.play().catch(() => { /* autoplay restrictions: ignore */ });
};

export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  localStorage.setItem(STORAGE_KEY, String(soundEnabled));
  return soundEnabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;
