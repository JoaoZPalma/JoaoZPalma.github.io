import '../globals.css'
import Image from 'next/image';

export default function Contacts() {
  return (
    <div className="p-2 min-h-[400px] max-h-screen flex flex-col items-center justify-center my-8 md:my-0" role="main" aria-label="Contact information">
      {/* Your contacts content goes here */}
      <p className="text-darker_secondary text-4xl text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
        &quot;My raven delivery service is <span className='font-bold '>always open.</span><br />
        Send a message!&mdash;I don&apos;t bite (much).&quot;
      </p>

      <div className='w-full flex items-center justify-center'>
        <Image src='/contactCrow.webp' alt="Cool image of a Crow" className='w-[60%]' width={800} height={600} />
      </div>

      <p className="text-darker_secondary text-4xl text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
        email me at: <a href="mailto:joaozpalma@gmail.com" className='underline decoration-3 hover:decoration-4'>joaozpalma@gmail.com</a><br />
        or press the button below to magically open your email app.
      </p>

      <div className='w-full flex flex-col items-center justify-center mt-5'>
        <div className='w-max border-6 border-darker_secondary pr-2 pl-2 bg-darker_primary flex items-center justify-center hover:cursor-pointer hover:bg-black/15'>
          <a
            href="mailto:joaozpalma@gmail.com"
            className="text-darker_secondary text-4xl hover:cursor-pointer items-center p-1 pt-2"
            style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}
          >
            CAST &nbsp;&quot;EMAIL&quot;
          </a>
        </div>
        <p className="text-darker_secondary text-4xl mt-3" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
          or find me on:
        </p>
        <div className='h-max flex items-center justify-center gap-4 mt-2'>
          <a href="https://www.linkedin.com/in/joaozpalma/" target="_blank" rel="noopener noreferrer">
            <Image src="/linkedinIcone.webp" alt="LinkedIn" className='w-[75px] h-[75px] hover:opacity-80' width={75} height={75} />
          </a>
          <a href="https://www.github.com/joaozpalma/" target="_blank" rel="noopener noreferrer">
            <Image src="/githubIcone.webp" alt="Github" className='w-[75px] h-[75px] hover:opacity-80' width={75} height={75} />
          </a>
        </div>
        {/* Add more contact information here as needed */}
      </div>
    </div>
  );
}
