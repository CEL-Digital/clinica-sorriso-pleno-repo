import BeforeAfter from "@/components/sections/BeforeAfter";
import Features from "@/components/sections/Features";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Treatments from "@/components/sections/Treatments";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Treatments />
        <BeforeAfter />
      </main>
    </>
  );
}
