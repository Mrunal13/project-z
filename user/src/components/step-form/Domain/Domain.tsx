import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import s from "./domain.module.css";
import * as Yup from "yup";
import MultiStepFormContext from "@/provider/MultiStepForm";
import { FaCopy } from "react-icons/fa";
import Image from "next/image";
const validationSchema = Yup.object().shape({
  hasDomain: Yup.string().required(
    "Please select whether to include an Domain"
  ),
});

const Domain = () => {
  const {
    next,
    prev,
    domain,
    setdomain,
    Industrydetails,
    setIndustryDetails,
  }: any = useContext(MultiStepFormContext);

  const handleDomainForm = (values: any) => {
    // set the domain form values.
    setdomain(values);
    // Call next() to proceed to the next step
    if (values.hasDomain == "yes") {
      next(6);
    }
    if (values.hasDomain == "no") {
      next(5);
    }
  };
  const handleDomain = (value: string, setFieldValue: any) => {
    setFieldValue("hasDomain", value);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      hasDomain: value,
    }));
  };
  return (
    <div className="container">
      <div className="other-main-wrapper">
        {/* <Title title={`Let’s Create a Unique Logo For Your Brand!`} /> */}
        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          validationSchema={validationSchema}
          onSubmit={handleDomainForm}
        >
          {({ handleSubmit, handleChange, setFieldValue, values }) => (
            <form
              onSubmit={handleSubmit}
              className="popup-container formwrapper"
            >
              <div className="title-dashboard">
                Get <span className="style-title">unique name</span> that will
                make your business stand out.
              </div>
              {Industrydetails.hasDomain !== "yes" && (
                <>
                  <h5 className="popup-title">Do you Already have a Domain?</h5>
                  <div className="popup-btncontainer">
                    <button onClick={() => handleDomain("yes", setFieldValue)}>
                      Yes
                    </button>
                    <button onClick={() => handleDomain("no", setFieldValue)}>
                      No
                    </button>
                  </div>
                  <ErrorMessage
                    name="hasDomain"
                    component="div"
                    className="form-error"
                  />
                </>
              )}
              {Industrydetails.hasDomain == "yes" && (
                <div className={s.instruction_main}>
                  <div className={s.domain_instruction_wrapper}>
                    <div className={s.instructions_steps}>
                      <div className={s.step}>
                        <h5>Step</h5>
                        <span className={s.stepCount}>1</span>
                      </div>
                      <div className={s.stepTitle}>
                        <label htmlFor="">Select record type</label>
                      </div>
                    </div>
                    <Select
                      className={s.instruction_select}
                      classNamePrefix="select"
                    />
                    <div className={s.instructions_steps}>
                      <div className={s.step}>
                        <h5>Step</h5>
                        <span className={s.stepCount}>2</span>
                      </div>
                      <div className={s.stepTitle}>
                        <label htmlFor="">
                          Sign in to your domain name provider (e.g. godaddy.com
                          or namecheap.com)
                        </label>
                      </div>
                    </div>
                    <div className={s.instructions_steps}>
                      <div className={s.step}>
                        <h5>Step</h5>
                        <span className={s.stepCount}>3</span>
                      </div>
                      <div className={s.stepTitle}>
                        <label htmlFor="">
                          Copy the TXT record below into the DNS configuration
                          for test.com
                        </label>
                      </div>
                    </div>
                    <div className={s.copy_input_container}>
                      <input
                        type="text"
                        placeholder="Type or paste text here"
                      />
                      <Image
                        src="images/copy-icon.svg"
                        alt="copy-icon"
                        height={24}
                        width={24}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className={s.instructions_steps}>
                      <div className={s.step}>
                        <h5>Step</h5>
                        <span className={s.stepCount}>4</span>
                      </div>
                      <div className={s.stepTitle}>
                        <label htmlFor="">Press verify below</label>
                      </div>
                    </div>
                    <div className={s.note}>
                      Note: DNS changes may take some time to apply. If Search
                      Console dosen’t find the record immediately, wait a day
                      and then try to verify again <a href="#">learn more</a>
                    </div>
                    <div className={s.verift_btn}>
                      <button>verify</button>
                      <a
                        href="#"
                        onClick={() => {
                          setIndustryDetails((prevdata: any) => ({
                            ...prevdata,
                            hasDomain: "",
                          }));
                        }}
                      >
                        cancel
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="btnwrapper align-self-end ">
                <button
                  className="btnprev btn"
                  onClick={() => {
                    if (Industrydetails.hasBrandLogo == "yes") {
                      prev(2);
                    } else {
                      prev(3);
                    }
                  }}
                >
                  <a>Back</a>
                </button>
                <button className="btnnext btn" type="submit">
                  <a>Next</a>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Domain;
