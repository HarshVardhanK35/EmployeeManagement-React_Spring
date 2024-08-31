/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const AddEmployeeComponent = () => {

  const {id} = useParams()
	const navigator = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("")

	const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: ''
  });

  useEffect(() => {
    if(id) {
      EmployeeService.fetchAnEmployee(id)
      .then((res) => {
        // console.log(res.data)
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setEmail(res.data.email)
        setAddress(res.data.address)
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }, [id])

  const showEmployeesList = () => {
    navigator('/employees')
  }

	const handleFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const handleLastName = (e) => {
		setLastName(e.target.value);
	};
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
  const handleAddress = (e) => {
		setAddress(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

    if (validateForm()) {

      const employeeObject = { firstName, lastName, email, address };

      if(id) {
        EmployeeService.updateEmployee(id, employeeObject)
        .then((res) => {
          console.log(res.data)
          navigator('/employees')
        })
        .catch((err) => {
          console.error(err)
        })
      }
      else {
        try{
          const res = await EmployeeService.postEmployee(employeeObject)
          // console.log(res.data)
          navigator('/employees')
        }
        catch(err) {
          console.error(err)
          if (err.response && err.response.status === 409) {
            alert("An employee with this email already exists.")
          }
          else if (err.response && err.response.status >= 500) {
            alert("A server error occurred. Please try again later.")
          }
          else{
            alert("An unexpected error occurred. Please try again.")
          }
        }
      }
    }
	};

  const validateForm = () => {

		const errorObj = {...errors};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		let isValid = true;

		if (firstName.trim() === "") {
			errorObj.firstName = "First Name is required";
			isValid = false;
		}
    else{
      errorObj.firstName = ''
    }

		if (lastName.trim() === "") {
			errorObj.lastName = "Last Name is required";
			isValid = false;
		}else{
      errorObj.lastName = ''
    }

		if (email.trim() === "") {
			errorObj.email = "Email is required";
			isValid = false;
		}else if(!emailRegex.test(email)) {
      errorObj.email = "Enter a Valid Email";
			isValid = false;
    }else{
      errorObj.email = ''
    }

    if(address.trim()) {
      errorObj.address = "Address is required"
    }else{
      errorObj.address = ''
    }

		setErrors(errorObj);
		return isValid;
	};

  const pageTitle = () => {
    if(id) {
      return <h1>Edit Employee</h1>
    }
    else{
      return <h1>Add Employee</h1>
    }
  }

  const pageButton = () => {
    if (id) {
      return <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }} onClick={handleSubmit}>Update Employee</button>
    }
    else {
      return <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }} onClick={handleSubmit}>Add Employee</button>
    }
  }

	return (
		<>
			<div className="container">

				<br /> <br />
        <div>
          { pageTitle() }
          <button type="button" className="btn btn-link" onClick={showEmployeesList}>Employees List</button>
        </div>

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
									placeholder="Enter Email"
                  name="email"
									value={email}
                  className= {`form-control ${errors.email ? 'is-invalid' : ''}`}
									onChange={handleEmail}
								/>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
							</div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label htmlFor="location" style={{ minWidth: "80px" }}>Location</label>
                <select
                  name = "address"
                  value = {address}
                  className = {`form-control ${errors.address ? 'is-invalid' : ''}`}
                  onChange = {handleAddress}
                >
                  <option value="">Select Location</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
                {errors.address && <div className="invalid-feedback">{errors.location}</div>}
              </div>

						</div>
            { pageButton() }
					</form>
				</div>

			</div>
		</>
	);
};
export default AddEmployeeComponent;