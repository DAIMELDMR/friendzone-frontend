import React, { useState } from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

import './App.css';

//creating an instance of cookies
const cookies = new Cookies();

const apiKey = 'jg6c3g9d853n';

//getting the token from the cookies
const authToken = cookies.get('token');


const client = StreamChat.getInstance(apiKey)

if (authToken) {
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
  const [createType, setCreateType] = useState();
  const [isCreating, setIsCreating] = useState();
  const [isEditing, setIsEditing] = useState();

  if (!authToken)
    return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme = "team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType = {setCreateType}
          setIsEditing = {setIsEditing}
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
  )
}

export default App
