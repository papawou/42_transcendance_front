import { ReactNode } from "react";
import { useAuth } from "./providers/AuthProvider";
import { isDef } from "@/technical/isDef";

export const useIsLogged = () => {
	const auth = useAuth()

	return isDef(auth.user)
}

export const ProtectedChildren = ({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) => {
	const isLogged = useIsLogged()

	if (!isLogged) {
		return <>{fallback}</>
	}
	return <>{children}</>
}
