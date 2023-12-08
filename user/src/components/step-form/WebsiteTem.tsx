import React, { useContext } from "react";
import { Formik } from "formik";
import s from "./multiplestep.module.css";

// import { Button } from "antd";
// import { Input } from "formik-antd";
import MultiStepFormContext from "@/provider/MultiStepForm";
const WebsiteTemp = () => {
  const { next, prev }: any = useContext(MultiStepFormContext);
  return (
    <div className={s.brandNamewrapper}>
      <div className={s.heading}>No action needed as of now</div>
      <div className={s.btnwrapper}>
        <button className={`${s.btnprev} mt-4`} onClick={prev}>
          Back
        </button>
        <button className={`${s.btnnext} mt-4`} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};
export default WebsiteTemp;
