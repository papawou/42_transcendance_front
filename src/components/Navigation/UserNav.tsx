import { useCallback, useState } from "react"
import { useAuth } from "../providers/AuthProvider"
import { NavLink } from "react-router-dom"
import { isDef } from "@/technical/isDef"
import { UserJWT } from "@/technical/AccessTokenManager"
import UserProfile from "../UserProfile"

const Login = ({ login }: { login: (userId: string) => void }) => {
    const [name, setName] = useState<string>("")

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ?? "";
        setName(value.trim())
    }, [])

    const handleClick = useCallback(() => {
        if (name.length === 0) {
            return;
        }
        login(name);
    }, [login, name])

    return (
        <>
            <input onChange={handleChange} name="name" />
            <button onClick={handleClick}>Connect</button>
        </>
    )
}

const UserLogged = ({ logout, user }: { logout: () => void, user: UserJWT }) => {
    const [profileOpen, setProfileOpen] = useState(false)
    return (
        <>
            <UserProfile userId={user.id} open={profileOpen} onClose={() => setProfileOpen(false)} />
            <div>
                <NavLink to={""} onClick={(e) => {
                    e.preventDefault()
                    setProfileOpen(true)
                }}>
                    <h2>
                        {user.name}
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid black" }}>
            {
                !isDef(user.user) ?
                    <Login login={user.login} />
                    : <UserLogged user={user.user} logout={user.logout} />
            }
        </div>
    )
}