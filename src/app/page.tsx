import { Hero } from "@/components/hero";
import heroImage from "@/public/home.jpg";

export default function Home() {
  return (
    <Hero
      title="Home"
      description="Welcome to our home page"
      imageData={heroImage}
    />
  );
}
