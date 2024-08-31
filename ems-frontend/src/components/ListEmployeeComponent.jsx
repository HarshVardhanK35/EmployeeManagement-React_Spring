/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])

  const navigator = useNavigate()

  const getAllEmployees = () => {
    EmployeeService.fetchAllEmployees()
      .then((res) => {
        setEmployees(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getAllEmployees()
  }, [])

  const addNewEmployee = () => {
    navigator("/add-employee")
  }

  const showEmployeesList = () => {
    navigator('/employees')
  }

  const editEmployee = (id) => {
    navigator(`/edit-employee/${id}`)
  }

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id)
    .then((res) => {
      getAllEmployees()
    })
    .catch((err) => {
      console.error(err)
    })
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
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>

				<tbody>
					{
            employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <th scope="row"><a href={``}>{employee.id}</a></th>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td><button type="button" className="btn btn-link btn-light" onClick={ () => { return editEmployee(employee.id) } }>Edit</button></td>
                  <td><button type="button" className="btn btn-link btn-light" onClick={ () => { return deleteEmployee(employee.id) } }>Delete</button></td>
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
