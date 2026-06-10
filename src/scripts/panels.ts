// Popup window manager: open/close panels, z-ordering, dragging, Escape,
// mobile body-scroll lock. Replaces react-draggable + the React state in the
// old page.tsx.
import { playSound, type SoundName } from './sound';

let zCounter = 50;
const openStack: HTMLElement[] = [];

// Default popup spawn points, as fractions of the viewport (matches the old
// defaultPosition/leftPosition/middlePosition/rightPosition).
const SPAWN: Record<string, { x: number; y: number }> = {
  default: { x: 0.05, y: 0.05 },
  left: { x: 0.1, y: 0.1 },
  middle: { x: 0.3, y: 0.1 },
  right: { x: 0.5, y: 0.1 },
};

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

function lockBodyScroll(lock: boolean) {
  document.body.style.overflow = lock ? 'hidden' : '';
  document.body.style.touchAction = lock ? 'none' : '';
}

function syncBodyLock() {
  lockBodyScroll(isMobile() && openStack.length > 0);
}

function bringToFront(popup: HTMLElement) {
  popup.style.zIndex = String(++zCounter);
}

function placePopup(panel: HTMLElement) {
  const popup = panel.querySelector<HTMLElement>('[data-popup]');
  if (!popup || popup.dataset.placed) return;
  const pos = SPAWN[panel.dataset.pos ?? 'default'] ?? SPAWN.default;
  popup.style.left = `${window.innerWidth * pos.x}px`;
  popup.style.top = `${window.innerHeight * pos.y}px`;
  popup.dataset.placed = 'true';
}

function setAnim(panel: HTMLElement, cls: 'popUp' | 'popDown') {
  panel.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
    el.classList.remove('popUp', 'popDown');
    void el.offsetWidth; // restart animation
    el.classList.add(cls);
  });
}

export function isOpen(panel: HTMLElement): boolean {
  return !panel.classList.contains('hidden');
}

export function openPanel(panel: HTMLElement) {
  placePopup(panel);
  panel.classList.remove('hidden');
  setAnim(panel, 'popUp');
  const popup = panel.querySelector<HTMLElement>('[data-popup]');
  if (popup) bringToFront(popup);
  openStack.push(panel);
  syncBodyLock();
}

export function closePanel(panel: HTMLElement) {
  setAnim(panel, 'popDown');
  setTimeout(() => {
    panel.classList.add('hidden');
    const i = openStack.indexOf(panel);
    if (i !== -1) openStack.splice(i, 1);
    syncBodyLock();
  }, 150);
}

export function initPanels() {
  // Toggle buttons (artifacts, inventory button). data-sound names the click sound.
  document.querySelectorAll<HTMLElement>('[data-panel-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.panelToggle!;
      const panel = document.querySelector<HTMLElement>(`[data-panel="${id}"]`);
      if (!panel) return;
      const sound = btn.dataset.sound as SoundName | undefined;
      if (sound) playSound(sound);
      if (isOpen(panel)) closePanel(panel);
      else openPanel(panel);
      btn.setAttribute('aria-expanded', String(isOpen(panel)));
    });
  });

  // Close buttons inside window chrome.
  document.querySelectorAll<HTMLElement>('[data-panel-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.closest<HTMLElement>('[data-panel]');
      if (!panel) return;
      playSound('click2');
      closePanel(panel);
    });
  });

  // Escape closes the most recently opened panel.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openStack.length > 0) {
      closePanel(openStack[openStack.length - 1]);
    }
  });

  // Desktop popups: drag by handle, raise on click.
  document.querySelectorAll<HTMLElement>('[data-popup]').forEach((popup) => {
    popup.addEventListener('pointerdown', () => bringToFront(popup));
    makeDraggable(popup);
  });
}

function makeDraggable(popup: HTMLElement) {
  const handle = popup.querySelector<HTMLElement>('.drag-handle');
  if (!handle) return;

  let startX = 0, startY = 0, originLeft = 0, originTop = 0;

  const onMove = (e: PointerEvent) => {
    popup.style.left = `${originLeft + e.clientX - startX}px`;
    // bounds: { top: 0 } — never drag the title bar above the viewport
    popup.style.top = `${Math.max(0, originTop + e.clientY - startY)}px`;
  };

  const onUp = () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
  };

  handle.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('[data-panel-close]')) return;
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    const rect = popup.getBoundingClientRect();
    originLeft = rect.left;
    originTop = rect.top;
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });
}
