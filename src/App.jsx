import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import Router from "./Router";
import {getIsSignedIn} from './reducks/users/selectors';
import {getGroupId} from "./reducks/groups/selectors";
import { Footer } from "./footer/index";
import { Header } from "./header/index";

const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const isSignedIn = getIsSignedIn(selector);
  const groupId = getGroupId(selector);
  return (
    <>
      <Header />
      <main className="main">
        <Router />
      </main>
      {(isSignedIn && groupId !== "") && (
      <Footer />
      )}
    </>
  );
};

export default App;
