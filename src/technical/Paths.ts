import { isDef } from "./isDef"

const Paths = {
	Home: "/",
	User: "/user",
	Pong: "/pong",
	Leaderboard: "/leaderboard",
	Settings: "/settings",
	AuthFtCallback: "/auth/ft/callback",
	Tfa: (userId?: number) => `/auth/tfa${isDef(userId) ? `?userId=${userId}` : ""}`,
	Chat: "/chat"
}

export default Paths