import React from "react";
import { Grid, Typography } from "@material-ui/core";
import PageHeader from "../components/PageHeader";
import FormBuilder from "../components/FormBuilder";
import Paper from "../components/Paper";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { PERSONNAL_INFORMATIONS } from "../apollo/user/queries";
import { FINISH_REGISTER } from "../apollo/user/mutations";
import { useHistory } from "react-router-dom";

function FinishRegister() {
  const history = useHistory();
  const { data } = useQuery(PERSONNAL_INFORMATIONS);
  const [finish_register, { loading }] = useMutation(FINISH_REGISTER, {
    refetchQueries: [{ query: PERSONNAL_INFORMATIONS }],
    onCompleted() {
      history.push("/dashboard");
    }
  });
  const fields = [
    { name: "firstname", label: "Prénom", grid: 4, required: true },
    { name: "lastname", label: "Nom", grid: 4, required: true },
    { name: "email", label: "Email", grid: 4, required: true },
    {
      name: "new_password",
      label: "Nouveau mot de passe",
      grid: 6,
      required: true,
      type: "password"
    },
    {
      name: "new_password_confirmation",
      label: "Confirmer le nouveau mot de passe",
      grid: 6,
      required: true,
      type: "password"
    }
  ];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title="Finalisation d'inscription" />
      </Grid>
      <Grid item xs={12}>
        <Paper spaced>
          <Typography paragraph>
            Toutes ces informations seront utilisé uniquement pour le bon
            fonctionnement de la plateforme. Aucunes de vos informations ne
            seront échangé ou vendu a qui que ce soit.
          </Typography>
          <FormBuilder
            loading={loading}
            formValidations={form => {
              const errors = {};
              if (
                form.new_password_confirmation &&
                form.new_password !== form.new_password_confirmation
              ) {
                errors.new_password_confirmation =
                  "Les mots de passe ne sont pas identique";
                errors.new_password = "Les mots de passe ne sont pas identique";
              }
              return errors;
            }}
            initialValues={data && data.me}
            onSubmit={user => {
              delete user.id;
              delete user.__typename;
              delete user.companies;
              delete user.new_password_confirmation;
              finish_register({ variables: { user } });
            }}
            fields={fields}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default FinishRegister;
