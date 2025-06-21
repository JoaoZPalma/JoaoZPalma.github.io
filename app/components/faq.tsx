import '../globals.css'
import { useState } from 'react';

const faqs = [
  {
    question: "Who are you?",
    answer: <>
      My name is <b>João Palma</b>, a <b>developer</b> who loves to nitpick about <b>uncentered divs</b>. I call myself a <b>warlock</b> because I sold my soul to Vim, and now I must make <b>daily coffee offerings to my belly</b>. Nice to meet you, fellow traveler!
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
      <>Absolutely! Visit the <b>Projects</b> section to see what I've been working on. There’s a bit of this, a bit of that, and <b>always room for your questions or recommendations!</b></>
  },
  {
    question: "How do I reach you?",
    answer: <>
      Send a raven! Or, more practically, visit the <b>Contacts</b> section. Whether it's <b>email</b> or another platform, I’m just a <b>scroll</b> away.
    </>
  },
  {
    question: "Do you take on collaborations?",
    answer: <>
      Absolutely! Be it <b>open-source quests</b>, <b>freelance contracts</b>, or just sharing insights around the <b>digital campfire</b>—I’m open to <b>joining forces</b>.
    </>
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="p-2 h-full pb-10">
      <section className="h-full overflow-y-auto pb-32 flex flex-col items-center">
        <h1 className="text-darker_secondary text-5xl mb-6 mt-4" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
          Frequently Asked Questions
        </h1>
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <button
              key={idx}
              className="border-4 border-secondary bg-darker_primary rounded-lg transition-all duration-200 shadow-lg w-full text-left text-darker_secondary text-3xl focus:outline-none flex flex-col items-start p-4"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
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
