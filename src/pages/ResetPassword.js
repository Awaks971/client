import React, { useEffect, useState } from "react";
import Paper from "../components/Paper";
import Grid from "@material-ui/core/Grid";
import { ChangePasswordForm } from "../containers/ChangePassword";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PASSWORD } from "../apollo/user/mutations";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import query_string from "query-string";
import { Button, Typography, Snackbar } from "@material-ui/core";
import axios from "axios";

const { REACT_APP_BACKEND_END_POINT } = process.env;

function ResetPassword({ location }) {
  const query_params = query_string.parse(location.search);
  const history = useHistory();
  const [component, set_current_component] = useState("reset_password");
  const [error_message, set_error_message] = useState(null);
  const handleCloseNotification = () => {
    set_error_message(null);
  };

  async function reset_password({ new_password }) {
    try {
      await axios.post(`${REACT_APP_BACKEND_END_POINT}/edit-password`, {
        new_password,
        token: query_params.token
      });
    } catch (err) {
      set_error_message(err.response && err.response.data.message);
    }
  }

  const token = jwt.decode(query_params.token ? query_params.token : null);

  useEffect(() => {
    var current_time = new Date().getTime() / 1000;
    if (current_time > token.exp) {
      set_current_component("reset_password_error");
    }
  }, [query_params, location]);

  return (
    <>
      <Grid style={{ height: "100vh" }} container alignItems="center">
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Paper spaced title="Réinitialisation du mot de passe">
                {component !== "reset_password" ? (
                  <ChangePasswordForm
                    onSubmit={async ({ new_password }) => {
                      await reset_password({ new_password });
                      history.push("/login");
                    }}
                  />
                ) : (
                  <ResetPasswordError />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={Boolean(error_message)}
        onClose={handleCloseNotification}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        message={error_message}
      />
    </>
  );
}

function ResetPasswordError() {
  const history = useHistory();

  return (
    <>
      <Typography paragraph variant="h6">
        Oups ... Expiration du délai.
      </Typography>
      <Typography paragraph variant="body1">
        Le délai pour votre réinitialisation de mot de passe a éxpiré. Vous
        disposé de 15 min pour mettre à jour votre mot de passe
      </Typography>
      <Button
        onClick={() => history.push("/login")}
        variant="contained"
        color="secondary"
        fullWidth
      >
        Retour à la connexion
      </Button>
    </>
  );
}

export default ResetPassword;
