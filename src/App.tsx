import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import Navigation from "./components/Navigation/Navigation";
import UserList from "./components/UserList/UserList";
import { ReactNode, useEffect, useState } from "react";
import axiosInstance from "./technical/AxiosInstance";
import { AuthProvider, useAuth } from "./components/AuthProvider";


const Boilerplate = () => {

	const [users, setUsers] = useState([]);
	const [friends, setFriends] = useState([]);
	const { userId, login, logout } = useAuth();

	useEffect(() => {
		axiosInstance.get('/users').then(response => { setUsers(response.data); })
			.catch(error => {
				console.error("Error fetching user data:", error);
			});
		axiosInstance.get(`/users/${userId}/friends`).then(response => { setFriends(response.data); })
			.catch(error => {
				console.error("Error fetching friends data:", error);
			});
	}, [userId]);


	return (
		<>
			<Navigation />
			<UserList users={users} />
			<br />
			<UserList users={friends} />
			<Outlet />
		</>
	)
}

export const AppServices = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	)
}

export function App() {
	return (
		<AppServices>
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
		</AppServices>
	)
}
