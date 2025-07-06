import '../globals.css'
import { useState, ReactNode, useEffect, useRef } from 'react';
import { playSound } from '../soundManager';

interface ScrollProps {
  children: ReactNode;
  header?: string | ReactNode;
  onClose?: () => void;
  overflow?: boolean;
  closing?: boolean;
}

const Scroll = ({
  onClose,
  children,
  header,
  overflow = false,
  closing = false
}: ScrollProps) => {
  const [animationClass, setAnimationClass] = useState<'popUp' | 'popDown'>('popUp');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // force a reflow so the browser definitely restarts the animation
    if (containerRef.current) {
      // read a layout property
    }
    setAnimationClass(closing ? 'popDown' : 'popUp');
  }, [closing]);

  const handleClose = () => {
    playSound('click2');
    if (onClose) onClose();
  };

  return (
    <div
      ref={containerRef}
      className={`
        ${animationClass}
        border-16 border-darker_secondary
        bg-primary aspect-square
        max-w-[100vw] md:w-[800px] md:h-[800px]
        ${overflow ? 'overflow-visible' : 'overflow-hidden'}
      `}
    >
      {header && (
        <div className="bg-darker_primary/65 p-6 flex justify-between items-center drag-handle cursor-move border-b-6 border-darker_secondary border-dashed">
          {typeof header === 'string'
            ? <h1 className="text-[42px] text-darker_secondary" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>{header}</h1>
            : header
          }
          {onClose && (
            <div className='border-6 border-darker_secondary pr-2.25 pl-2.25 bg-darker_primary mr-4 flex items-center justify-center hover:cursor-pointer hover:bg-black/15'>
              <button
                onClick={handleClose}
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
