import React from "react";
import { Route, Switch } from "react-router-dom";
import CashJournal from "../../pages/CashJournal";
import Receipts from "../../pages/Receipts";

function CashJournalRoutes({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/:id/receipts`} component={Receipts} />
      <Route component={CashJournal} />
    </Switch>
  );
}

export default CashJournalRoutes;
