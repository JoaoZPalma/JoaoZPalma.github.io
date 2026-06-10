// Notes tabs + list <-> detail navigation. All views are pre-rendered in
// Notes.astro; this only swaps visibility.
import { playSound } from './sound';

export function initNotes() {
  document.querySelectorAll<HTMLElement>('.notes-root').forEach((root) => {
    const list = root.querySelector<HTMLElement>('[data-notes-list]')!;
    const details = Array.from(root.querySelectorAll<HTMLElement>('[data-note-detail]'));

    // Tabs (SCRIBBLES / TOME REVIEWS)
    const tabs = Array.from(root.querySelectorAll<HTMLElement>('[data-notes-tab]'));
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-notes-tab-panel]'));
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        if (tab.getAttribute('aria-selected') === 'true') return;
        playSound('click1_low');
        const key = tab.dataset.notesTab!;
        tabs.forEach((t) => {
          const active = t === tab;
          t.setAttribute('aria-selected', String(active));
          t.classList.toggle('bg-primary', active);
          t.classList.toggle('bg-darker_primary', !active);
        });
        panels.forEach((p) => p.classList.toggle('hidden', p.dataset.notesTabPanel !== key));
      });
    });

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
