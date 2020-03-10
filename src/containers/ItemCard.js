import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { useHistory } from "react-router-dom";

function ItemCard({ label, path = "/", icon, description }) {
  const history = useHistory();

  return (
    <Paper
      onClick={path ? () => history.push(path) : x => x}
      style={{ padding: 10, cursor: "pointer" }}
    >
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>{icon}</Grid>
        <Grid item>
          <Typography color="secondary" variant="h6">
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="initial" variant="body2">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ItemCard;
