/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Avatar.tsx                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaubarea <jaubarea@student.42lausanne.c    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/15 16:43:54 by jaubarea          #+#    #+#             */
/*   Updated: 2023/10/15 19:08:31 by jaubarea         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import React from 'react';
import './style.css';

const Avatar = () => {
	return (
		<div className='avatar'>
			<img src='jaubarea.png' alt='Avatar' width={100}/>
		</div>
	);
};

export default Avatar;
