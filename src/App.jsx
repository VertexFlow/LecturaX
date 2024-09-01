import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Home from "./pages/home";
import NoPage from "./pages/nopage";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";

function App() {
	const studentProfileData = {
		name: "John Doe",
		email: "john.doe@example.com",
		class: "10th Grade",
	};

	const teacherProfileData = {
		name: "Jane Smith",
		email: "jane.smith@example.com",
	};
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navbar />}>
						<Route index element={<Home />} />
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
					</Route>
					<Route path="/dashboard" element={<Layout />}>
						<Route index element={<Dashboard />} />
						<Route
							path="profile"
							element={
								<Profile userType="student" profileData={studentProfileData} />
							}
						/>
					</Route>
					<Route path="*" element={<NoPage />} />
				</Routes>
			</BrowserRouter>

			{/* <Profile userType="student" profileData={studentProfileData} />
			<Profile userType="teacher" profileData={teacherProfileData} /> */}
		</>
	);
}

export default App;
