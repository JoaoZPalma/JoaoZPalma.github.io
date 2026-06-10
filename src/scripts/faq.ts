// FAQ accordion: one question open at a time, with click sounds.
import { playSound } from './sound';

export function initFaq() {
  document.querySelectorAll<HTMLElement>('.faq-root').forEach((root) => {
    const buttons = Array.from(root.querySelectorAll<HTMLElement>('[data-faq]'));

    const setOpen = (btn: HTMLElement, open: boolean) => {
      btn.querySelector<HTMLElement>('[data-faq-answer]')!.classList.toggle('hidden', !open);
      btn.querySelector<HTMLElement>('[data-faq-arrow]')!.textContent = open ? '▲' : '▼';
      btn.setAttribute('aria-expanded', String(open));
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isOpening = btn.getAttribute('aria-expanded') !== 'true';
        buttons.forEach((other) => setOpen(other, false));
        if (isOpening) setOpen(btn, true);
        playSound(isOpening ? 'click1_low' : 'click2_low');
      });
    });
  });
}
