/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate } from 'react-router-dom';

const HeaderComponent = () => {

  const navigator = Navigate()

  const showEmployeesList = () => {
    navigator('/employees')
  }

  return (
    <div>
      <button type="button" className="btn btn-link" onClick={showEmployeesList}>Employees List</button>
    </div>
  )
}

export default HeaderComponent;