import React, {useState} from 'react'
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets/CloseCreateChannel'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {

    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={ handleChange } placeholder="channel-name (no spaces)" />
            <p>Add members</p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('');

    const createChannel = async (event) => {
        event.preventDefault();
        try {
            //creating a new channel passing all the information
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            });
            //it will let us now of any changes in the channel(new messages, reactions, etc.)
            await newChannel.watch();
            //reset the channel name field
            setChannelName('');
            //toggling is creating state we finished the channel creation
            setIsCreating(false);
            //reseting the selectedUsers to an array containig only us
            setSelectedUsers([client.userID]);
            //we switch the new channel to be the active channel
            setActiveChannel(newChannel);
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating = {setIsCreating} />
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default CreateChannel
