import React from "react";
import PageHeader from "../components/PageHeader";
import { Grid } from "@material-ui/core";
import SettingsCard from "../containers/SettingsCard";

const settings_type = [
  {
    label: "Profile",
    path: "/settings/profil"
  }
];

function Settings() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PageHeader title="Paramètres" />
      </Grid>
      {settings_type.map(({ label, path }) => {
        return (
          <Grid key={label} item xs={12} md={4} sm={6}>
            <SettingsCard label={label} path={path} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Settings;
