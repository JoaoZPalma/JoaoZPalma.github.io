// Inventory grid behavior.
// Desktop cells: click -> sound + open link (tooltip is pure CSS hover).
// Mobile cells: tap toggles tooltip (clamped to screen), double-tap opens link.
import { playSound } from './sound';

export function initInventory() {
  document.querySelectorAll<HTMLElement>('.inventory-root').forEach((root) => {
    root.querySelectorAll<HTMLElement>('[data-cell="desktop"]').forEach((cell) => {
      cell.addEventListener('click', () => {
        const link = cell.dataset.link;
        if (!link) return;
        playSound('click1_low');
        window.open(link, '_blank', 'noopener,noreferrer');
      });
    });

    root.querySelectorAll<HTMLElement>('[data-cell="mobile"]').forEach((cell) => {
      const tooltip = cell.querySelector<HTMLElement>('[data-tooltip]');

      cell.addEventListener('click', () => {
        if (!tooltip) return;
        const wasOpen = tooltip.style.opacity === '1';
        // only one tooltip open at a time
        root.querySelectorAll<HTMLElement>('[data-cell="mobile"] [data-tooltip]').forEach((t) => {
          t.style.opacity = '';
          t.style.translate = '';
        });
        if (wasOpen) return;
        tooltip.style.opacity = '1';
        // Clamp to the viewport. The class centers the tooltip via the CSS
        // `translate` property (Tailwind v4 -translate-x-1/2), so the
        // override must use `translate` too — writing `transform` would
        // stack on top of it and double the -50% shift.
        const rect = tooltip.getBoundingClientRect();
        const padding = 4;
        let shift = 0;
        if (rect.left < padding) {
          shift = padding - rect.left;
        } else if (rect.right > window.innerWidth - padding) {
          shift = (window.innerWidth - padding) - rect.right;
        }
        if (shift !== 0) {
          tooltip.style.translate = `calc(-50% + ${shift}px) 0`;
        }
      });

      cell.addEventListener('dblclick', () => {
        const link = cell.dataset.link;
        if (!link) return;
        playSound('click1_low');
        window.open(link, '_blank', 'noopener,noreferrer');
      });
    });
  });
}
