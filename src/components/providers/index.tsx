/* eslint-disable react/display-name */
import { PropsWithChildren, ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { BlockedUsersProvider } from "./BlockedUsersProvider";
import { QueryApiProvider } from "./QueryProvider";
import { UserGameProvider } from "./UserGameProvider";
import { SnackbarProvider } from "notistack";
import { MeProvider } from "./MeProvider";
import { useIsLogged } from "../../hooks/useIsLogged";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../Unlogged/LoginPage";
import { TfaAccess } from "../Unlogged/TfaAccess";
import { AuthFtCallback } from "../Unlogged/AuthFtCallback";
import Paths from "@/technical/Paths";

export const LoginProtect = ({ children }: PropsWithChildren) => {
    const isLogged = useIsLogged()

    if (isLogged) {
        return <>{children}</>
    }
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "50px" }}>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path={Paths.Tfa()} element={<TfaAccess />} />
                <Route path={Paths.AuthFtCallback} element={<AuthFtCallback />} />
            </Routes>
        </div>
    )
}

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