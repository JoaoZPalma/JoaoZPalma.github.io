import '../globals.css'
import { useState, ReactNode, useEffect, useRef } from 'react';
import { playSound } from '../soundManager';

interface ScrollMobileProps {
  children: ReactNode;
  header?: string | ReactNode;
  onClose?: () => void;
  overflow?: boolean;
  closing?: boolean;
  centered?: boolean;
}

const ScrollMobile = ({
  onClose,
  children,
  header,
  overflow = false,
  closing = false,
  centered = false
}: ScrollMobileProps) => {
  const [animationClass, setAnimationClass] = useState<'popUp' | 'popDown'>('popUp');
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable body scroll when modal opens
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      // Re-enable scroll when modal closes
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, []);
  useEffect(() => {
    // force a reflow so the browser definitely restarts the animation
    if (containerRef.current) {
      // read a layout property
      void containerRef.current.offsetHeight;
    }
    setAnimationClass(closing || isClosing ? 'popDown' : 'popUp');
  }, [closing, isClosing]);

  const handleClose = () => {
    playSound('click2');
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 100); // Match the popDown animation duration
  };

  return (
    <>
      {/* Backdrop to block all background interactions */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.preventDefault()}
        onTouchEnd={(e) => e.stopPropagation()}
        style={{ touchAction: 'none' }}
      />

      {/* Main modal content */}
      <div
        ref={containerRef}
        className={`
    ${animationClass}
    fixed inset-0 w-full h-full
    bg-primary
    ${overflow ? 'overflow-visible' : 'overflow-hidden'}
    z-55
    ${centered ? 'flex flex-col' : ''} 
  `}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        style={{ touchAction: 'none' }}
      >
        {header && (
          <div className="bg-darker_primary py-6 px-3 flex justify-between items-center border-b-6 border-darker_secondary border-dashed">
            {typeof header === 'string'
              ? <h1 className="text-4xl text-darker_secondary" style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}>{header}</h1>
              : header
            }
            {onClose && (
              <div className='border-6 border-darker_secondary pr-2.25 pl-2.25 bg-darker_primary flex items-center justify-center hover:cursor-pointer hover:bg-black/15'>
                <button
                  onClick={handleClose}
                  className="text-darker_secondary text-4xl font-bold hover:cursor-pointer"
                  style={{ fontFamily: 'AtlantisText', fontWeight: 900 }}
                >
                  x
                </button>
              </div>
            )}
          </div>
        )}
        {centered ? (
          <div className="flex-1 flex items-center justify-center overflow-y-auto">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default ScrollMobile;
