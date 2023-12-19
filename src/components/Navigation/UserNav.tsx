import { useCallback, useState } from "react"
import { useAuth } from "../providers/AuthProvider"
import { NavLink } from "react-router-dom"
import { isDef } from "@/technical/isDef"
import { UserJWT } from "@/technical/AccessTokenManager"
import UserProfile from "../UserProfile"
import "./style.css"

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
                    <h2 className="user-name">
                        {user.name}
                    </h2>
                </NavLink>
            </div>
            <div>
            <button onClick={() => logout()} className="cool-button"> LOGOUT </button>
                <button onClick={() => refetch()} className="cool-button"> DEBUG_ME </button>
            </div>
        </>
    )
}

export function UserNav() {
    const user = useAuth()
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //border: "none",
            padding: "10px",
            backgroundColor: "#4CAF50",
            border: "2px solid #4CAF50",
            borderRadius: "25px",
            transition: "all 0.3s ease-in-out",
            boxShadow: "10px 1px 10px rgba(0, 0, 0, 0.3)",
            //cursor: "pointer",
            marginLeft: "20px",
        }}>
            {
                !isDef(user.user) ?
                    <Login login={user.login} />
                    : <UserLogged user={user.user} logout={user.logout} />
            }
        </div>
    )
}