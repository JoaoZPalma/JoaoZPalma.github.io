import Image from "next/image";

export default function ImageFrame() {
  return (
    <div className="relative w-[300px] aspect-square">
      {/* Frame */}
      <Image
        src="/frame250.png"
        alt=""
        fill
        className="object-cover z-10"
      />

      <div className="absolute inset-0 flex items-center justify-center p-3.5">
        <div className="relative aspect-square w-full">
          {/* Joao */}
          <Image
            src="/joao.webp"
            alt="Dev's pixel art portrait"
            fill
            className="object-contain z-5"
          />

          <div className="absolute -top-17 left-17 transform rotate-15 z-30 scale-110">
            {/* Chapeu */}
            <Image
              src="/wizardHat.webp"
              alt="Funny wizard hat comically rotated"
              width={177}
              height={177}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
