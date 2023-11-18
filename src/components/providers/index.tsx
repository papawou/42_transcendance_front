import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { QueryApiProvider } from "./QueryProvider";
import { UserGameProvider } from "./UserGameProvider";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryApiProvider>
            <AuthProvider>
                <UserGameProvider>
                    {children}
                </UserGameProvider>
            </AuthProvider>
        </QueryApiProvider>
    )
}