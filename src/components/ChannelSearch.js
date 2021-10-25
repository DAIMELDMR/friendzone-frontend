import React, {useState, useEffect} from 'react'
import { useChatContext } from 'stream-chat-react'

import { ResultsDropdown } from './'
import { SearchIcon } from '../assets/SearchIcon'

const ChannelSearch = ({setToggleContainer}) => {
    const { client, setActiveChannel } = useChatContext();
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //if there is no query we clear teamChannels and directChannels states
        if (!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    },[query])

    const getChannels = async (text) => {
        try {
            //we searching all channels type team who include the user
            const channelResponse = client.queryChannels({
                type: 'team',
                name: { $autocomplete: text },
                members: { $in: [client.userID] }
            })
            //we searching all users excluding the user id
            const userResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: {$autocomplete: text }
            })
            //we fetching both at the same time
            const [channels, { users }] = await Promise.all([channelResponse, userResponse]);
            //if we get a list of channels we add it to the teamChannels state
            if (channels.length)
                setTeamChannels(channels);
            //if we get a list of channels we add it to the directChannels state
            if (users.length)
                setDirectChannels(users)
        } catch (error) {
            setQuery('')
        }
    }

    const onSearch = (event) => {
        event.preventDefault();

        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel)
    }

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input
                    className="channel-search__input__text"
                    placeholder="Search"
                    type="text"
                    value={query}
                    onChange ={onSearch}
                />
            </div>
            {query && (
                <ResultsDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
                )}
        </div>
    )
}

export default ChannelSearch
