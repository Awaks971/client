import React from "react";

import Layout from "./Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useQuery } from "@apollo/react-hooks";
import AdminRoutes from "./routes/AdminRoutes";
import ClientRoutes from "./routes/ClientRoutes";
import { CURRENT_USER } from "../apollo/localManagement";

function PrivateRoute() {
  // Read the local state and extract the token
  const { data, loading } = useQuery(CURRENT_USER);

  if (loading) return "";

  // Redirect if the user has no token
  if (!data || !data.auth || !data.auth.token) {
    return <Redirect to="/login" />;
  }

  const routes = {
    admin: <AdminRoutes />,
    client: <ClientRoutes />
  };

  return (
    <Layout role={data.auth.role} context={data ? data.auth : null}>
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
              {routes[data.auth.role]}
            </Switch>
          </AnimatePresence>
        )}
      />
    </Layout>
  );
}

export default PrivateRoute;
