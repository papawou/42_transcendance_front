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

import { NavLink } from 'react-router-dom';

import './style.css';
import { NavButton } from '@/ui/molecules/NavButton';
import Paths from '@/technical/Paths';
import Avatar from '@/ui/atoms/Avatar';

const Navigation = () => {
	return (
		<div className='navigation'>
			<NavLink to={Paths.User}>
				<Avatar src='jaubarea.png' width={150} />
			</NavLink>
			<NavButton text="PLAY" to={Paths.Pong} />
			<NavButton text="LEADERBOARD" to={Paths.Leaderboard} />
			<NavLink to={Paths.Settings}>
				<Avatar src="logo_settings.png" width={100} />
			</NavLink>
		</div>
	);
};

export default Navigation;
