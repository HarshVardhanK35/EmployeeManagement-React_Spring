import axios from "axios";

const API_URL = "http://localhost:8080/api/employees"

const fetchEmployees = () => {
  return axios.get(API_URL)
}

export default fetchEmployees;