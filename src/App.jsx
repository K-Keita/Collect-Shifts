import React from "react";
import "./styles/App.css";
import { Header } from "./header/index";
import { Footer } from "./footer/index";
import Router from "./Router";

const App = () => {

  return (
    <>
      <Header />
      <main className="main">
      <Router />
      </main>
      <Footer />
    </>
  );
};

export default App;
