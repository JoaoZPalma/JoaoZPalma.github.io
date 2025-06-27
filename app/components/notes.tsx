import '../globals.css'
import { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: React.ReactNode;
  createdAt: string;
}

const notes: Note[] = [
  {
    id: 1,
    title: "Lorem Ipsum Chronicles",
    content: <>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </p>
      <p className="mb-4">
        <b>Duis aute irure dolor</b> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p className="mb-4">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
    </>,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "The Ancient Scrolls",
    content: <>
      <p className="mb-4">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      </p>
      <p className="mb-4">
        <b>Neque porro quisquam est</b>, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </p>
    </>,
    createdAt: "2024-01-10"
  }
];

export default function Notes() {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const selectedNote = selectedNoteId ? notes.find(note => note.id === selectedNoteId) : null;
  const selectedIndex = selectedNote ? notes.findIndex(note => note.id === selectedNoteId) : -1;

  const goToNext = () => {
    if (selectedIndex < notes.length - 1) {
      setSelectedNoteId(notes[selectedIndex + 1].id);
    }
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
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
              onClick={goBack}
              className="text-darker_secondary text-4xl hover:opacity-70 transition-opacity hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              aria-label="Go back to notes list"
              role="button"
            >
              &lt;-
            </button>
            <h1 className="text-darker_secondary text-4xl text-center flex-1" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
              {selectedNote.title}
            </h1>
            <div className="w-8"></div>
          </div>

          <div className="flex-1 mb-6">
            <div className="text-darker_secondary text-2xl leading-relaxed" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
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
              className="text-darker_secondary text-2xl px-4 py-2 border-6 border-secondary bg-darker_primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lighter_button hover:opacity-100 transition-all hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
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
              className="text-darker_secondary text-2xl px-4 py-2 border-6 border-secondary bg-darker_primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lighter_button hover:opacity-100 transition-all hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              aria-label="Go to next note"
              role="button"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="p-2 h-full pb-10">
      <section className="h-full overflow-y-auto pb-32 flex flex-col items-center">
        <h1 className="text-darker_secondary text-5xl mb-6 mt-4" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
          Notes
        </h1>
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {notes.map((note) => (
            <button
              key={note.id}
              className="border-6 border-secondary bg-darker_primary transition-all duration-200 shadow-lg w-full text-left text-darker_secondary text-3xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg flex flex-col items-start p-4 hover:bg-lighter_button hover:border-darker_secondary hover:cursor-pointer"
              style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}
              onClick={() => setSelectedNoteId(note.id)}
              aria-label={`Read note: ${note.title}, created on ${note.createdAt}`}
              role="button"
              tabIndex={0}
            >
              <span className="flex w-full justify-between items-center">
                <span>{note.title}</span>
                <span className="ml-2 text-3xl" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }} aria-hidden="true">-&gt;</span>
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
