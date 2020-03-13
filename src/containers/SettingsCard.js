import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PersonPinIcon from "@material-ui/icons/PersonPin";

import { useHistory } from "react-router-dom";

function SettingsCard({ label, path = "/" }) {
  const history = useHistory();
  return (
    <Paper
      onClick={() => history.push(path)}
      style={{ padding: 10, cursor: "pointer" }}
    >
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <PersonPinIcon color="secondary" fontSize="large" />
        </Grid>
        <Grid item>
          <Typography color="secondary" variant="h6">
            {label}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SettingsCard;
