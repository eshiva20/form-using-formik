import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import UserTable from "./UserTable";
import Formik from "./Formik";

const App = () => {
  const [data, setData] = useState([]);
  const [userinput, setUserInput] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const[userId,setUserId]=useState()

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
      {editMode || addMode ? (
        <Formik
          setUserInput={setUserInput}
          getData={getData}
          userinput={userinput}
          editMode={editMode}
          userId={userId}
          setEditMode={setEditMode}
        />
      ) : null}

      <UserTable
        userinput={userinput}
        setUserInput={setUserInput}
        editMode={editMode}
        setEditMode={setEditMode}
        getData={getData}
        data={data}
        setAddMode={setAddMode}
        addMode={addMode}
        setUserId={setUserId}
      />
    </div>
  );
};

export default App;
