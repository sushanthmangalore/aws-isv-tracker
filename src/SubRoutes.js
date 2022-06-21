import React from "react";
import { Route, Redirect, Switch, useRouteMatch } from "react-router-dom";

export default function SubRoutes() {

  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`/input/`}>
          <Route render={() => <Redirect to={`${match.url}/go`} />} />
        </Route>
        <Route path={`${match.path}/go`} exact render={() => <div></div>} />
      </Switch>
    </div>
  );
}