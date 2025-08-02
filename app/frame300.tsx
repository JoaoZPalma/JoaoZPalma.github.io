// components/SimpleFrame.tsx
import Image from "next/image";

export default function SimpleFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[900px] h-[900px]">
      <Image
        src="/frame250.webp"
        alt=""
        fill
        className="object-contain pointer-events-none z-40"
      />
      <div className="relative z-30">
        {children}
      </div>
    </div>
  );
}
