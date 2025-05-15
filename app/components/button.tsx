import '../globals.css'
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}
const Button = ({ children }: ButtonProps) => {
  return (
    <div
      className="relative w-min h-auto p-2 bg-darker_primary border-6 border-secondary
                hover:bg-black/30 cursor-pointer transition-colors "
    >
      <span className="uppercase text-4xl text-darker_secondary" style={{ fontFamily: 'AtlantisText', fontWeight: 700 }}>
        {children}
      </span>
    </div>
  );
};

export default Button;

