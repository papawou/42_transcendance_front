import { ReactNode } from "react";
import { useAuth } from "./providers/AuthProvider";
import { isDef } from "@/technical/isDef";

export const ProtectedChildren = ({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) => {
	const auth = useAuth();

	if (!isDef(auth.user)) {
		return <div>{fallback}</div>
	}

	return <>{children}</>
}
