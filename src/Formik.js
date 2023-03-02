import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextError from "./TextError";

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
    social: {
      facebook: "",
      instagram: "",
    },
    hobbies: ["", ""],
  };

  let validationSchema = Yup.object().shape({
    // name: Yup.string()
    //   .min(3, "min 3 char required")
    //   .max(10, "max 10 chars allowed")
    //   .required("Name Required"),
    // email: Yup.string()
    //   .matches(emailregex, "Enter valid mail id")
    //   .required("Please enter your email"),
    // contact: Yup.string()
    //   .matches(contactRegex, "Enter Correct Contact number ")
    //   .required("Contact Required"),
    // state: Yup.string().min(3).required("Select State"),
    // age: Yup.string().required("age is required !"),
  });

  let onSubmit = (values, { setFieldValues }) => {
    console.log("form submission", values);
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
  console.log('formik----values')

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
            <ErrorMessage component={TextError} name="name" />
          </div>

          <div>
            <label>Email id :</label>
            <Field
              autoComplete="off"
              type="email"
              name="email"
              placeholder="Enter Email id "
            />
            <ErrorMessage name="email">
              {(errMessage) => (
                <div style={{ color: "orange" }}>{errMessage}</div>
              )}
            </ErrorMessage>
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
            <ErrorMessage component={TextError} name="contact" />
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

        <div className="row">
          <div>
            <label>faceBook Profile :</label>
            <Field
              autoComplete="off"
              type="text"
              name="social.facebook"
              placeholder="Enter facebook profile "
            />
          </div>
          <div>
            <label>Instagram Profile :</label>
            <Field
              autoComplete="off"
              type="text"
              name="social.instagram"
              placeholder="Enter Instagram profile "
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Hobbie :</label>
            <Field
              autoComplete="off"
              type="text"
              name="hobbies[0]"
              placeholder="Hobbie"
            />
          </div>
          <div>
            <label>Hobbie :</label>
            <Field
              autoComplete="off"
              type="text"
              name="hobbies[1]"
              placeholder="Hobbie "
            />
          </div>
        </div>


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
