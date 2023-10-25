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
import Login from "./pages/Login";
// import TFALogin from "./pages/TFALogin";
// import CreateNicknameLogin from "./pages/CreateNicknameLogin";
import Home from "./pages/Home";
import User from "./pages/User";
import Pong from "./pages/Pong";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard"

import "./ui/main.css"
import Navigation from "./components/Navigation/Navigation";
import UserList from "./components/UserList/UserList";
// import OAuth20 from "./components/OAuth20/OAuth20";
// import axios from "axios";
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

// const isAuthenticated = false; // KR: this is a bool, true when logged in after OAuth20 successful
// // check if user in cookie

// const Boilerplate = () => {
// 	if (!isAuthenticated) {
// 		return (
// 			<>
// 				<OAuth20 /> 
// 			</> // KR: at the end of OAuth20, should set isAuthenticated to true
// 		)
// 	}
// 	else {
// 		return (
// 			<>
// 				<Navigation />
// 				<Outlet />
// 			</>
// 		)
// 	}		
}

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				{/* <Route path="/tfa" element={<TFALogin />} />
				<Route path="/nickname" element={<CreateNicknameLogin />} /> */}
				<Route path="/home" element={<Boilerplate />}>
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
