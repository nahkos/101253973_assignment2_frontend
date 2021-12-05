import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios"
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getEmployees();
    },[] )

    const getEmployees = async () => {
        const response = await axios.get("http://localhost:5000/employees");
        if (response.status === 200) {
            setData(response.data);
        }
    };

    const onDeleteEmployee = async (id) => {
        if(window.confirm("Please confirm employee deletion")) {
            const response = await axios.delete(`http://localhost:5000/employee/${id}`);
            if (response.status === 200) {
                toast.success(response.data);
                getEmployees();
            }
        }
    };
    
    console.log("data=>", data);
    
    return (
        <div className="title"> <p>Employees List</p>
        <div style={{marginTop: "150px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>First Name</th>
                        <th style={{textAlign: "center"}}>Last Name</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.emailId}</td>
                                
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>                                    
                                        <button className="btn btn-delete" onClick={() => onDeleteEmployee(item.id)}>Delete</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-edit">View</button>
                                    </Link> 
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>

        </div>
        </div>
    )
}

export default Home
