import { CSSProperties } from 'react';

type Props = {
    width: CSSProperties["width"]
    image: string;
    onClick?: () => void
}

const AddFriendButton = (props: Props) => {
    return (
        <div>
            <button onClick={props.onClick}><img src={props.image} style={{ width: props.width }} /></button>
        </div>
    );
};

export default AddFriendButton;
