import '../globals.css'
import { useState, ReactNode, useEffect, useRef } from 'react';
import { playSound } from '../soundManager';

interface ScrollProps {
  children: ReactNode;
  header?: string | ReactNode;
  onClose?: () => void;
  overflow?: boolean;
  closing?: boolean;
  ariaLabel?: string;
}

const Scroll = ({
  onClose,
  children,
  header,
  overflow = false,
  closing = false,
  ariaLabel
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && onClose) {
      handleClose();
    }
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal={onClose ? "true" : "false"}
      aria-label={ariaLabel || (typeof header === 'string' ? header : 'Content panel')}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={`
        ${animationClass}
        border-16 border-darker_secondary
        bg-primary 
        w-full h-auto min-h-[300px]
        max-w-[95vw] max-h-[95vh]
        sm:max-w-[90vw] sm:max-h-[90vh]
        lg:max-w-[49vw] lg:max-h-[49vh]
        ${overflow ? 'overflow-visible' : 'overflow-auto'}
        focus:outline-none
      `}
    >
      {header && (
        <div role="heading" aria-level={1} className="bg-darker_primary/65 p-3 sm:p-4 lg:p-6 flex justify-between items-center drag-handle cursor-move border-b-6 border-darker_secondary border-dashed">
          {typeof header === 'string'
            ? <h1 className="text-lg sm:text-2xl lg:text-[42px] text-darker_secondary break-words" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>{header}</h1>
            : header
          }
          {onClose && (
            <div
              onClick={handleClose}
              className='border-4 sm:border-6 border-darker_secondary p-1 sm:p-2 bg-darker_primary flex items-center justify-center hover:cursor-pointer hover:bg-black/15 flex-shrink-0'
            >
              <button
                className="text-darker_secondary text-lg sm:text-2xl lg:text-[42px] font-bold hover:cursor-pointer"
                style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}
                aria-label="Close"
                onClick={handleClose}
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
