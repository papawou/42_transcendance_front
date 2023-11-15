import { UserNav } from "@/components/Navigation/UserNav";
import { useAuth } from "@/components/providers/AuthProvider";
import { isDef } from "@/technical/isDef";
import { useCallback } from "react";

const API_FT_OAUTH2_URL = `${
	import.meta.env.VITE_API_FT_URL
	}/oauth/authorize?client_id=${
	import.meta.env.VITE_API_FT_CLIENT_ID
	}&redirect_uri=${encodeURIComponent(
	import.meta.env.VITE_API_FT_CALLBACK_URL
	)}&response_type=code`;

const ButtonLogin = () => {
	const handleClick = useCallback(() => {
		//kenneth: redirect to API42 using import.meta.env.VITE_42_CLIENTID)
        window.location.href = API_FT_OAUTH2_URL;
	}, [])

	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "50px" }}>
			<UserNav />
			<button onClick={() => handleClick()}>
				LOGIN API 42
			</button>
		</div>
	)
}

const Home = () => {
	const auth = useAuth()

	if (!isDef(auth.user)) {
		return <ButtonLogin />
	}

	return (
		<div>
			<h1>HOME</h1>
		</div>
	);
};

export default Home;
