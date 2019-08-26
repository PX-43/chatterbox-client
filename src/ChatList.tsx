import * as React from 'react';
import { ChatItem } from './ChatItem';
import { ChatEvent } from './types';

interface ChatListProps {
  messageList: ChatEvent[];
}

export const ChatList: React.FC<ChatListProps> = ({ messageList }) => {
  const items = messageList.map(item =>
       <ChatItem key={item.id} name={item.own ? 'me' : item.sender} message={item.message}/>);

  return <div>{items}</div>;
};

