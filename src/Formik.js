import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const Formik = ({ editMode, setUserInput ,userinput ,getData}) => {
  const emailregex =
    /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
  const contactRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  let userSchema = {
    id: "",
    name: "",
    email: "",
    contact: "",
    gender: "N/A",
    state: "",
    age: "",
  };

  const formik = useFormik({
    initialValues:Object.keys(userinput).length===0?userSchema:userinput,
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

  console.log("initialValues in formik",formik.values)

  const handleAdd = async () => {
    await axios
      .post("http://localhost:8080/posts", userinput)
      .then(() => {
        alert("User Registered");
        getData();
        formik.values.contact = "";
        formik.values.name = "";
        formik.values.email = "";
        formik.values.gender = "";
        formik.values.state = "0";
        formik.values.age = "";
      })
      .catch((err) => console.log("postErr", err));
  };

  const handleUpdate = async () => {
    await axios
      .put("http://localhost:8080/posts", userinput)
      .then(() => {
        alert("User UpDated");
        getData();
        formik.values.contact = "";
        formik.values.name = "";
        formik.values.email = "";
        formik.values.gender = "";
        formik.values.state = "0";
        formik.values.age = "";
      })
      .catch((err) => console.log("postErr", err));
  };

  if (!editMode && Object.values(userinput).length !== 0) {
    handleAdd();
    setUserInput({});
  }

  

  return (
    <div>
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

        {editMode ? (
          <button className="submit">Update</button>
        ) : (
          <button className="submit" type="submit">
            Add User
          </button>
        )}
      </form>
    </div>
  );
};

export default Formik;
