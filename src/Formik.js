import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({
  editMode,
  setUserInput,
  userinput,
  getData,
  userId,
  setEditMode,
}) => {
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

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min 3 char required")
      .max(10, "max 10 chars allowed")
      .required("Name Required"),
    email: Yup.string()
      .matches(emailregex, "Enter valid mail id")
      .required("Please enter your email"),
    contact: Yup.string()
      .matches(contactRegex, "Enter Correct Contact number ")
      .required("Contact Required"),
    // state: Yup.string().min(3).required("Select State"),
    // age: Yup.string().required("age is required !"),
  });

  let onSubmit = (values, { setFieldValues }) => {
    console.log("onsubmit called")
    setUserInput({
      name: values.name,
      email: values.email,
      contact: values.contact,
      gender: values.gender,
      state: values.state,
      age: values.age,
    });
  };

  const handleAdd = async (values) => {
    console.log("clickd");
    await axios
      .post("http://localhost:8080/posts", userinput)
      .then(() => {
        alert("User Registered");
        getData();
        values.contact = "";
        values.name = "";
        values.email = "";
        values.gender = "";
        values.state = "0";
        values.age = "";
      })
      .catch((err) => console.log("postErr", err));
  };

  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:8080/posts/${userId}`, userinput)
      .then(() => {
        getData();
      })
      .catch((err) => console.log("postErr", err));
  };

  if (Object.values(userinput).length !== 0) {
    if (!userId) {
      handleAdd();
      setUserInput({});
    } else {
      handleUpdate();
      setUserInput({});
    }
  }

  return (
    <Formik
      initialValues={
        Object.keys(userinput).length === 0 ? userSchema : userinput
      }
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="form">
        <div className="row">
          <div>
            <label>Name :</label>
            <Field
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Enter Username "
            />
            <ErrorMessage name="name" />
          </div>

          <div>
            <label>Email id :</label>
            <Field
              autoComplete="off"
              type="email"
              name="email"
              placeholder="Enter Email id "
            />
            <ErrorMessage name="email" />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Contact Number :</label>
            <Field
              autoComplete="off"
              type="contact"
              name="contact"
              placeholder="Enter contact "
            />
            <ErrorMessage name="contact" />
          </div>

          {/* <div className="radio-container">
            <label>Select One :</label>
            <div>
              <Field
                type="radio"
                name="gender"
                value="Male"
                checked={formik.values.gender === "Male"}
              />
              <label className="gender">Male</label>
            </div>
            <div>
              <Field
                type="radio"
                name="gender"
                value="Female"
                checked={formik.values.gender === "Female"}
              />
              <label className="gender">Female</label>
            </div>
          </div> */}
        </div>

        {/* <div className="row">
          <div>
            <label>State :</label>
            <select {...formik.getFieldProps("state")} name="state">
              <option value="">Select State</option>
              <option value="Maharastra">Maharastra</option>
              <option value="Goa">Goa</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Orissa">Orissa</option>
            </select>
            <ErrorMessage name="state" />
          </div>

          <div className="radio-container">
            <label>Select One :</label>
            <div>
              <Field
                type="radio"
                name="age"
                value="less than 20Age"
                checked={formik.values.age === "less than 20Age"}
              />
              <label>Age {"<"} 20 </label>
            </div>
            <div>
              <Field
                type="radio"
                name="age"
                value="greater than 20Age"
                checked={formik.values.age === "greater than 20Age"}
              />
              <label>Age {">"} 20</label>
            </div>
          </div>
          <ErrorMessage name="age" />
        </div> */}

        {editMode ? (
          <button type="submit" className="submit">
            Update
          </button>
        ) : (
          <button className="submit" type="submit">
            Add User
          </button>
        )}
      </Form>
    </Formik>
  );
};

export default UserForm;
