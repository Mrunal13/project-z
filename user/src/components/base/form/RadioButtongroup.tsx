import React from "react";
import { Field, ErrorMessage } from "formik";
import { Label } from "./Label";

const RadioButtonGroup = ({ label, name, options, ...rest }: any) => (
  <>
    <Label htmlFor={name} label={label} />
    <div className="radiobuttongroup">
      {/* <label htmlFor={name}>{label}</label> */}

      {options.map((option: any) => (
        <label key={option.value} className="form-label">
          <Field type="radio" name={name} value={option.value} {...rest} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
    {/* <ErrorMessage name={name} component="div" className="form-error" /> */}
  </>
);

export default RadioButtonGroup;
