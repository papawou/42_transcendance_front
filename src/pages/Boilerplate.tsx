import Navigation from "@/components/Navigation/Navigation";
import { SocialPanel } from "@/components/SocialPanel";
import { Chat } from "@/components/chat/Chat";
import { Outlet } from "react-router-dom";


export const Boilerplate = () => {
    return (
        <div>
            <Navigation />
            <div style={{ display: "flex" }}>
                <div style={{ flex: "0 1 auto", boxShadow: "0 0 20px rgba(0, 0, 255, 0.5)", borderRadius: "10px", backgroundColor: "rgba(0, 0, 255, 0.1)" }}>
                    <SocialPanel />
                </div>
                <div style={{ flex: "1 1 auto", boxShadow: "0 0 20px rgba(0, 128, 0, 0.5)", borderRadius: "10px", margin: "0 10px", backgroundColor: "rgba(0, 128, 0, 0.1)" }}>
                    <Outlet />
                </div>
                <div style={{ flex: "0 1 auto", boxShadow: "0 0 20px rgba(0, 39, 76, 0.5)", borderRadius: "10px", backgroundColor: "rgba(0, 39, 76, 0.1)" }}>
                    <Chat />
                </div>
            </div>
        </div>
    )
}