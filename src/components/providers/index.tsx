/* eslint-disable react/display-name */
import { PropsWithChildren, ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { BlockedUsersProvider } from "./BlockedUsersProvider";
import { QueryApiProvider } from "./QueryProvider";
import { UserGameProvider } from "./UserGameProvider";
import { SnackbarProvider } from "notistack";
import { MeProvider } from "./MeProvider";
import { LoginProtect } from "../ProtectedChildren";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryApiProvider>
            <SnackbarProvider>
                <AuthProvider>
                    <LoginProtect>
                        <MeProvider>
                            <BlockedUsersProvider>
                                <UserGameProvider>
                                    {children}
                                </UserGameProvider>
                            </BlockedUsersProvider>
                        </MeProvider>
                    </LoginProtect>
                </AuthProvider>
            </SnackbarProvider>
        </QueryApiProvider>
    )
}