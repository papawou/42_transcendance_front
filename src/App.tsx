import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import { Providers } from "./components/providers";
import { ProtectedChildren, useIsLogged } from "./components/ProtectedChildren";
import { Boilerplate } from "./pages/Boilerplate";
import Paths from "./technical/Paths";
import { useEffect } from "react";
import { AuthFtCallback } from "./pages/AuthFtCallback";
import { Pong } from "./pages/Pong";

import "./ui/main.css"

const ProtectedRoute = () => {
	const navigate = useNavigate()
	const isLogged = useIsLogged()

	useEffect(() => {
		if (!isLogged) {
			navigate(Paths.Home)
		}
	}, [isLogged, navigate])

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
						<Route index element={<Home data={undefined} />} />
						<Route element={<ProtectedRoute />}>
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
