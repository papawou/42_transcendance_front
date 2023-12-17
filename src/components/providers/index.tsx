/* eslint-disable react/display-name */
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { BlockedUsersProvider } from "./BlockedUsersProvider";
import { QueryApiProvider } from "./QueryProvider";
import { UserGameProvider } from "./UserGameProvider";
import { SnackbarProvider } from "notistack";
import { MeProvider } from "./MeProvider";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryApiProvider>
            <SnackbarProvider>
                <AuthProvider>
                    <MeProvider>
                        <BlockedUsersProvider>
                            <UserGameProvider>
                                {children}
                            </UserGameProvider>
                        </BlockedUsersProvider>
                    </MeProvider>
                </AuthProvider>
            </SnackbarProvider>
        </QueryApiProvider>
    )
}