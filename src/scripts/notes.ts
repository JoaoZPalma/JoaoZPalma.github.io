// Notes list <-> detail navigation. All views are pre-rendered in
// Notes.astro; this only swaps visibility.
import { playSound } from './sound';

export function initNotes() {
  document.querySelectorAll<HTMLElement>('.notes-root').forEach((root) => {
    const list = root.querySelector<HTMLElement>('[data-notes-list]')!;
    const details = Array.from(root.querySelectorAll<HTMLElement>('[data-note-detail]'));

    const show = (id: string | null) => {
      list.classList.toggle('hidden', id !== null);
      details.forEach((d) => d.classList.toggle('hidden', d.dataset.noteDetail !== id));
    };

    root.querySelectorAll<HTMLElement>('[data-note-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSound('click1_low');
        show(btn.dataset.noteOpen!);
      });
    });

    root.querySelectorAll<HTMLElement>('[data-note-back]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSound('click2_low');
        show(null);
      });
    });

    root.querySelectorAll<HTMLElement>('[data-note-prev]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSound('click2_low');
        show(btn.dataset.notePrev!);
      });
    });

    root.querySelectorAll<HTMLElement>('[data-note-next]').forEach((btn) => {
      btn.addEventListener('click', () => {
        playSound('click1_low');
        show(btn.dataset.noteNext!);
      });
    });
  });
}
