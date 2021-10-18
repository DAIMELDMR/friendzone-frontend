import React from "react"
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, GroupChannelList, GroupChannelPreview } from ".";
import FrindZoneIcon from "../assets/friendzone.png"
import LogoutIcon from "../assets/logout.png"

const SideBar = () => {
    return(
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={FrindZoneIcon} alt="FrienZone" width= "30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner">
                    <img src={LogoutIcon} alt="Logout" width= "30" />
                </div>
            </div>
        </div>
    )
}

const FriendsHeader = () => {
    return(
        <div className="channel-list__header">
            <p className = "channel-list__header__text">Friend Zone</p>
        </div>
    )
}

const ChannelListContainer = () => {
    return (
        <>
            <SideBar />
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
            </div>
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
        </>
    )
}

export default ChannelListContainer;