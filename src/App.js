import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import LoginForm from "./containers/LoginForm";
import PrivateRoute from "./containers/PrivateRoute";
import createApolloClient from "./apollo/apolloClient";
import moment from "moment";
import "moment/locale/fr"; // without this line it didn't work

function App() {
  const [client, setClient] = useState(undefined);

  moment.locale("fr");
  useEffect(() => {
    setClient(createApolloClient(process.env.REACT_APP_BACKEND_END_POINT));
    return () => {};
  }, []);

  // TODO: Create GlobalLoader component :)
  if (client === undefined) return <div>Loading...</div>;

  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/forgot-password" component={LoginForm} />
        <PrivateRoute />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
