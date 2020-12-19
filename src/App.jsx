import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import React from "react";
import Router from "./Router";
import { Footer } from "./footer/index";
import { Header } from "./header/index";

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
