import { CSSProperties } from 'react';
import { useAuth } from '../providers/AuthProvider';
import axiosInstance from '@/services/AxiosInstance';

type Props = {
    width: CSSProperties["width"]
    image: string;
    route: string;
    frId: number;
}

const AddFriendButton = (props: Props) => {

    const { user } = useAuth();

    const handleButton = () => {
        if (user?.id) {
            const userIdParam = user.id;
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
