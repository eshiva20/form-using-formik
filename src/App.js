import React from "react";
import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  contact: "",
};
const registrationSchema = Yup.object({
  name: Yup.string()
    .min(3, "minimum 3 char required")
    .max(15, "max 15 chars allowed")
    .required("required !"),
  email: Yup.string().email().required("required !"),
  contact: Yup.string().min(10,"enter valid phone Number").max(10,"enter valid phone Number").required("required !"),
});
const App = () => {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registrationSchema,
      onSubmit: (values) => {
        console.log("values", values);
      },
    });

  return (
    <div>
      <h1 className="title">Contact Dairy</h1>
      <div className="main">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-elem">
            <label htmlFor="name">Name :</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              name="name"
              id="name"
              type="text"
            />
            {touched.name && errors.name ? <span>{errors.name}</span> : null}
          </div>
          <div className="form-elem">
            <label htmlFor="email">Email :</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              id="email"
              type="email"
            />
            {touched.email && errors.email ? <span>{errors.email}</span> : null}
          </div>
          <div className="form-elem">
            <label htmlFor="contact">Contact :</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact}
              name="contact"
              id="contact"
              type="text"
            />
            {touched.contact && errors.contact ? (
              <span>{errors.name}</span>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;
