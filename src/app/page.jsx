import Features from "@/components/layout/Features";
import Hero from "@/components/layout/Hero";
import Testimonial from "@/components/layout/Testimonial";
import React from "react";

const Home = () => {
  return (
    <main>
      <div className="">
        <Hero />
      </div>
      <div>
        <Features/>
      </div>
      <div>
        <Testimonial/>
      </div>
    </main>
  );
};

export default Home;
