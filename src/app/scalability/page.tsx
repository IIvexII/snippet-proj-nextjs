import { Hero } from "@/components/hero";
import scalabilityImage from "@/public/scale.jpg";

export default function Scalability() {
  return (
    <Hero
      title="Scalability"
      description="Welcome to our scalability page"
      imageData={scalabilityImage}
    />
  );
}
