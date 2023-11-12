import axios from 'axios';
import React, { CSSProperties, useState } from 'react';
import { useAuth } from '../AuthProvider';
import axiosInstance from '@/technical/AxiosInstance';

type Props = {
    width: CSSProperties["width"]
    image: string;
    route: string;
    frId: number;
}

const AddFriendButton = (props: Props) => {

    const { userId, login, logout } = useAuth();

    const handleButton = () => {
        if (userId) {
            const userIdParam = userId;
            const friendId = props.frId;

            const url = `/users/${userIdParam}/${props.route}/${friendId}`;

            const axiosConfig = {
                method: 'post',
                url: url,
            }

            axiosInstance(axiosConfig)
                .then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log("can't add friend" + error);
                });
        }
    }

    return (
        <div>
            <button onClick={handleButton}><img src={props.image} style={{ width: props.width }} /></button>
        </div>
    );
};

export default AddFriendButton;
