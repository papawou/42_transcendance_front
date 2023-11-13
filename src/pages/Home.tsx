import { UserNav } from "@/components/Navigation/UserNav";
import { useAuth } from "@/components/providers/AuthProvider";
import { isDef } from "@/technical/isDef";
import { useCallback } from "react";

const ButtonLogin = () => {
	const handleClick = useCallback(() => {
		//kenneth: redirect to API42 using import.meta.env.VITE_42_CLIENTID)
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
