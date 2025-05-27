import '../globals.css'

import { ReactNode } from 'react';

interface ScrollProps {
  children: ReactNode;
  header?: string | ReactNode; // Accepts either string or JSX
  onClose?: () => void; // Add the onClose prop to the interface
}

const Scroll = ({ onClose, children, header }: ScrollProps) => {
  return (
    <div className='border-16 border-darker_secondary bg-primary aspect-square max-w-[100vw] lg:w-[810px] lg:h-[810px]'>
      {header && (
        <div className='bg-darker_primary/65 max-w p-6 flex justify-between items-center drag-handle cursor-move border-b-6 border-darker_secondary border-dashed'>
          {typeof header === 'string' ? (
            <h1 className="text-[42px] text-darker_secondary mt-2" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>
              {header}
            </h1>
          ) : (
            header
          )}
          {onClose && (
            <div onClick={onClose} className='border-6 border-darker_secondary pr-2 pl-2 bg-darker_primary mr-4 flex items-center justify-center hover:cursor-pointer hover:bg-black/15'>
              <button
                className="text-darker_secondary text-[42px] font-bold hover:cursor-pointer"
                style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}
              >
                x
              </button>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Scroll;
