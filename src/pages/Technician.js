import React from "react";
import PageHeader from "../components/PageHeader";
import AddTechnicianButton from "../containers/AddTechnicianButton";
import ListTechnicians from "../containers/ListTechnicians";
import { Grid } from "@material-ui/core";

function Technician() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PageHeader title="Techniciens">
          <AddTechnicianButton />
        </PageHeader>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <ListTechnicians />
      </Grid>
    </Grid>
  );
}

export default Technician;
