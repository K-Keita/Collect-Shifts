import React from "react";
import { Route, Switch } from "react-router";
import {Home, ManagementPage, Members} from "./templates/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/management"} component={ManagementPage} />
      <Route exact path={"/list"} component={Members} />
      <Route exact path={"(/)?"} component={Home} />
    </Switch>
  );
};

export default Router;