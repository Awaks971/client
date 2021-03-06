import React from "react";
import PageHeader from "../components/PageHeader";
import { Grid } from "@material-ui/core";
import Paper from "../components/Paper";
import FormBuilder from "../components/FormBuilder";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  PERSONNAL_INFORMATIONS,
  CURRENT_LOGGED_USER
} from "../apollo/user/queries";
import {
  UPDATE_PERSONAL_INFORMATIONS,
  UPDATE_STORE
} from "../apollo/user/mutations";
import ChangePassword from "../containers/ChangePassword";
import _ from "lodash";

function UserProfil() {
  const user_profil_fields = [
    { label: "Email", name: "email", required: true, grid: 4 },
    { label: "Prénom", name: "firstname", required: true, grid: 4 },
    { label: "Nom", name: "lastname", required: true, grid: 4 }
  ];
  const company_fields = [
    { label: "Magasin", name: "name", required: true, grid: 4 },
    { label: "Téléphone", name: "phone", required: true, grid: 4 },
    { label: "Adresse", name: "address.line1", required: true, grid: 4 },
    {
      label: "Code postal",
      name: "address.postal_code",
      required: true,
      grid: 4
    },
    { label: "Ville", name: "address.city", required: true, grid: 4 }
  ];
  const { data: user_data, loading: user_loading } = useQuery(
    PERSONNAL_INFORMATIONS
  );
  const [update_personnal_informations] = useMutation(
    UPDATE_PERSONAL_INFORMATIONS
  );

  const { data: company_data, loading: company_loading } = useQuery(
    CURRENT_LOGGED_USER
  );
  const [update_store] = useMutation(UPDATE_STORE);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <PageHeader title="Mon profil">
          <ChangePassword />
        </PageHeader>
      </Grid>
      <Grid item xs={12}>
        <Paper
          bodyLoading={user_loading}
          spaced
          title="Informations personnelles"
        >
          <FormBuilder
            initialValues={user_data && user_data.me}
            resetAfterSubmit={false}
            onSubmit={user => {
              const clean_payload = _.omit(user, [
                "id",
                "companies",
                "__typename"
              ]);

              update_personnal_informations({
                variables: { personal_informations: clean_payload }
              });
            }}
            fields={user_profil_fields}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          bodyLoading={company_loading}
          spaced
          title="Informations du magasin"
        >
          <FormBuilder
            initialValues={company_data && company_data.auth.loggedAs}
            resetAfterSubmit={false}
            onSubmit={company => {
              const clean_payload = _.omit(company, [
                "siret",
                "__typename",
                "address.__typename"
              ]);
              update_store({ variables: { store: clean_payload } });
            }}
            fields={company_fields}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserProfil;
