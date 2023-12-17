
import { PropsWithChildren } from "react";
import { useAuth } from "./providers/AuthProvider";
import { isDef } from "@/technical/isDef";
import { AuthFtCallback } from "./Unlogged/AuthFtCallback";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Unlogged/LoginPage";

export const useIsLogged = () => {
	const auth = useAuth()

	return isDef(auth.user)
}

export const LoginProtect = ({ children }: PropsWithChildren) => {
	const isLogged = useIsLogged()

	if (isLogged) {
		return  <>{children}</>
	}
	return <Routes>
		<Route path="/" element={<LoginPage />} />
		<Route path="/auth/ft/callback" element={<AuthFtCallback />} />
	</Routes>
}