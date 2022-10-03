import React,{useContext} from 'react'
import { imgSets } from '../img/imgIndex'
import Messages from './Messages'
import Input from "./Input"
import { ChatContext } from '../context/ChatContext'


const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>
          {data.user.displayName}
        </span>
        <div className="chatIcons">
          <img src={imgSets.cam} alt="camera icon" />
          <img src={imgSets.add} alt="add icon" />
          <img src={imgSets.more} alt="more icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat