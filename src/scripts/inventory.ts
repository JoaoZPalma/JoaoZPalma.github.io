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
          t.style.transform = '';
        });
        if (wasOpen) return;
        tooltip.style.opacity = '1';
        // clamp to screen edges
        const rect = tooltip.getBoundingClientRect();
        const padding = 4;
        if (rect.left < padding) {
          tooltip.style.transform = `translateX(calc(-50% + ${padding - rect.left}px))`;
        } else if (rect.right > window.innerWidth - padding) {
          tooltip.style.transform = `translateX(calc(-50% - ${rect.right - window.innerWidth + padding}px))`;
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
