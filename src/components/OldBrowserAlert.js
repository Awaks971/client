import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function OldBrowserAlert() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography align="center" variant="h3">
            Votre naviguateur est trop ancien
          </Typography>
          <Typography align="center" variant="h5">
            Mettez le à jour
          </Typography>
          <Typography align="center" variant="body2">
            Pour continuer d'utiliser nos services vous devez utiliser une
            version plus récente de votre naviguateur
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default OldBrowserAlert;
