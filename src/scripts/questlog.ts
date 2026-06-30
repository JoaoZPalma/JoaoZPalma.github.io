// QUEST LOG tabs: one section visible at a time (Experience / Scrolls /
// Projects). The Panel slot renders twice (mobile + desktop), so we scope per
// .questlog-root like the FAQ does. Uses event delegation so it works no
// matter how the markup is re-rendered.
import { playSound } from './sound';

export function initQuestLog() {
  document.querySelectorAll<HTMLElement>('.questlog-root').forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLElement>('[data-tab]'));
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-tab-panel]'));
    const scroller = root.querySelector<HTMLElement>('[data-tab-scroll]');

    root.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-tab]');
      if (!btn || !root.contains(btn)) return;

      const name = btn.dataset.tab!;
      tabs.forEach((t) => {
        const on = t.dataset.tab === name;
        t.setAttribute('aria-selected', String(on));
        t.classList.toggle('bg-darker_primary', on);
        t.classList.toggle('opacity-50', !on);
      });
      panels.forEach((p) => p.classList.toggle('hidden', p.dataset.tabPanel !== name));
      if (scroller) scroller.scrollTop = 0;

      try { playSound('click1_low'); } catch { /* sound is optional */ }
    });
  });
}
