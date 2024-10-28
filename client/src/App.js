import React from "react";
import { Navbar } from "./components/home/navbar";
import { Footer } from "./components/home/footer";
import { Body } from "./components/home/body";

export const App = () => {
  return (
    <div className="app min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>
      <Body />
      <Footer />
    </div>
  );
};
