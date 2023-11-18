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
