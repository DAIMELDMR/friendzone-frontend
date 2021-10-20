import React from "react"
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, GroupChannelList, GroupChannelPreview } from ".";
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

const ChannelListContainer = () => {

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
                        <GroupChannelList
                            {...listProps}
                            type="group"
                        />
                    )}
                    Preview={(previewProps) => {
                        <GroupChannelPreview
                            {...previewProps}
                            type="group"
                        />
                    }}
                />
            <ChannelList
                filter={{}}
                channelRenderFilterFn={()=>{} }
                List={(listProps) => (
                    <GroupChannelList
                    {...listProps}
                    type="messaging"
                    />
                    )}
                    Preview={(previewProps) => {
                        <GroupChannelPreview
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