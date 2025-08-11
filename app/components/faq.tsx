import '../globals.css'
import { useState } from 'react';
import { playSound } from '../soundManager';

const faqs = [
  {
    question: "Who are you?",
    answer: <>
      My name is <b>João Palma</b>, a <b>developer</b> who loves to nitpick about <b>uncentered divs</b>. I&apos;m a <b>warlock</b> because I sold my soul to Vim, and now I must make <b>daily coffee offerings to my belly</b>. Nice to meet you, fellow traveler!
    </>
  },
  {
    question: "What technologies fuel your craft?",
    answer: <>
      My grimoire includes <b>React</b>, <b>Next.js</b>, <b>TypeScript</b>, <b>Tailwind CSS</b>, <b>Docker</b>, <b>Python</b>, and more. Consult the <b>Inventory</b> section for the complete arsenal.
    </>
  },
  {
    question: "Can I see your creations?",
    answer:
      <>Absolutely! Visit the <b>Projects</b> section to see what I&apos;ve been working on. There’s a bit of this, a bit of that, and <b>always room for your questions or recommendations!</b></>
  },
  {
    question: "How do I reach you?",
    answer: <>
      Send a raven! Or, more practically, visit the <b>Contacts</b> section. Whether it&apos;s <b>email</b> or another platform, I’m just a <b>scroll</b> away.
    </>
  },
  {
    question: "Do you take on collaborations?",
    answer: <>
      Absolutely! Be it <b>open-source quests</b>, <b>freelance contracts</b>, or just sharing insights around the <b>digital campfire</b>, I’m open to <b>joining forces</b>.
    </>
  },
  {
    question: "Why do the stats have those numbers?",
    answer: <>
      In D&amp;D (Dungeons &amp; Dragons) each character has <b>6 stats</b>, each one with a <b>value between 1 and 20</b>, and they represent <b>how good you are at something</b>. I&apos;ve used the same logic to create my stats, and added some funny comments to &quot;justify&quot; each one. <b>They&apos;re not meant to be taken seriously! </b>
    </>
  },
  {
    question: "Some of the stuff seems to be outside of the screen!",
    answer: <>
      If you're acessing through a <b>Desktop device</b>, you can actually <b>drag the windows</b> through the <b>drag handle on top of each window!</b> This is to mimic the way a desktop works, <b>however if you're on mobile</b> and that's happening <b>please share it with me</b> so I can fix it!
    </>
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="p-2 h-full pb-10">
      <section className="h-full overflow-y-auto pb-24 flex flex-col items-center">
        <h1 className="text-darker_secondary text-5xl mb-6 my-2 md:mt-4" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
          Frequently Asked Questions
        </h1>
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <button
              key={idx}
              className="border-4 border-secondary bg-darker_primary transition-all duration-200 shadow-lg w-full text-left text-darker_secondary text-3xl focus:outline-none flex flex-col items-start p-4"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              onClick={() => {
                const isOpening = openIndex !== idx;
                setOpenIndex(isOpening ? idx : null);
                playSound(isOpening ? 'click1_low' : 'click2_low');
              }}
              aria-expanded={openIndex === idx}
            >
              <span className="flex w-full justify-between items-center">
                <span>{faq.question}</span>
                <span className="ml-2 text-2xl">{openIndex === idx ? '▲' : '▼'}</span>
              </span>
              {openIndex === idx && (
                <div className="mt-4 w-full text-darker_secondary text-2xl" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                  {faq.answer}
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="mt-10 text-darker_secondary text-2xl text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
          Didn’t find your question? <a href="mailto:joaozpalma@gmail.com" className="underline decoration-3 hover:decoration-4">Send me an email!</a>
        </div>
      </section>
    </div>
  );
}
