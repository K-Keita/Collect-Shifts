import React, {useEffect} from "react";
import "./styles/App.css";
import { Header } from "./header/index";
import { Footer } from "./footer/index";
import Router from "./Router";
import {useDispatch, useSelector} from 'react-redux'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {push} from 'connected-react-router';
import {getIsSignedIn, getUserName} from './reducks/users/selectors';
import {listenAuthState} from './reducks/users/operations';

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
