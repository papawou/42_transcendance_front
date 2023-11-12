import { NavLink } from 'react-router-dom';

import './style.css';
import { NavButton } from '@/components/Navigation/NavButton';
import Paths from '@/technical/Paths';
import Avatar from '@/components/Avatar';
import { UserNav } from './UserNav';

const Navigation = () => {
	return (
		<div className='navigation'>
			<UserNav />
			<NavButton text="PLAY" to={Paths.Pong} />
			<NavButton text="LEADERBOARD" to={Paths.Leaderboard} />
			<NavLink to={Paths.Settings}>
				<Avatar src="logo_settings.png" width={100} />
			</NavLink>
		</div>
	);
};

export default Navigation;
