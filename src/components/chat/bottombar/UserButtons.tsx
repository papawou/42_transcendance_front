import { KickUserDialog } from './KickUserDialog'
import { PMUserDialog } from './PMUserDialog'
import { AdminUserDialog } from './AdminUserDialog'
import { BanMuteUserDialog } from './BanMuteUserDialog'
import { UserDto, RoomDto } from '../chat.api'
import { useState } from 'react'
import UserProfile from '@/components/UserProfile/UserProfile';
import axiosInstance from '@/services/AxiosInstance'

enum Sentence {
    none = -1,
    ban = 0,
    mute = 1
}

interface UserButtonsProps {
    currentUser: UserDto | null
    room: RoomDto | null
}

export const UserButtons = ({
    currentUser,
    room
} : UserButtonsProps) => {
    
    const [openKick, setOpenKick] = useState<boolean>(false);
    const [openPM, setOpenPM] = useState<boolean>(false);
    const [openAdmin, setOpenAdmin] = useState<boolean>(false);
    const [openBanMute, setOpenBanMute] = useState<boolean>(false);
    const [openProfile, setOpenProfile] = useState<boolean>(false);
    const [sentence, setSentence] = useState<Sentence>(Sentence.none);

    const handleOpenProfile = () => {
        setOpenProfile(true);
    }
    const handleCloseProfile = () => {
        setOpenProfile(false);
    }

    const handleBan = () => {
        setSentence(Sentence.ban);
        setOpenBanMute(true);
    };

    const handleMute = () => {
        setSentence(Sentence.mute);
        setOpenBanMute(true);
    };

    if (!currentUser || !room ) {
        return null;
    }

    return (
        <div>
            <div>
                <button onClick={handleBan}>Ban</button>
                <button onClick={handleMute}>Mute</button>
                <button onClick={() => {setOpenKick(true)}}>Kick</button>
                <button onClick={() => {setOpenAdmin(true)}}>Admin</button>
                <button onClick={() => {
                    axiosInstance.post("games/duel/invite", {
                        targetId: currentUser.id
                    })
                }}>Duel</button>
                <button onClick={handleOpenProfile}>Profile</button>
                <button onClick={() => {setOpenPM(true)}}>PM</button>
            </div>
            <KickUserDialog
                open={openKick}
                setOpen={setOpenKick}
                user={currentUser}
                roomName={room.roomName}
            />
            <PMUserDialog
                open={openPM}
                setOpen={setOpenPM}
                userId={currentUser.id}
                userName={currentUser.name}
            />
            <AdminUserDialog
                open={openAdmin}
                setOpen={setOpenAdmin}
                user={currentUser}
                room={room}
            />
            <BanMuteUserDialog
                open={openBanMute}
                setOpen={setOpenBanMute}
                user={currentUser}
                roomName={room.roomName}
                sentence={sentence}
                setSentence={setSentence}
            />
            <UserProfile
                open={openProfile}
                onClose={handleCloseProfile}
                userId={currentUser.id}
                userName={currentUser.name}
            />
        </div>
    )
}
