import type { StaticImageData } from "next/image";
import Image from "next/image";

interface HeroProps {
  title: string;
  description: string;
  imageData: StaticImageData;
}

export function Hero(props: HeroProps) {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <Image
        src={props.imageData}
        alt={props.title}
        fill
        className="object-cover absolute h-screen -z-10 inset-0"
      />
      <div className="absolute inset-0 bg-black/50 -z-10"></div>
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-4xl">{props.description}</p>
      </div>
    </div>
  );
}
