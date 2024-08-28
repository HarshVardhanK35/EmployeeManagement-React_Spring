/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])

  const navigator = useNavigate()

  useEffect(() => {
    EmployeeService.fetchEmployees()
      .then((res) => {
        setEmployees(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const addNewEmployee = () => {
    navigator("/add-employee")
  }

  const showEmployeesList = () => {
    navigator('/employees')
  }

	return (
		<div>
			<h2 className="text-center">Employee Management System</h2>

      <div>
        <button type="button" className="btn btn-link" onClick={showEmployeesList}>Employees List</button>
        <button type="button" className="btn btn-link" onClick={addNewEmployee}>Add Employee</button>
      </div>

			<table className = 'table table-bordered'>

				<thead>
					<tr>
						<th scope="col">Employee_id</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Email ID</th>
					</tr>
				</thead>

				<tbody>
					{
            employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <th scope="row">{employee.id}</th>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                </tr>
              );
            })
          }
				</tbody>

			</table>
		</div>
	);
};

export default ListEmployeeComponent;
