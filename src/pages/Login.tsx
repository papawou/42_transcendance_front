import { NavButton } from '@/ui/molecules/NavButton';
import Paths from '@/technical/Paths';

// https://api.intra.42.fr/apidoc/guides/getting_started 
// https://api.intra.42.fr/apidoc/guides/web_application_flow
// https://github.com/pandark/passport-42
// https://www.youtube.com/watch?v=q8tZQxT4YPU

const API_FT_OAUTH2_URL = `${
	import.meta.env.VITE_API_FT_URL
	}/oauth/authorize?client_id=${
	import.meta.env.VITE_API_FT_CLIENT_ID
	}&redirect_uri=${encodeURIComponent(
	import.meta.env.VITE_API_FT_REDIRECT_URL
	)}&response_type=code`;


const Login = () => {
	return (
		<div className='oauth20'>
			<div>
				<h1>Welcome in Couz transcendence !</h1>
				<p>To login click the button below</p>

			</div>
			<NavButton text="42 LOGIN" to={API_FT_OAUTH2_URL} />
		</div>
	);
};

export default Login;