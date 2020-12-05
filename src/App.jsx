import React from "react";
import "./styles/App.css";
import { Header } from "./header/index";
import Router from "./Router";

const App = () => {

  return (
    <>
      <Header />
      <div className="main-position">
        <div className="main-container">
          <Router />
        </div>
      </div>
    </>
  );
};

export default App;
