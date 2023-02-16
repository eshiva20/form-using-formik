import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup"

const App = () => {
  const[data,setData]=useState([])
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      contact: "",
      gender: "",
      country: "",
    },
    validationSchema:Yup.object({
      username:Yup.string().max(10,"length should be less then 10").required("its required"),
      email:Yup.string().required("its required"),
      contact:Yup.number().min(10).max(10).required("its Required"),
      gender:Yup.string(),
      country:Yup.string().required("its required")
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  });
  


  return (
    <div>
      <h1>React formik </h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username?<p style={{color:"red"}}>{formik.errors.username}</p>:null}  
        <input
          type="email"
          name="email"
          placeholder="Enter Email id"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email?<p style={{color:"red"}}>{formik.errors.email}</p>:null}  
        <input
          type="text"
          name="contact"
          placeholder="Enter Contact"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.contact}
        />
        {formik.touched.contact && formik.errors.contact?<p style={{color:"red"}}>{formik.errors.contact}</p>:null}  
        <h2>Gender</h2>

        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={formik.handleChange}
        />
        <label>Male</label>

        <input
          type="radio"
          name="gender"
          value="Female"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <label>Female</label>

        <select name="country" onBlur={formik.handleBlur} onChange={formik.handleChange}>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="America">America</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
        </select>
        {formik.touched.country && formik.errors.country?<p style={{color:"red"}}>{formik.errors.country}</p>:null}  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
