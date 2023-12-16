import UserProfile from "@/components/UserProfile/UserProfile";
import { useUsersServiceUserControllerGetLeaderboard } from "@/services/openapi/queries";
import { isDef } from "@/technical/isDef";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Leaderboard = () => {
    const [userId, setUserId] = useState<number | undefined>(undefined)
    const { data, isLoading } = useUsersServiceUserControllerGetLeaderboard();

    return (
        <div>
            {isDef(userId) && <UserProfile open={true} userId={userId} onClose={() => setUserId(undefined)} />}
            <h1>Leaderboard</h1>
            <div>{(isLoading) ? "loading..." :
                <Table>
                    <TableBody>
                        {
                            data.sort((a, b) => a.rank - b.rank).map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell component="th" scope="row">
                                        {p.rank}
                                    </TableCell>
                                    <TableCell align="right">
                                        <NavLink to={""} onClick={(e) => {
                                            e.preventDefault()
                                            setUserId(p.id)
                                        }}>
                                            {p.name}
                                        </NavLink>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>}
            </div>
        </div>
    );
};
