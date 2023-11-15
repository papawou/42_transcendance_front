import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import { Providers } from "./components/providers";
import { ProtectedChildren } from "./components/ProtectedChildren";
import { Boilerplate } from "./pages/Boilerplate";
import Paths from "./technical/Paths";
import { AuthFtCallback } from "./pages/AuthFtCallback";


const ProtectedRoute = () => {
	return (
		<ProtectedChildren>
			<Outlet />
		</ProtectedChildren>
	)
}

export function App() {
	return (
		<BrowserRouter>
			<Providers>
				<Routes>
					<Route element={<Boilerplate />}>
						<Route index element={<Home />} />
						<Route element={<ProtectedRoute />}>
							<Route path={Paths.User} element={<User />} />
							<Route path={Paths.Pong} element={<Pong />} />
							<Route path={Paths.Settings} element={<Settings />} />
							<Route path={Paths.Leaderboard} element={<Leaderboard />} />
						</Route>
						<Route path={Paths.AuthFtCallback} element={<AuthFtCallback />} />
						<Route path="*" element={<div>notfound</div>} />
					</Route>
				</Routes>
			</Providers>
		</BrowserRouter >
	)
}
