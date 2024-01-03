import React from "react";
import { Field, ErrorMessage } from "formik";
import { Label } from "./Label";

const TextArea = ({ label, name, errors, touched, ...rest }: any) => {
  const isInvalid = errors[name] && touched[name];
  return (
    <div className="form-group">
      <Label htmlFor={name} label={label} />
      <Field
        as="textarea"
        // className={`form-control `}
        className={ `form-control ${isInvalid ? 'is-invalid' : ''}` }
        id={name}
        name={name}
        {...rest}
        required
      />
      {/* <ErrorMessage name={name} component="div" className="form-error" /> */}
    </div>
  );
};

export default TextArea;
