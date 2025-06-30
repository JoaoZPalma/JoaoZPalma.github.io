import '../globals.css'
import { ReactNode } from 'react';

interface ScrollProps {
  children: ReactNode;
}
const Scroll = ({ children }: ScrollProps) => {
  return (
    <div className='border-16 border-darker_secondary'>
      <div className='bg-primary aspect-square max-w-[100vw] lg:w-[49vw] lg:h-[49vw] '>
        {children}
      </div>
    </div>
  );
};

export default Scroll;

