import React, { ReactNode } from "react";

type Props = {
  label?: ReactNode;
  htmlFor?:any;
  //   extra?: ReactNode;
  children?: any;
};

export const Label: React.FC<Props> = ({ label,htmlFor, children }) => (
  <label className="form-label" htmlFor={htmlFor}>
    {label}
    {children}
    {/* <div className="right-title-dashboard">{extra}</div> */}
  </label>
);

Label.defaultProps = {
  label: null,
};
