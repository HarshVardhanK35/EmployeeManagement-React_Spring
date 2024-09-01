import ListEmployeeComponent from "./components/ListEmployeeComponent";
import AddEmployeeComponent from "./components/AddEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDetail from "./components/EmployeeDetail";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
          <Route path="/" element={<ListEmployeeComponent/>}></Route>
          <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
          <Route path="/add-employee" element={<AddEmployeeComponent/>}></Route>
          <Route path="/edit-employee/:id" element={<AddEmployeeComponent/>}></Route>
          <Route path="/employee-details/:id" element={<EmployeeDetail/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
