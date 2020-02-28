import React from "react";
import PageHeader from "../components/PageHeader";
import ListUsers from "../containers/ListUsers";
import { Grid } from "@material-ui/core";

function Users() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PageHeader title="Utilisateurs" />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <ListUsers />
      </Grid>
    </Grid>
  );
}

export default Users;
