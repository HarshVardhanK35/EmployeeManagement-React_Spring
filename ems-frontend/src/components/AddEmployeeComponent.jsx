/* eslint-disable no-unused-vars */
import { React, useState } from 'react'

const AddEmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  return(
    <>
    <div className="container">
      <h1>Add Employee</h1>
        <div className=''>
        <form action="">
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '50VW' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label htmlFor="firstName" style={{ minWidth: '80px' }}>First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" style={{ flex: '1' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label htmlFor="lastName" style={{ minWidth: '80px' }}>Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" style={{ flex: '1' }} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '20px'}}>Submit</button>
          </form>
        </div>
    </div>
    </>
  )
}

export default AddEmployeeComponent