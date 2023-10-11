import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";

export function App() {
    return (
       <BrowserRouter>
			<Routes>
				<Route path='*' element={<Home />} />
				<Route path="home" element={<Home />} />
				<Route path="user" element={<User />} />
				<Route path="pong" element={<Pong />} />
				<Route path="settings" element={<Settings />} />
			</Routes>
       </BrowserRouter>
    )
}
