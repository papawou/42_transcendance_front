import { NavLink, NavLinkProps } from "react-router-dom"

import "./style.css"

type Props = {
	text: string,
	to: NavLinkProps["to"]
}

export const NavButton = ({ text, to }: Props) => {
	return (
		<NavLink
			style={{ textDecoration: "none" }}
			to={to}
		>
			<span className="navbutton-text">{text}</span>
		</NavLink>
	)
}
