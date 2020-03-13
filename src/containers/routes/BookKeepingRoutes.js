import React from "react";
import { Route, Switch } from "react-router-dom";
import BookKeeping from "../../pages/BookKeeping";
import BookKeepingFamily from "../BookKeepingFamily";
import BookKeepingMonth from "../BookKeepingMonth";

function BookKeepingRoutes({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/month`} component={BookKeepingMonth} />
      <Route path={`${match.path}/family`} component={BookKeepingFamily} />
      <Route component={BookKeeping} />
    </Switch>
  );
}

export default BookKeepingRoutes;
