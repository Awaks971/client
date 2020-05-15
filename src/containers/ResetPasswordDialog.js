import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import LoadingButton from "../components/LoadingButton";

import ButtonDialog from "../components/ButtonDialog";
import { Typography } from "@material-ui/core";
import FormBuilder from "../components/FormBuilder";
import axios from "axios";

const { REACT_APP_WEBSERVICE_END_POINT } = process.env;

function ResetPasswordDialog() {
  const [error_message, set_error_message] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const handleCloseNotification = () => {
    set_error_message(null);
  };
  console.log(REACT_APP_WEBSERVICE_END_POINT);
  async function send_reset_password(email) {
    try {
      setLoading(true);
      const { data, status } = await axios.post(
        `${REACT_APP_WEBSERVICE_END_POINT}/reset-password`,
        {
          email
        }
      );
      set_error_message(data && data.message);
      setLoading(false);
      setSuccess(true);
      return status;
    } catch (err) {
      setLoading(false);
      setSuccess(false);

      set_error_message(err.response && err.response.data.message);
    }
  }

  const reset_password_fields = [
    {
      name: "email",
      label: "email"
    }
  ];
  return (
    <>
      <ButtonDialog
        dialogText="Pour réinitialiser votre mot de passe veuillez entrer votre email. Vous receverez un email contenant un lien vous permettant de modifier votre mot de passe"
        dialogTitle="Mot de passe oublié"
        buttonComponent={({ onClick }) => (
          <Typography
            style={{ cursor: "pointer" }}
            align="center"
            onClick={() => onClick()}
            color="primary"
          >
            Mot de passe oublié ?
          </Typography>
        )}
      >
        {({ onClose }) => {
          return (
            <FormBuilder
              formValidations={form => {
                const errors = {};
                const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regexp.test(form.email)) {
                  errors.email = "Email invalide";
                }
                return errors;
              }}
              loading={loading}
              fields={reset_password_fields}
              onSubmit={async ({ email }) => {
                const status = await send_reset_password(email);
                if (status === 200) onClose();
              }}
            />
          );
        }}
      </ButtonDialog>
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

export default ResetPasswordDialog;
