// Small page widgets: theme toggle, sound toggle, mobile controls drawer,
// chest hover sounds/animation, eye-follows-cursor, loading screen.
import { playSound, toggleSound, isSoundEnabled } from './sound';

const THEME_KEY = 'theme';

export function initThemeToggles() {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    const icon = btn.querySelector<HTMLImageElement>('img')!;

    const setIcon = () => {
      const dark = document.documentElement.classList.contains('alternate-colors');
      icon.src = dark ? '/dark_mode.webp' : '/light_mode.webp';
    };
    setIcon();

    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.disabled = true;
      const dark = document.documentElement.classList.contains('alternate-colors');
      playSound(dark ? 'light_torch' : 'puff_torch');
      icon.src = '/transition_mode.webp';
      icon.classList.add('animate-pulse');
      setTimeout(() => {
        const nowDark = document.documentElement.classList.toggle('alternate-colors');
        localStorage.setItem(THEME_KEY, nowDark ? 'dark' : 'light');
        icon.classList.remove('animate-pulse');
        setIcon();
        btn.disabled = false;
      }, 150);
    });
  });
}

export function initSoundToggles() {
  document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]').forEach((btn) => {
    const icon = btn.querySelector<HTMLImageElement>('img')!;

    const render = (enabled: boolean) => {
      icon.src = enabled ? '/Speaker-0.svg' : '/Speaker-Crossed.svg';
      icon.alt = enabled ? 'Sound enabled' : 'Sound disabled';
      btn.setAttribute('aria-pressed', String(enabled));
      btn.setAttribute('aria-label', enabled ? 'Disable sound effects' : 'Enable sound effects');
      btn.title = enabled ? 'Disable sound' : 'Enable sound';
    };
    render(isSoundEnabled());

    btn.addEventListener('click', () => render(toggleSound()));
  });
}

export function initMobileControlsDrawer() {
  const drawer = document.querySelector<HTMLElement>('[data-controls-drawer]');
  const toggle = document.querySelector<HTMLElement>('[data-controls-toggle]');
  const tray = document.querySelector<HTMLElement>('[data-controls-tray]');
  const label = toggle?.querySelector('span');
  if (!drawer || !toggle || !tray || !label) return;

  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('translate-x-0');
    drawer.classList.toggle('-translate-x-full', !open);
    tray.classList.toggle('w-auto', open);
    tray.classList.toggle('px-4', open);
    tray.classList.toggle('w-0', !open);
    tray.classList.toggle('px-0', !open);
    tray.classList.toggle('overflow-hidden', !open);
    label.textContent = open ? 'x' : '☰';
    toggle.setAttribute('aria-label', open ? 'Close controls' : 'Open controls');
  });
}

// Chest artifact: open animation is pure CSS (:hover). JS adds the delayed
// open sound and the close animation when leaving after a long hover.
export function initChests() {
  document.querySelectorAll<HTMLElement>('[data-chest]').forEach((btn) => {
    const chest = btn.querySelector<HTMLElement>('.chest-icon');
    if (!chest) return;

    let soundTimer: number | null = null;
    let hoverStart: number | null = null;

    btn.addEventListener('mouseenter', () => {
      hoverStart = Date.now();
      soundTimer = window.setTimeout(() => playSound('chest_open'), 400);
    });

    btn.addEventListener('mouseleave', () => {
      if (soundTimer !== null) {
        clearTimeout(soundTimer);
        soundTimer = null;
      }
      const hovered = hoverStart ? Date.now() - hoverStart : 0;
      if (hovered >= 700) {
        chest.classList.remove('close');
        void chest.offsetWidth; // restart animation
        chest.classList.add('close');
        setTimeout(() => chest.classList.remove('close'), 1000);
      }
      hoverStart = null;
    });
  });
}

export function initEyes() {
  const eyes = Array.from(document.querySelectorAll<HTMLElement>('.eye-icon'));
  if (eyes.length === 0) return;
  const angles = new WeakMap<HTMLElement, number>();

  window.addEventListener('mousemove', (e) => {
    for (const eye of eyes) {
      const rect = eye.getBoundingClientRect();
      if (rect.width === 0) continue; // hidden layout variant
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI + 90;
      const prev = angles.get(eye) ?? 0;
      // pick the closest equivalent angle so the eye never spins the long way
      const diff = angle - prev;
      if (diff > 180) angle -= 360;
      if (diff < -180) angle += 360;
      angles.set(eye, angle);
      eye.style.transform = `rotate(${angle}deg) scale(2.5)`;
    }
  });
}

const LOADING_FACTS = [
  "Arcane fact: The first documented bug was an actual moth trapped in a computer in 1947!",
  "Did you know? Wizards prefer TypeScript – fewer cursed scrolls.",
  "Developer lore: Coffee is the true source of all spellcasting power ☕",
  "Debug tip: Try talking to a rubber duck familiar. It works.",
  "Fun fact: The 'spam' curse originated in a Monty Python chant!",
  "History check: Ada Lovelace cast the first program in 1843!",
  "Joke: Why do code wizards prefer dark mode? Light attracts bugs!",
  "Mythos: GitHub's Octocat is said to be part demon, part mascot 🐙",
  "Did you know? Stack Overflow has answered more questions than any village elder.",
  "Joke: How many spellcasters to change a lantern rune? None, it's a hardware ritual!",
  "Ancient code: The first computer virus was summoned in 1971!",
  "Did you know? HTML was the first incantation to bind text with links!",
  "Joke: Why do Java sorcerers wear glasses? Because they can't C#!",
  "Mascot trivia: The Linux penguin, Tux, once defeated a BSD daemon in ritual combat.",
  "Did you know? The '@' rune has been used in messages since 1971!",
  "Joke: There are only 10 kinds of warlocks: those who understand binary and those who don't!",
  "Timeless link: The first website still exists at info.cern.ch – guarded by ancient firewalls.",
  "Did you know? WiFi is short for 'Wizardry for Internet Frequency Incantations' (just kidding)",
  "Joke: Why did the sorcerer go broke? He used all his cache on potions!",
  "Loading... Please don't press F5, the ritual is delicate.",
];

// Decorative loading bar. The page is already fully loaded behind it — it
// exists purely for the bit. Skipped via html.skip-loader on repeat visits.
export function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  if (document.documentElement.classList.contains('skip-loader')) {
    screen.remove();
    return;
  }

  const fact = screen.querySelector<HTMLElement>('[data-loader-fact]');
  if (fact) fact.textContent = LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)];

  const bar = screen.querySelector<HTMLElement>('[data-loader-bar]')!;
  const pct = screen.querySelector<HTMLElement>('[data-loader-pct]')!;
  const DURATION = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min(100, ((now - start) / DURATION) * 100);
    bar.style.width = `${progress}%`;
    pct.textContent = `${Math.round(progress)}%`;
    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      sessionStorage.setItem('codex-loaded', 'true');
      screen.style.transition = 'opacity 0.3s linear';
      screen.style.opacity = '0';
      setTimeout(() => screen.remove(), 300);
    }
  };
  requestAnimationFrame(tick);
}
