import React, { useState } from "react";
import AxiosWithAuth from "./AxiosWithAuth";
import { Button } from "reactstrap";

const AddForm = props => {
  const [addForm, setAddForm] = useState({
    name: "",
    age: "",
    email: "",
    img: "",
    url: ""
  });

  const handleChange = e => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    AxiosWithAuth()
      .post("/friends", addForm)
      .then(res => {
        console.log(res);
        setAddForm(res.data);
        props.history.push("/friends");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            typ="text"
            name="name"
            placeholder="name"
            value={addForm.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            typ="number"
            name="age"
            placeholder="age"
            value={addForm.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            typ="text"
            name="email"
            placeholder="email"
            value={addForm.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Add a photo of Yourself</label>
          <input
            typ="text"
            name="img"
            placeholder="Img Url"
            value={addForm.img}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Link your profile.</label>
          <input
            typ="text"
            name="url"
            placeholder="Site url"
            value={addForm.url}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" color="warning">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddForm;
