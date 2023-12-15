import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import { Providers } from "./components/providers";
import { ProtectedChildren, useIsLogged } from "./components/ProtectedChildren";
import { Boilerplate } from "./pages/Boilerplate";
import Paths from "./technical/Paths";
import { useEffect } from "react";
import { AuthFtCallback } from "./pages/AuthFtCallback";
import { Chat } from "./components/chat/Chat";
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
						<Route index element={<Home />} />
<<<<<<< HEAD
                        <Route path={Paths.AuthFtCallback} element={<AuthFtCallback />} />
						{/* <Route element={<ProtectedRoute />}> */}
=======
						{/*<Route element={<ProtectedRoute />}>*/}
>>>>>>> origin/2fa2
							<Route path={Paths.User} element={<User />} />
							<Route path={Paths.Pong} element={<Pong />} />
							<Route path={Paths.Settings} element={<Settings />} />
							<Route path={Paths.Leaderboard} element={<Leaderboard />} />
							<Route path={Paths.Chat} element={<Chat />} />
						{/* </Route> */}
						<Route path="*" element={<div>notfound</div>} />
					{/*</Route>*/}
				</Routes>
			</Providers>
		</BrowserRouter >
	)
}
