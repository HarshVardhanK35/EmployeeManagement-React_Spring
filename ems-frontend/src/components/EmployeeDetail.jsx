/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetailComponent = () => {

  const { id } = useParams();

  const [employee, setEmployee] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.fetchAnEmployee(id)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const goBack = () => {
    navigate("/employees"); // Navigate back to the employee list
  };

  if (!employee) {
    return <div>No employees to show</div>;
  }

  return (
    <div>
      <h2 className="text-center">Employee Details</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Employee Fields</th>
            <th>Employee Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Employee ID</td>
            <td>{employee.id}</td>
          </tr>
          <tr>
            <td>First Name</td>
            <td>{employee.firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{employee.lastName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{employee.email}</td>
          </tr>
          <tr>
            <td>Contact Number</td>
            <td>{employee.contactNumber}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" className="btn btn-primary" onClick={goBack}>
        Back to Employee List
      </button>
    </div>
  );
};
export default EmployeeDetailComponent;