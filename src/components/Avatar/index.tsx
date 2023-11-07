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

import { CSSProperties } from 'react';
import './style.css';

type Props = {
	src: string,
	width: CSSProperties["width"]
}

const Avatar = (props: Props) => {
	return (
		<img className="avatar" {...props} />
	);
};

export default Avatar;
