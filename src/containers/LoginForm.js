import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import LoadingButton from "../components/LoadingButton";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import { LOCAL_LOGIN } from "../apollo/user/mutations";
import { DEFAULTS } from "../apollo/localManagement";

const { REACT_APP_BACKEND_END_POINT } = process.env;

function LoginForm({ history }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error_message, set_error_message] = React.useState(null);

  const [localLogin] = useMutation(LOCAL_LOGIN);

  const handleCloseNotification = () => {
    set_error_message(null);
  };

  async function login({ credentials }) {
    setLoading(true);
    try {
      const { data: user } = await axios.post(
        `${REACT_APP_BACKEND_END_POINT}/login`,
        {
          credentials
        }
      );

      const cleanUser = {
        __typename: "User",
        userId: user.id,
        role: user.role,
        loggedAs: user.loggedAs
          ? {
              ...user.loggedAs,
              __typename: "Company",
              address: {
                ...user.loggedAs.address,
                __typename: "CompanyAddress"
              }
            }
          : {
              ...DEFAULTS.auth.loggedAs
            },
        token: user.token,
        userCompanies: user.companies.map(company => ({
          ...company,
          __typename: "Company",
          address: {
            ...company.address,
            __typename: "CompanyAddress"
          }
        }))
      };

      await localLogin({
        variables: {
          input: cleanUser
        }
      });
      if (user.id) {
        setLoading(false);
        setSuccess(true);
      }

      console.log(user);

      user.firstname || user.lastname || user.role === "admin"
        ? history.push("/dashboard")
        : history.push("/finish-register");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSuccess(true);
      set_error_message(err.response && err.response.data.message);
    }
  }

  return (
    <>
      <Grid
        style={{ height: "100vh" }}
        container
        alignItems="center"
        justify="center"
      >
        <Grid item md={4} sm={6} xs={12}>
          <Paper style={{ padding: 24 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h4" style={{ fontWeight: 500 }}>
                  Connexion
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="primary"
                  fullWidth
                  type="email"
                  value={credentials.email}
                  label="Email"
                  onChange={e =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="primary"
                  fullWidth
                  type="password"
                  value={credentials.password}
                  onChange={e =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  label="Mot de passe"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={4}
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    <LoadingButton
                      onClick={async () => {
                        await login({ credentials });
                      }}
                      success={success}
                      loading={loading}
                      color="primary"
                      variant="outlined"
                    >
                      Se connecter
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
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

export default LoginForm;
