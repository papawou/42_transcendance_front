import { useAuth } from "@/components/providers/AuthProvider";

export const Home = () => {
	const auth = useAuth()

	return (
		<div>
			<h1>HOME</h1>
			<p>Welcome {auth.user?.name} 🤩</p>
		</div>
	);
};
export default Home;
