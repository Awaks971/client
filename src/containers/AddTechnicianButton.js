import React from "react";
import ButtonDrawer from "../components/ButtonDrawer";

import AddIcon from "@material-ui/icons/Add";
import FormBuilder from "../components/FormBuilder";
import { Typography } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { ADD_TECHNICIAN } from "../apollo/technician/mutations";

function AddTechnicianButton() {
  const add_technician_fields = [
    { label: "Prénom", name: "firstname" },
    { label: "Nom", name: "lastname" },
    { label: "Email", name: "email" },
    { label: "Téléphone", name: "phone" }
  ];

  const [add_technician] = useMutation(ADD_TECHNICIAN);

  return (
    <ButtonDrawer
      size="small"
      color="secondary"
      label="Ajouter un technicien"
      icon={<AddIcon style={{ marginRight: 10 }} />}
    >
      {({ onClose }) => {
        return (
          <>
            <Typography
              style={{ fontWeight: 900 }}
              color="secondary"
              variant="h4"
              paragraph
            >
              Ajouter un technicien
            </Typography>
            <FormBuilder
              margin="normal"
              onSubmit={technician => {
                add_technician({ variables: { technician } });
                onClose();
              }}
              fields={add_technician_fields}
            />
          </>
        );
      }}
    </ButtonDrawer>
  );
}

export default AddTechnicianButton;
