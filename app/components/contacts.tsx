import '../globals.css'

export default function Contacts() {
  return (
    <div className="p-2">
      {/* Your contacts content goes here */}
      <p className="text-darker_secondary text-[36px] text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
        "My raven delivery service is <span className='font-bold '>always open.</span><br />
        Send a message!—I don’t bite (much)."
      </p>

      <div className='w-full flex items-center justify-center'>
        <img src='/contactCrow.png' alt="Cool image of a Crow" className='w-[80%]' />
      </div>

      <p className="text-darker_secondary text-[36px] text-center" style={{ fontFamily: 'AtlantisText', fontWeight: 400 }}>
        email me at: <a href="mailto:joaozpalma@gmail.com" className='underline decoration-3 hover:decoration-4'>joaozpalma@gmail.com</a><br />
        or press the button below to magically open your email app.
      </p>


      <div className='w-full flex items-center justify-center mt-2'>
        <div className='w-max border-6 border-darker_secondary pr-2 pl-2 bg-darker_primary flex items-center justify-center hover:cursor-pointer hover:bg-black/15'>
          <a
            href="mailto:joaozpalma@gmail.com"
            className="text-darker_secondary text-[36px] hover:cursor-pointer"
            style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}
          >
            CAST "EMAIL"
          </a>
        </div>
      </div>
      {/* Add more contact information here as needed */}
    </div>
  );
}
