import { Hero } from "@/components/hero";
import performanceImage from "@/public/performance.jpg";

export default function Performance() {
  return (
    <Hero
      title="Performance"
      description="Welcome to our performance page"
      imageData={performanceImage}
    />
  );
}
