import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./multiplestep.module.css";
import * as Yup from "yup";
import MultiStepFormContext from "@/provider/MultiStepForm";

const validationSchema = Yup.object().shape({
  isdomain: Yup.string().required("Please select whether to include an domain"),

  domainName: Yup.string().when("isdomain", {
    is: (value: any) => value === "no",
    then: (schema) => schema.required("Please Enter Domain Name"),
    otherwise: (schema) => schema,
  }),
});
const Domain = () => {
  const { next, prev, domain, setdomain }: any =
    useContext(MultiStepFormContext);
  return (
    // <div className={s.Domainwrapper}>
    //   <div className={s.heading}>No action needed as of now</div>
    //   <div className={s.btnwrapper}>
    //     <button className={`${s.btnprev} mt-4`} onClick={prev}>
    //       Back
    //     </button>
    //     <button className={`${s.btnnext} mt-4`} onClick={next}>
    //       Next
    //     </button>
    //   </div>
    // </div>
    <div className={s.stepswrapper}>
      <div className={s.maincard}>
        <Formik
          initialValues={domain}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("values", values);

            setdomain(values);
            console.log("values", values);
            next();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} className={s.formwrapper}>
              <div className={s.heading}>Domain Details</div>
              <label htmlFor="">Do you have Domain ?</label>
              <div className="formgroup">
                <label htmlFor="isdomain">
                  yes
                  <Field
                    type="radio"
                    name="isdomain"
                    value="yes"
                    onChange={handleChange}
                    onClick={() => {
                      setFieldValue("domainName", "");
                    }}
                  ></Field>
                </label>
                <label htmlFor="isdomain">
                  no
                  <Field
                    type="radio"
                    name="isdomain"
                    value="no"
                    onChange={handleChange}
                  ></Field>
                </label>
              </div>
              {values.isdomain === "yes" && (
                <div className={s.Domaindetails}>
                  You have already purchased the domain. If you need to make
                  changes to your domain records, please follow the instructions
                  provided by your domain registrar or hosting provider. If you
                  are unsure about the process, feel free to contact their
                  support for assistance.
                </div>
              )}
              {values.isdomain === "no" && (
                <div className="formgroup">
                  <label htmlFor="">Enter the DomainName</label>
                  <Field
                    name="domainName"
                    className="form-control"
                    onChange={handleChange}
                  ></Field>
                  <ErrorMessage
                    name="domainName"
                    component="div"
                    className={s.error}
                  />
                </div>
              )}
              <div className={s.btnwrapper}>
                <button className={`${s.btnprev} mt-4`} onClick={prev}>
                  Back
                </button>
                <button
                  className={`${s.btnnext} mt-4`}
                  type="submit"
                  // onClick={next}
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Domain;
