import './globals.css'
import './colorPallete.css'
import { ReactNode } from 'react';

interface ScrollProps {
  children: ReactNode;
}
const Scroll = ({ children }: ScrollProps) => {
  return (
    <div className='bg-primary w-full aspect-square max-w-[100vw] lg:w-[800px]'>
      {children}
    </div>
  );
};

export default Scroll;

