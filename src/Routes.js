import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Uploader from "./containers/Uploader";
import Input from "./containers/Input";
import Output from "./containers/Output";
import Analysis from "./containers/Analysis";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Route render={() => <Redirect to={`/import`} />} />
      </Route>
      <Route path="/import" exact component={Uploader} />
      <Route path="/dashboard" component={Input} />
      <Route path="/export" exact component={Output} />
      <Route path="/analysis" exact component={Analysis} />
    </Switch>
  );
}