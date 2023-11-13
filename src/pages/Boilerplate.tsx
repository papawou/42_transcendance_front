import Navigation from "@/components/Navigation/Navigation";
import { ProtectedChildren } from "@/components/ProtectedChildren";
import { SocialPanel } from "@/components/SocialPanel";

import { Outlet } from "react-router-dom";

export const Boilerplate = () => {
    return (
        <>
            <ProtectedChildren>
                <Navigation />
                <SocialPanel />
            </ProtectedChildren>
            <Outlet />
        </>
    )
}
