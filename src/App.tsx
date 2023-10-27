/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   App.tsx                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaubarea <jaubarea@student.42lausanne.c    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/24 15:41:32 by jaubarea          #+#    #+#             */
/*   Updated: 2023/10/27 16:32:58 by jaubarea         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import Navigation from "./components/Navigation/Navigation";
import UserList from "./components/UserList/UserList";
import axios from "axios";
import { useEffect, useState } from "react";
import React, { Component } from 'react'
import axiosInstance from "./technical/AxiosInstance";


const Boilerplate = () => {
	
	const [users, setUsers] = useState([]);
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		axiosInstance.get('/user').then(response => {setUsers(response.data);})
			.catch(error => {console.error("Error fetching user data:", error);
			});
		axiosInstance.get('/friends').then(response => {setFriends(response.data);})
			.catch(error => {
				console.error("Error fetching friends data:", error);
			});
	}, []);

	return (
		<>
			<Navigation />
			<UserList users={users}/>
			<br />
			<UserList users={friends}/>
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
