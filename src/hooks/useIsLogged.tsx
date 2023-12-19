import { useAuth } from "../components/providers/AuthProvider";
import { isDef } from "@/technical/isDef";
export const useIsLogged = () => {
	const auth = useAuth()

	return isDef(auth.user)
}