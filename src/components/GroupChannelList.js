import React from 'react'

import{AddChannel} from '../assets/AddChannel'

const GroupChannelList = ({ children, error = false, loading, type }) => {
    if (error) {
        return type === 'group' ? (
            <div className="group-channel-list">
                <p className="group-channel-list__message">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ): null
    }
    if (loading) {
        return (
            <div className="group-channel-list">
                <p className="group-channel-list__message loading">
                    {type === 'group' ? 'Channels' : 'Messages'} loading...
                </p>
            </div>
        )
    }
    return (
        <div className="group-channel-list">
            <div className="group-channel-list__header">
                <p className="group-channel-list__header__title">
                    {type === 'group' ? 'Channels' : 'Direct Messages'}
                </p>
                {/* Button - add channel */}
            </div>
            {children}
        </div>
    )
}

export default GroupChannelList
