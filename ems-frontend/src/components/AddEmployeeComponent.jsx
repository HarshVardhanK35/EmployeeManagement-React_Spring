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
  const [contactNumber, setContactNumber] = useState("")
  const [location, setLocation] = useState("")

	const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    location: ''
  });

  useEffect(() => {

    if(id) {
      EmployeeService.fetchAnEmployee(id) .then((res) => {
        console.log(res.data)
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setEmail(res.data.email)
        setContactNumber(res.data.contactNumber)
        setLocation(res.data.location)
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
	}
	const handleLastName = (e) => {
		setLastName(e.target.value);
	}
	const handleEmail = (e) => {
		setEmail(e.target.value);
	}
  const handleContactNumber = (e) => {
    setContactNumber(e.target.value)
  }
  const handleLocation = (e) => {
    setLocation(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employeeObject = { firstName, lastName, email, contactNumber, location };

      try {
        let res;
        if (id) {
          res = await EmployeeService.updateEmployee(id, employeeObject);
        } else {
          res = await EmployeeService.postEmployee(employeeObject);
        }
        console.log(res.data);
        navigator('/employees');
      }
      catch (err) {
        console.error(err);
        if (err.response && err.response.status === 409) {
          alert("An employee with this email and number has already been taken");
        } else if (err.response && err.response.status >= 500) {
          alert("A server error occurred. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const validateForm = () => {

    const errorObj = {...errors};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]{10}$/;


    let isValid = true;

    if (firstName.trim() === "") {
			errorObj.firstName = "First Name is required";
			isValid = false;
		} else{
      errorObj.firstName = ''
    }

    if (lastName.trim() === "") {
			errorObj.lastName = "Last Name is required";
			isValid = false;
		} else{
      errorObj.lastName = ''
    }

    if (email.trim() === "") {
			errorObj.email = "Email is required";
			isValid = false;
		} else if(!emailRegex.test(email)) {
      errorObj.email = "Enter a Valid Email";
			isValid = false;
    } else{
      errorObj.email = ''
    }

    if (contactNumber.trim() === ''){
      errorObj.contactNumber = 'Number is required'
      isValid = false
    } else if (!numberRegex.test(contactNumber)) {
      errorObj.contactNumber = 'Enter a valid phone number'
			isValid = false;
    } else {
      errorObj.contactNumber = ''
    }

    if (location.trim() === '') {
      errorObj.location = "Location is required"
      isValid = false
    } else {
      errorObj.location = ''
    }

		setErrors(errorObj);
		return isValid;
	}

  const pageTitle = () => {
    if(id) {
      return <h1>Edit Employee</h1>
    } else{
      return <h1>Add Employee</h1>
    }
  }
  const pageButton = () => {
    if (id) {
      return <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }} onClick={handleSubmit}>Update Employee</button>
    } else {
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
                <label htmlFor="contactNumber" style={{ minWidth: "80px" }}>Phone No.</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  name="contactNumber"
                  value={contactNumber}
                  className= {`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                  onChange={handleContactNumber}
                />
                {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label htmlFor="location" style={{ minWidth: "80px" }}>Location</label>
                <select
                  name="location"
                  value={location}
                  className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  onChange={handleLocation}
                >
                  <option value="">Select Location</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
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