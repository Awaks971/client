import React from "react";
import { Route, Switch } from "react-router-dom";
import Technician from "../../pages/Technician";
import Users from "../../pages/Users";

function AdminRoutes() {
  return (
    <Switch>
      <Route path="/dashboard" component={() => <div>dashboard</div>} />
      <Route path="/technician" component={Technician} />
      <Route path="/users" component={Users} />
    </Switch>
  );
}

export default AdminRoutes;
