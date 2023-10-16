const Paths = {
	User: (idUser: string | undefined) => "/user" + idUser ? `/${idUser}` : "",
	Pong: "/pong",
	Leaderboard: "/leaderboard",
	Settings: "/settings"
}

export default Paths