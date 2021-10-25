import React, { useState } from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

//importing components
import { ChannelContainer, ChannelListContainer, Auth } from './components';

//importing css
import './App.css';

//prebuild components from stream chat
import 'stream-chat-react/dist/css/index.css'

//creating an instance of cookies
const cookies = new Cookies();

const apiKey = 'jg6c3g9d853n';

//getting the token from the cookies
const authToken = cookies.get('token');

//Created a instance of stream-chat
const client = StreamChat.getInstance(apiKey)

//connect User and retrieve all his messages
if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}


const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    //if we dont have a token from a user reder the auth component
    if(!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
}

export default App;

