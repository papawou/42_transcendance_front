import { Avatar, Badge, BadgeProps, IconButton, Stack, Typography, styled } from "@mui/material"
import { useAuth } from "./providers/AuthProvider"
import UserProfile from "./UserProfile"
import { useMemo, useState } from "react"
import { UserDTO, UserWithStatusDTO } from "@/services/openapi/requests"
import { useMe } from "./providers/MeProvider"
import { isDef } from "@/technical/isDef"

type Props = {
    user: UserDTO,
    hasDialog?: boolean,
    isButton?: boolean
}

const StyledBadge = styled(Badge)(({ badgecolor }: { badgecolor?: string }) => ({
    "& .MuiBadge-badge": {
        color: badgecolor || "",
        backgroundColor: badgecolor || ""
    }
}));

export const UserAvatar = ({ user, hasDialog = true, isButton = true }: Props) => {
    const auth = useAuth()
    const me = useMe()
    const [openProfileDialog, setOpenProfileDialog] = useState(false);


    const colorStatus = useMemo(() => {
        if (me.blocked.some(p => p.id === user.id))
            return "red"
        if (me.pending.some(p => p.id === user.id)) {
            return "info"
        }
        if (me.pendingOf.some(p => p.id === user.id)) {
            return "warning"
        }

        const friend = me.friends.find(p => p.id === user.id)
        if (!isDef(friend)) {
            return;
        }
        switch (friend.status) {
            case UserWithStatusDTO.status.SEARCH:
                return "blue";
            case UserWithStatusDTO.status.INGAME:
                return "yellow";
            case UserWithStatusDTO.status.ONLINE:
                return "green";
            case UserWithStatusDTO.status.OFFLINE:
                return "grey"
        }
    }, [me.blocked, me.friends, me.pending, me.pendingOf, user.id])

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <UserProfile
                open={hasDialog && openProfileDialog}
                onClose={() => setOpenProfileDialog(false)}
                userId={user.id}
            />
            <IconButton disabled={!isButton} onClick={() => setOpenProfileDialog(true)}>
                <StyledBadge
                    badgecolor={colorStatus}
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Avatar src={user.pic} />
                </StyledBadge>
            </IconButton>
            <Typography>
                {user.name}
            </Typography>
        </Stack>
    )
}