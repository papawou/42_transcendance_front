/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   AxiosInstance.tsx                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaubarea <jaubarea@student.42lausanne.c    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/27 16:22:01 by jb                #+#    #+#             */
/*   Updated: 2023/10/27 16:34:09 by jaubarea         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})

export default axiosInstance;