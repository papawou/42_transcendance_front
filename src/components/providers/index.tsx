/* eslint-disable react/display-name */
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { BlockedUsersProvider } from "./BlockedUsersProvider";
import { QueryApiProvider } from "./QueryProvider";
import { UserGameProvider } from "./UserGameProvider";
import { SnackbarProvider } from "notistack";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryApiProvider>
            <SnackbarProvider>
                <AuthProvider>
                    <BlockedUsersProvider>
                        <UserGameProvider>
                            {children}
                        </UserGameProvider>
                    </BlockedUsersProvider>
                </AuthProvider>
            </SnackbarProvider>
        </QueryApiProvider>
    )
}