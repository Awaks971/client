import React from "react";
import { Route, Switch } from "react-router-dom";
import Settings from "../../pages/Settings";
import UserProfil from "../../pages/UserProfil";

function SettingsRoutes({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/profil`} component={UserProfil} />
      <Route component={Settings} />
    </Switch>
  );
}

export default SettingsRoutes;
