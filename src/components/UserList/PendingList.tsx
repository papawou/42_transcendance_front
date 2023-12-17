/* eslint-disable react/no-unescaped-entities */
import Avatar from '../Avatar';
import { useMe } from "../providers/MeProvider";

import "./style.css"

const PendingList = () => {
    const me = useMe()
    return (
        <div style={{ paddingLeft: '10px' }}>
            <div className='pending'>
                <div>
                    <h4>Demandes d'amis reçues</h4>
                    {
                        me.pendingOf?.map(user => (
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }} key={user.id}>
                                <Avatar src={user.pic} width={20} />
                                {user.name}
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h4>Demandes d'amis envoyées</h4>
                    {
                        me.pending?.map(user => (
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }} key={user.id}>
                                <Avatar src={user.pic} width={20} />
                                {user.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PendingList;