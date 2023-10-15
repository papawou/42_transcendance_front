/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Settings_Icon.tsx                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaubarea <jaubarea@student.42lausanne.c    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/15 18:17:30 by jaubarea          #+#    #+#             */
/*   Updated: 2023/10/15 18:28:17 by jaubarea         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import './style.css';

const SettingsIcon = () => {
	return (
		<div className='settingsIcon'>
			<img src='logo_settings.png' alt='settings' width={100}/>
		</div>
	);
};

export default SettingsIcon;
