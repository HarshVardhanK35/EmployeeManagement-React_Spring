/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import fetchEmployees from "../services/EmployeeService";

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetchEmployees()
      .then((res) => {
        setEmployees(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

	return (
		<div>
			<h2 className="text-center">List of Employees</h2>

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
