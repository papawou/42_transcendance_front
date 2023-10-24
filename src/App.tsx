import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import Navigation from "./components/Navigation/Navigation";
import OAuth20 from "./components/OAuth20/OAuth20";

const isAuthenticated = false; // KR: this is a bool, true when logged in after OAuth20 successful
// check if user in cookie

const Boilerplate = () => {
	if (!isAuthenticated) {
		return (
			<>
				<OAuth20 /> 
			</> // KR: at the end of OAuth20, should set isAuthenticated to true
		)
	}
	else {
		return (
			<>
				<Navigation />
				<Outlet />
			</>
		)
	}		
}

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Boilerplate />}>
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
