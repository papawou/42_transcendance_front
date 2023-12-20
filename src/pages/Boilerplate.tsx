import Navigation from "@/components/Navigation";
import { SocialPanel } from "@/components/SocialPanel";
import { Chat } from "@/components/chat/Chat";
import { Outlet } from "react-router-dom";


export const Boilerplate = () => {
    return (
        <div>
            <Navigation />
            <div style={{ display: "flex" }}>
                <div style={{ flex: "0 1 auto" }}>
                    <SocialPanel />
                </div>
                <div style={{ flex: "1 1 auto" }}>
                    <Outlet />
                </div>
                <div style={{
                    flex: "0 1 auto",
                    borderStyle: "groove",
                    borderColor: "green",
                    overflowY: "scroll",
                    backgroundColor: "rgb(124, 187, 18)"
                }}>
                    <Chat />
                </div>
            </div>
        </div >
    )
}
