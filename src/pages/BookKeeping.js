import React from "react";
import PageHeader from "../components/PageHeader";
import { Grid } from "@material-ui/core";
import ItemCard from "../containers/ItemCard";
import SubjectIcon from "@material-ui/icons/Subject";
import EventIcon from "@material-ui/icons/Event";

const settings_type = [
  {
    label: "Familles",
    path: "/book-keeping/family",
    icon: <SubjectIcon fontSize="large" color="secondary" />,
    description: "Retrouvez vos statistiques par famille"
  },
  {
    label: "Mois",
    path: "/book-keeping/month",
    icon: <EventIcon fontSize="large" color="secondary" />,
    description: "Retrouvez vos statistiques par mois"
  }
];

function Settings() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PageHeader title="Comptabilité" />
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
