import React from "react";
import { Route, Switch } from "react-router";
import {CreateGroupPage, Home, ManagementPage, Members, MyInfomation, RegistShift, ShiftList, SignIn, SignUp} from "./templates/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/management"} component={ManagementPage} />
      <Route exact path={"/list"} component={Members} />
      <Route exact path={"(/)?"} component={Home} />
      <Route exact path={"/regist"} component={RegistShift} />
      <Route exact path={"/info"} component={MyInfomation} />
      <Route exact path={"/create"} component={CreateGroupPage} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/shift"} component={ShiftList} />
      <Route exact path={"/signup"} component={SignUp} />
    </Switch>
  );
};

export default Router;