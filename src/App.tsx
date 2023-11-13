import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import Navigation from "./components/Navigation/Navigation";
import UserList from "./components/UserList/UserList";
import { useEffect, useState } from "react";
import axiosInstance from "./technical/AxiosInstance";

import { Providers } from "./components/providers";
import { useAuth } from "./components/providers/AuthProvider";
import PendingList from "./components/UserList/PendingList";
import { isDef } from "./technical/isDef";


const Boilerplate = () => {

	const [users, setUsers] = useState([]);
	const [friends, setFriends] = useState([]);
	const [pendings, setPendings] = useState([]);
	const { user, login, logout } = useAuth();

	useEffect(() => {
		axiosInstance.get('/users').then(response => { setUsers(response.data); })
			.catch(error => {
				console.error("Error fetching user data:", error);
			});
		axiosInstance.get(`/users/${user?.id}/friends`).then(response => { setFriends(response.data); })
			.catch(error => {
				console.error("Error fetching friends data:", error);
			});
		axiosInstance.get(`/users/${user?.id}/pending`).then(response => { setPendings(response.data); })
			.catch(error => {
				console.error("Error fetching friends data:", error);
			});
	}, [user?.id]);


	return (
		<>
			<Navigation />
			<UserList users={users} />
			<PendingList users={pendings} />
			<UserList users={friends} />
			<Outlet />
		</>
	)
}

export function App() {
	return (
		<BrowserRouter>
			<Providers>
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
			</Providers>
		</BrowserRouter>
	)
}
