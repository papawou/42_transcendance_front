import { useCallback, useState } from "react"
import { useAuth } from "../AuthProvider"
import { NavLink } from "react-router-dom"
import Paths from "@/technical/Paths"
import { isDef } from "@/technical/isDef"

const Login = ({ login }: { login: (userId: string) => void }) => {
    const [username, setUsername] = useState<string>("")

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ?? "";
        setUsername(value.trim())
    }, [])

    const handleClick = useCallback(() => {
        if (username.length === 0) {
            return;
        }
        login(username);
    }, [login, username])

    return (
        <>
            <input onChange={handleChange} name="username" />
            <button onClick={handleClick}>Connect</button>
        </>
    )
}

const UserLogged = ({ logout, userId }: { logout: () => void, userId: string }) => {
    return (
        <>
            <div>
                <NavLink to={Paths.User}>
                    <h2>
                        {userId}
                    </h2>
                </NavLink>
            </div>
            <div>
                <button onClick={() => logout()}>LOGOUT</button>
            </div>
        </>
    )
}

export function UserNav() {
    const user = useAuth()

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {
                !isDef(user.userId) ?
                    <Login login={user.login} />
                    : <UserLogged userId={user.userId} logout={user.logout} />
            }
        </div>
    )
}