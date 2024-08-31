import axios from "axios";

const API_URL = "http://localhost:8080/api/employees"

const fetchAllEmployees = () => {
  return axios.get(API_URL)
}

const postEmployee = (employeeObject) => {
  return axios.post(API_URL, employeeObject)
}

const fetchAnEmployee = (employeeId) => {
  return axios.get(`${API_URL}/${employeeId}`)
}

const updateEmployee = (employeeId, employeeObject) => {
  return axios.put(`${API_URL}/${employeeId}`, employeeObject)
}

const deleteEmployee = (employeeId) => {
  return axios.delete(`${API_URL}/${employeeId}`)
}

export default {
  fetchAllEmployees,
  postEmployee,
  fetchAnEmployee,
  updateEmployee,
  deleteEmployee
}