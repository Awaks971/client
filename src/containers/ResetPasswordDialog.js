import React from "react";
import ButtonDialog from "../components/ButtonDialog";
import { Typography } from "@material-ui/core";
import FormBuilder from "../components/FormBuilder";

function ResetPasswordDialog() {
  const reset_password_fields = [{ name: "email", label: "email" }];
  return (
    <ButtonDialog
      dialogText="Pour réinitialiser votre mot de passe veuillez entrer votre email. Vous receverez un email contenant un lien vous permettant de modifier votre mot de passe"
      dialogTitle="Mot de passe oublié"
      buttonComponent={({ onClick }) => (
        <Typography align="center" onClick={() => onClick()} color="primary">
          Mot de passe oublié ?
        </Typography>
      )}
    >
      {({ onClose }) => {
        return (
          <FormBuilder
            fields={reset_password_fields}
            onSubmit={email => console.log(email)}
          />
        );
      }}
    </ButtonDialog>
  );
}

export default ResetPasswordDialog;
