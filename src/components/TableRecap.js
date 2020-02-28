import React from "react";
import Paper from "../components/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

function TableRecap({ recap }) {
  return (
    <Paper spaced style={{ minHeight: 0 }}>
      <Grid container alignItems="center" justify="center" spacing={3}>
        {recap.map(rec => (
          <Grid key={rec.label} item xs={6} sm={6} md={3}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Typography>{rec.label}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  color="secondary"
                  variant="h5"
                  style={{ fontWeight: 700 }}
                >
                  {rec.value}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default TableRecap;
