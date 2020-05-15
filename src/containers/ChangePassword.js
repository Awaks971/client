import React from "react";
import ButtonDrawer from "../components/ButtonDrawer";

import AddIcon from "@material-ui/icons/Add";
import FormBuilder from "../components/FormBuilder";
import { Typography } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PASSWORD } from "../apollo/user/mutations";
import ButtonDialog from "../components/ButtonDialog";

function ChangePassword() {
  const [update_password] = useMutation(UPDATE_PASSWORD);

  return (
    <ButtonDialog
      size="small"
      dialogTitle="Modifier le mot de passe"
      dialogText="Le mot de passe doit contenir au moins 1 minuscule, 1 majuscules, 1 chiffre et au moins 8 caractères"
      color="secondary"
      buttonTitle="Modifier le mot de passe"
      icon={<AddIcon style={{ marginRight: 10 }} />}
    >
      {({ onClose }) => {
        return (
          <>
            <ChangePasswordForm
              onSubmit={async ({ new_password }) => {
                await update_password({ variables: { new_password } });
                onClose();
              }}
            />
          </>
        );
      }}
    </ButtonDialog>
  );
}

export function ChangePasswordForm({ onSubmit, onClose }) {
  const update_password_fields = [
    {
      name: "new_password",
      label: "Nouveau mot de passe",
      grid: 12,
      required: true,
      type: "password"
    },
    {
      name: "new_password_confirmation",
      label: "Confirmer le nouveau mot de passe",
      grid: 12,
      required: true,
      type: "password"
    }
  ];
  return (
    <FormBuilder
      formValidations={form => {
        const errors = {};
        ///^
        //(?=.*\d)          // should contain at least one digit
        //(?=.*[a-z])       // should contain at least one lower case
        //(?=.*[A-Z])       // should contain at least one upper case
        //[a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
        //$/
        const password_regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (
          form.new_password_confirmation &&
          form.new_password &&
          form.new_password !== form.new_password_confirmation
        ) {
          errors.new_password_confirmation =
            "Les mots de passe ne sont pas identique";
          errors.new_password = "Les mots de passe ne sont pas identique";
        }

        if (!password_regexp.test(form.new_password)) {
          errors.new_password =
            "Le mot de passe doit contenir au moins 1 minuscule, 1 majuscules, 1 chiffre et au moins 8 caractères";
        }
        return errors;
      }}
      margin="normal"
      onSubmit={onSubmit}
      fields={update_password_fields}
    />
  );
}

export default ChangePassword;
