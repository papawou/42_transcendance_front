import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import TFALogin from "./pages/TFALogin";
// import CreateNicknameLogin from "./pages/CreateNicknameLogin";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import Navigation from "./components/Navigation/Navigation";

const isAuthenticated = false; // KR: this is a bool, true when logged in after OAuth20 successful
// check if user in cookie

const Boilerplate = () => {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	)
}

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				{/* <Route path="/tfa" element={<TFALogin />} />
				<Route path="/nickname" element={<CreateNicknameLogin />} /> */}
				<Route path="/home" element={<Boilerplate />}>
					<Route index element={<Home />} />
					<Route path="user" element={<User />} />
					<Route path="pong" element={<Pong />} />
					<Route path="settings" element={<Settings />} />
					<Route path="leaderboard" element={<Leaderboard />} />
					<Route path="*" element={<div>notfound</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
