import '../globals.css'
import { ReactNode } from 'react';

interface ScrollProps {
  children: ReactNode;
}
const Scroll = ({ children }: ScrollProps) => {
  return (
    <div className='border-0 md:border-16 md:border-darker_secondary'>
      <div className='bg-primary max-w-[100vw] md:aspect-square md:w-[800px] md:h-[800px]'>
        {children}
      </div>
    </div>
  );
};

export default Scroll;

