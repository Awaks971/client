import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import LoginForm from "./containers/LoginForm";
import PrivateRoute from "./containers/PrivateRoute";
import createApolloClient from "./apollo/apolloClient";
import ResetPassword from "./pages/ResetPassword";

const { REACT_APP_BACKEND_END_POINT } = process.env;

function App() {
  const [client, setClient] = useState(undefined);

  useEffect(() => {
    setClient(createApolloClient(REACT_APP_BACKEND_END_POINT));
    return () => {};
  }, []);

  // TODO: Create GlobalLoader component :)
  if (client === undefined) return <div>Loading...</div>;

  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/reset-password" component={ResetPassword} />
        <PrivateRoute />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
