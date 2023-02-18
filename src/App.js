import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import "./App.css";
import * as Yup from "yup";
import axios from "axios";
import UserTable from "./UserTable";

const App = () => {
  const [data, setData] = useState([]);
  const [userinput, setUserInput] = useState({});
  const emailregex =
    /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
  const contactRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      contact: "",
      gender: "N/A",
      state: "",
      age: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "min 3 char required")
        .max(10, "max 10 chars allowed")
        .required("Name Required"),
      email: Yup.string()
        .matches(emailregex, "Enter valid mail id")
        .required("Please Enter your email"),
      contact: Yup.string()
        .matches(contactRegex, "Enter Correct Contact number ")
        .required("Contact Required"),
      state: Yup.string().required("Select State"),
      age: Yup.string().required("age is required !"),
    }),
    onSubmit: (values, { setFieldValues }) => {
      setUserInput({
        name: values.name,
        email: values.email,
        contact: values.contact,
        gender: values.gender,
        state: values.state,
        age: values.age,
      });
      setFieldValues("gender", "");
      console.log("values", values);
    },
  });

  const handleAdd = async () => {
    await axios
      .post("http://localhost:8080/posts", userinput)
      .then(() => {
        alert("User Registered");

        console.log(formik.values);
        formik.values.contact = "";
        formik.values.name = "";
        formik.values.email = "";
        formik.values.gender = "";
        formik.values.state = "0";
        formik.values.age = "";
      })
      .catch((err) => console.log(err));
  };

  if (Object.values(userinput).length !== 0) {
    handleAdd();
    setUserInput({});
  }

  const getData = () => {
    axios
      .get("http://localhost:8080/posts")
      .then((res) => setData(res.data))
      .catch((err) => console.log("getData error", err));
  };

  useEffect(() => {
    getData();
  }, [userinput]);


  return (
    <div className="main">
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div>
            <label>Name :</label>
            <input
              autoComplete="off"
              type="text"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter Username "
            />
            {formik.touched.name && formik.errors.name ? (
              <span>{formik.errors.name}</span>
            ) : null}
          </div>

          <div>
            <label>Email id :</label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter Email id "
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div>
            <label>Contact Number :</label>
            <input
              autoComplete="off"
              type="contact"
              name="contact"
              value={formik.values.contact}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter contact "
            />
            {formik.touched.contact && formik.errors.contact ? (
              <span>{formik.errors.contact}</span>
            ) : null}
          </div>

          <div className="radio-container">
            <label>Select One :</label>
            <div>
              <input
                type="radio"
                name="gender"
                onChange={formik.handleChange}
                value="Male"
                checked={formik.values.gender === "Male"}
              />
              <label className="gender">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                onChange={formik.handleChange}
                value="Female"
                checked={formik.values.gender === "Female"}
              />
              <label className="gender">Female</label>
            </div>
          </div>
        </div>

        <div className="row">
          <div>
            <label>State :</label>
            <select
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              name="state"
            >
              <option value="0">Select State</option>
              <option value="Maharastra">Maharastra</option>
              <option value="Goa">Goa</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Orissa">Orissa</option>
            </select>
            {formik.touched.state && formik.errors.state ? (
              <span>{formik.errors.state}</span>
            ) : null}
          </div>

          <div className="radio-container">
            <label>Select One :</label>
            <div>
              <input
                type="radio"
                name="age"
                onChange={formik.handleChange}
                value="less than 20Age"
                checked={formik.values.age === "less than 20Age"}
              />
              <label>Age {"<"} 20 </label>
            </div>
            <div>
              <input
                type="radio"
                name="age"
                onChange={formik.handleChange}
                value="greater than 20Age"
                checked={formik.values.age === "greater than 20Age"}
              />
              <label>Age {">"} 20</label>
            </div>
          </div>
          {formik.touched.age && formik.errors.age ? (
            <span>{formik.errors.age}</span>
          ) : null}
        </div>

        <button className="submit" type="submit">
          Submit
        </button>
      </form>

      <UserTable data={data} />
    </div>
  );
};

export default App;
