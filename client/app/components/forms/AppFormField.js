import React from "react";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

function AppFormField({ name, ...otherProps }) {
  const {
    setFieldValue,
    values,
    errors,
    setFieldTouched,
    touched,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
