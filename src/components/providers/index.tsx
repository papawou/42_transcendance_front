import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { QueryApiProvider } from "./QueryProvider";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryApiProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryApiProvider>
    )
}