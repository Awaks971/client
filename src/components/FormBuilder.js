import React from "react";
import { Field, Form } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LoadingButton from "./LoadingButton";

function FormBuilder({
  onSubmit,
  fields = [],
  margin = "dense",
  submitButton,
  resetAfterSubmit = true,
  initialValues,
  formValidations,
  loading
}) {
  function default_field_validation(field) {
    return !field ? "Champs requis" : "";
  }
  return (
    <Form
      validate={formValidations}
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, invalid }) => {
        return (
          <form
            onSubmit={async e => {
              await handleSubmit(e);
              resetAfterSubmit && form.reset();
            }}
          >
            <Grid container spacing={1} alignItems="center">
              {fields.map(field => (
                <Grid item xs={field.grid || 12} key={field.name}>
                  <Field
                    validate={field.validate || default_field_validation}
                    required={field.required}
                    name={field.name}
                    type={field.type}
                    render={({ input, meta: { error, touched } }) => {
                      return (
                        <TextField
                          {...input}
                          fullWidth
                          required={field.required}
                          type={field.type}
                          margin={margin}
                          error={touched && error && Boolean(error)}
                          helperText={touched && error && <span>{error}</span>}
                          label={field.label}
                          variant="outlined"
                        />
                      );
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item>
                    {submitButton || (
                      <LoadingButton
                        loading={loading}
                        type="submit"
                        disabled={invalid}
                        size={margin === "dense" ? "small" : "medium"}
                        variant="contained"
                        color="secondary"
                      >
                        Valider
                      </LoadingButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        );
      }}
    />
  );
}

export default FormBuilder;
