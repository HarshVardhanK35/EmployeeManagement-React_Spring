/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const AddEmployeeComponent = () => {
	const navigator = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

	const handleFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const handleLastName = (e) => {
		setLastName(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

    if (validateForm()) {
      const employeeObject = { firstName, lastName, email };
      console.log(employeeObject);

      EmployeeService.postEmployee(employeeObject)
        .then((res) => {
          console.log(res.data);
          navigator("/employees");
        })
        .catch((err) => {
          console.error(err);
        });
    }
	};

  const validateForm = () => {

		const errorObj = {...errors};

		let isValid = true;

		if (firstName.trim() === "") {
			errorObj.firstName = "Enter First Name";
			isValid = false;
		}
    else{
      errorObj.firstName = ''
    }
		if (lastName.trim() === "") {
			errorObj.lastName = "Enter Last Name";
			isValid = false;
		}
    else{
      errorObj.firstName = ''
    }
		if (email.trim() === "") {
			errorObj.email = "Enter Email";
			isValid = false;
		}
    else{
      errorObj.firstName = ''
    }
		setErrors(errorObj);
		return isValid;
	};

	return (
		<>
			<div className="container">
				<br /> <br />
				<h1>Add Employee</h1>
				<div className="">
					<form action="">
						<br />
            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "50VW"}}>
						<div style={{ display: "flex", alignItems: "center", gap: "10px" }} >
							<label htmlFor="firstName" style={{ minWidth: "80px" }}>First Name</label>
							<input
								type="text"
								placeholder="Enter First Name"
                name="firstName"
								value={firstName}
                className= {`form-control ${errors.firstName ? 'is-invalid' : ''}`}
								onChange={handleFirstName}
							/>
							{errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
						</div>
							<div style={{ display: "flex", alignItems: "center", gap: "10px" }} >
								<label htmlFor="lastName" style={{ minWidth: "80px" }}>Last Name</label>
								<input
                  type="text"
									placeholder="Enter Last Name"
                  name="lastName"
									value={lastName}
                  className= {`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={handleLastName}
								/>
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
							<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
								<label htmlFor="email" style={{ minWidth: "80px" }}>Email Id</label>
								<input
									type="text"
									placeholder="Enter First Name"
                  name="email"
									value={email}
                  className= {`form-control ${errors.email ? 'is-invalid' : ''}`}
									onChange={handleEmail}
								/>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
							</div>
						</div>
						<button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }} onClick={handleSubmit}>Submit</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddEmployeeComponent;