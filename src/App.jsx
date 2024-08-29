import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
// import Home from "./pages/home";
import NoPage from "./pages/nopage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navbar />}>
						{/* <Route index element={<Home />} /> */}
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
