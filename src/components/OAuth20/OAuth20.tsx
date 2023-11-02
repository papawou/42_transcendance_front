import { NavButton } from '@/components/NavButton';
import Paths from '@/technical/Paths';

// https://api.intra.42.fr/apidoc/guides/getting_started 
// https://api.intra.42.fr/apidoc/guides/web_application_flow
// https://github.com/pandark/passport-42
// https://www.youtube.com/watch?v=q8tZQxT4YPU

const OAuth20 = () => {
	return (
		<div className='oauth20'>
			<div>
				<h1>Welcome in Couz transcendence !</h1>
				<p>To login click the button below</p>
			</div>
			<NavButton text="42 LOGIN" to={Paths.Login} />
		</div>
	);
};

export default OAuth20;