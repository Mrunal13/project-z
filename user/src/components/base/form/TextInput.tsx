import React from "react";
import { Field, ErrorMessage } from "formik";
import { Label } from "./Label";

const TextInput = ({ label, name, ...rest }: any) => (
  <div className="form-group">
    {label && <Label htmlFor={name} label={label} />}
    <Field
      className="form-control"
      type="text"
      id={name}
      name={name}
      {...rest}
    />
    {/* <ErrorMessage name={name} component="div" className="form-error" /> */}
  </div>
);

export default TextInput;
