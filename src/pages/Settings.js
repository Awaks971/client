import React from "react";
import PageHeader from "../components/PageHeader";
import { Grid } from "@material-ui/core";
import ItemCard from "../containers/ItemCard";
import PersonPinIcon from "@material-ui/icons/PersonPin";

const settings_type = [
  {
    label: "Profile",
    path: "/settings/profil",
    icon: <PersonPinIcon fontSize="large" color="secondary" />,
    description: "description"
  }
];

function Settings() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PageHeader title="Paramètres" />
      </Grid>
      {settings_type.map(({ label, path, icon, description }) => {
        return (
          <Grid key={label} item xs={12} md={4} sm={6}>
            <ItemCard
              label={label}
              path={path}
              icon={icon}
              description={description}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Settings;
