import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [employee, setEmployee] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleEmployee(id);
    }
  }, [id]);

  const getSingleEmployee = async (id) => {
    const response = await axios.get(`http://localhost:5000/employee/${id}`);
    if (response.status === 200) {
      setEmployee({ ...response.data[0] });
    }
  };

  return <div style={{marginTop: "150px"}}>
      <div className="card">
          <div className="card-header">
              <p>Employee Contact Detail</p>
          </div>
          <div className="container">
              <strong style={{color: "pink"}}>ID: </strong>
              <span className="title">{id} </span>
              <br />
              <br />
          </div>
          <div className="container">
              <strong style={{color: "pink"}}>First Name: </strong>
              <span className="title">{employee && employee.firstName} </span>
              <br />
              <br />
          </div>
          <div className="container">
              <strong style={{color: "pink"}}>Last Name: </strong>
              <span className="title">{employee && employee.lastName} </span>
              <br />
              <br />
          </div>
          <div className="container">
              <strong style={{color: "pink"}}>Email: </strong>
              <span className="title">{employee && employee.emailId} </span>
              <br />
              <br />
              <Link to="/">
                  <button className="btn btn-edit">Go Back</button>
              </Link>
          </div>
      </div>
  </div>;
};

export default View;
