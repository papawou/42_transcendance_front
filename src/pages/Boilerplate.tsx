import Navigation from "@/components/Navigation/Navigation";
import { SocialPanel } from "@/components/SocialPanel";
import { Chat } from "@/components/chat/Chat";
import { Outlet } from "react-router-dom";


export const Boilerplate = () => {
    return (
        <div>
            <Navigation />
            <div style={{ display: "flex" }}>
                <div style={{ flex: "0 1 auto", border: "1px solid blue" }}>
                    <SocialPanel />
                </div>
                <div style={{ flex: "1 1 auto", border: "1px solid green" }}>
                    <Outlet />
                </div>
                <div style={{ flex: "0 1 auto", border: "1px solid red" }}>
                    <Chat />
                </div>
            </div>
        </div>
    )
}
