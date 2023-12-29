import React, { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  //   extra?: ReactNode;
  children?: any;
};

export const Title: React.FC<Props> = ({ title, children }) => (
  <div className="title-dashboard">
    {title}
    {children}
    {/* <div className="right-title-dashboard">{extra}</div> */}
  </div>
);

Title.defaultProps = {
  title: null,
};
