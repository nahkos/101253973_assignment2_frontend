import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


const initialState = {
  firstName: "",
  lastName: "",
  emailId: "",
  
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { firstName, lastName, emailId} = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleEmployee(id);
    }
  }, [id]);

  const getSingleEmployee = async (id) => {
    const response = await axios.get(`http://localhost:5000/employee/${id}`);
    if (response.status === 200) {
      setState({...response.data[0]});
    }
  };

  const addEmployee = async (data) => {
    const response = await axios.post("http://localhost:5000/employee", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };
  const updateEmployee = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/employee/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !emailId) {
      toast.error("Please enter value into each input field");
    } else {
      if (!id) {
        addEmployee(state);
      } else {
        updateEmployee(state, id)
      }      
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="title"> <p>Add Employee</p>
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter First Name ..."
          onChange={handleInputChange}
          value={firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter Last Name ..."
          onChange={handleInputChange}
          value={lastName}
        />
        
        <label htmlFor="emailId">Email</label>
        <input
          type="email"
          id="emailId"
          name="emailId"
          placeholder="Enter Email ..."
          onChange={handleInputChange}
          value={emailId}
        />
        
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
    </div>
  );
};

export default AddEdit;
