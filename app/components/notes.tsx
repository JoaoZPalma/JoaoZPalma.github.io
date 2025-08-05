import '../globals.css'
import { useState } from 'react';
import { playSound } from '../soundManager';

interface Note {
  id: number;
  title: string;
  content: React.ReactNode;
  createdAt: string;
}

const notes: Note[] = [
  {
    id: 1,
    title: "Note test :)",
    content: <>
      <p> Website is starting to look kinda cute I&apos;m enjoying it!</p>
    </>,
    createdAt: "27/06/2025"
  },
  {
    id: 2,
    title: "Got my bachelors!",
    content: <>
      <p>
        After 3 years of <span className="font-semibold">exams, projects, and sleepless nights</span>, I finally have my bachelor&apos;s degree!
      </p>
      <p>
        I had the pleasure of studying at the <a href="https://www.ipleiria.pt" className="underline decoration-2">Polytechnic Institute of Leiria</a> <a className='italic'>(soon to be a university)</a>, where I explored various topics such as <a className='font-semibold'> programming, databases, artificial intelligence, networks, security, mathematics, </a> and much more.
      </p>
      <p>Along the way, I met incredible professors and colleagues who supported me throughout this journey, not to mention the friends who not only helped me debug issues when things broke unexpectedly but also made the tough moments more bearable.</p>
      <p>I&apos;d also like to thank my family, especially my grandmother, who gave me the opportunity to study without having to worry about work, something I&apos;ll be forever grateful for.</p>
      <p className='italic'>Lastly, a special thank you to the Delta coffee machine at uni and the amazing ladies at the bar who served me coffee daily, without you, none of this would&apos;ve been possible...</p>
    </>,
    createdAt: "27/07/2025"
  },
  {
    id: 3,
    title: "New Cert: Front End Development Libraries",
    content: <>
      <p>
        I just finished the <span className="font-semibold">Front End Development Libraries</span> course on <a href="https://www.freecodecamp.org/" className="underline decoration-2">freeCodeCamp</a>, and it was a solid experience!
      </p>
      <p>
        It worked as a great revision of things I already knew, while also helping me deepen my understanding of how frontend libraries function.
      </p>
      <p>
        I finally got the chance to try out <span className="font-semibold">SASS</span> as well, since I heard of it but never got around to try it!</p>
      <p>
        I also strengthened my knowledge of <span className="font-semibold">React, Redux, and Bootstrap</span>, and wrapped things up with some exercises to consolidate everything.
      </p>
    </>,
    createdAt: "05/08/2025"
  }
];

export default function Notes() {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const selectedNote = selectedNoteId ? notes.find(note => note.id === selectedNoteId) : null;
  const selectedIndex = selectedNote ? notes.findIndex(note => note.id === selectedNoteId) : -1;

  const goToNext = () => {
    if (selectedIndex < notes.length - 1) {
      playSound('click1_low');
      setSelectedNoteId(notes[selectedIndex + 1].id);
    }
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      playSound('click2_low');
      setSelectedNoteId(notes[selectedIndex - 1].id);
    }
  };

  const goBack = () => {
    setSelectedNoteId(null);
  };

  if (selectedNote) {
    return (
      <div className="p-2 h-full pb-10">
        <section className="h-full overflow-y-auto pb-32 flex flex-col">
          <div className="flex items-center justify-between mb-6 mt-4">
            <button
              onClick={() => { playSound('click2_low'); goBack() }}
              className="text-darker_secondary text-4xl hover:opacity-70 transition-opacity hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
              style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}
              aria-label="Go back to notes list"
            >
              &lt;-
            </button>
            <h1 className="text-darker_secondary text-4xl text-center flex-1" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
              {selectedNote.title}
            </h1>
            <div className="w-8"></div>
          </div>

          <div className="flex-1 mb-6">
            <div className="text-darker_secondary text-2xl leading-relaxed [&>p]:mb-4" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
              {selectedNote.content}
            </div>
            <div className="text-darker_secondary text-lg mt-6 opacity-70" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
              Created: {selectedNote.createdAt}
            </div>
          </div>

          <div className="flex justify-center items-center mt-4 gap-8">
            <button
              onClick={goToPrevious}
              disabled={selectedIndex === 0}
              className="text-darker_secondary text-2xl px-4 py-2 border-5 border-secondary bg-darker_primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lighter_button hover:opacity-100 transition-all hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              aria-label="Go to previous note"
              role="button"
            >
              Previous
            </button>
            <span className="text-darker_secondary text-xl" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }} aria-live="polite">
              {selectedIndex + 1} of {notes.length}
            </span>
            <button
              onClick={goToNext}
              disabled={selectedIndex === notes.length - 1}
              className="text-darker_secondary text-2xl px-4 py-2 border-5 border-secondary bg-darker_primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lighter_button hover:opacity-100 transition-all hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              aria-label="Go to next note"
              role="button"
            >
              Next
            </button>
          </div>
        </section >
      </div >
    );
  }

  return (
    <div className="p-2 h-full pb-10">
      <section className="h-full overflow-y-auto pb-32 flex flex-col items-center">
        <h1 className="text-darker_secondary text-5xl mb-6 mt-4" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
          Notes
        </h1>
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {notes.slice().reverse().map((note) => (
            <button
              key={note.id}
              className="border-6 border-secondary bg-darker_primary transition-all duration-200 shadow-lg w-full text-left text-darker_secondary text-3xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg flex flex-col items-start p-4 hover:bg-lighter_button hover:border-darker_secondary hover:cursor-pointer"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              onClick={() => { playSound('click1_low'); setSelectedNoteId(note.id) }}
              aria-label={`Read note: ${note.title}, created on ${note.createdAt}`}
              role="button"
              tabIndex={0}
            >
              <span className="flex w-full justify-between items-center">
                <span>{note.title}</span>
                <span className="ml-2 text-3xl" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }} aria-hidden="true">-&gt;</span>
              </span>
              <div className="text-lg mt-2 opacity-70" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
                {note.createdAt}
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
