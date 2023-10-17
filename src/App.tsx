import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import Navigation from "./components/Navigation/Navigation";

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
