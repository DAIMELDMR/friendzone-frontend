import React from 'react'
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer } from './components';

import './App.css';


const apiKey = 'jg6c3g9d853n';

const client = StreamChat.getInstance(apiKey)

const App = () => {
  return (
    <div className="app_wrapper">
      <Chat client={client} theme = "team light">
        <ChannelListContainer
        />
        {/* <ChannelContainer
        /> */}
      </Chat>
    </div>
  )
}

export default App
