import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { Leaderboard } from "./pages/Leaderboard";

import { Providers } from "./components/providers";
import { Boilerplate } from "./pages/Boilerplate";
import Paths from "./technical/Paths";
import { Pong } from "./pages/Pong";

import "./ui/main.css"

export function App() {
	return (
		<BrowserRouter>
			<Providers>
				<Routes>
					<Route element={<Boilerplate />}>
						<Route index element={<Home />} />
						<Route path={Paths.Pong} element={<Pong />} />
						<Route path={Paths.Settings} element={<Settings />} />
						<Route path={Paths.Leaderboard} element={<Leaderboard />} />
					</Route>
					<Route path="*" element={<div>notfound</div>} />
				</Routes>
			</Providers>
		</BrowserRouter>
	)
}
