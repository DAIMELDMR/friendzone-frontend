import React from "react"
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from ".";
import FrindZoneIcon from "../assets/friendzone.png"
import LogoutIcon from "../assets/logout.png"

const cookies = new Cookies();

const SideBar = ({ logout }) => {
    return(
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={FrindZoneIcon} alt="FrienZone" width= "30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner">
                    <img src={LogoutIcon} alt="Logout" width="30" onClick={ logout }/>
                </div>
            </div>
        </div>
    )
}

const FriendsHeader = () => {
    return(
        <div className="channel-list__header">
            <p className = "channel-list__header__text">FriendZone</p>
        </div>
    )
}

const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {

    const logout = () => {
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <FriendsHeader />
                <ChannelSearch />
                <ChannelList
                    filter={{}}
                    channelRenderFilterFn={()=>{} }
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => {
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                        />
                    }}
                />
                <ChannelList
                    filter={{}}
                    channelRenderFilterFn={()=>{} }
                    List={(listProps) => (
                        <TeamChannelList
                        {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => {
                        <TeamChannelPreview
                        {...previewProps}
                        type="messaging"
                        />
                    }}
                />
            </div>
        </>
    )
}

export default ChannelListContainer;