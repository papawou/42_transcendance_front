/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Navigation.tsx                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaubarea <jaubarea@student.42lausanne.c    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/15 17:26:19 by jaubarea          #+#    #+#             */
/*   Updated: 2023/10/15 18:57:23 by jaubarea         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './style.css';
import SettingsIcon from './Settings_Icon/Settings_Icon';

const Navigation = () => {
	return (
		<div>
			<ul className='navigation'>
				<NavLink to="/user">
					<li className='avatar'><Avatar/></li>
				</NavLink>
				<NavLink to="/pong">
					<li className='text'>PLAY</li>
				</NavLink>
				<NavLink to="/leaderboard">
					<li className='text'>LEADERBOARD</li>
				</NavLink>
				<NavLink to="/settings">
					<li className='settings'><SettingsIcon /></li>
				</NavLink>
			</ul>
		</div>
	);
};

export default Navigation;
