import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='*' element={<Home />} />
				<Route path="home" element={<Home />} />
				<Route path="user" element={<User />} />
				<Route path="pong" element={<Pong />} />
				<Route path="settings" element={<Settings />} />
				<Route path="leaderboard" element={<Leaderboard />} />
			</Routes>
		</BrowserRouter>
	)
}
