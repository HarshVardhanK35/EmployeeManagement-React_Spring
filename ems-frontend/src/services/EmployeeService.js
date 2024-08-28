import axios from "axios";

const API_URL = "http://localhost:8080/api/employees"

const fetchEmployees = () => {
  return axios.get(API_URL)
}

const postEmployee = (employeeObject) => {
  return axios.post(API_URL, employeeObject)
}

export default {
  fetchEmployees,
  postEmployee
}