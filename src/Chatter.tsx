import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { connect, send } from './services/messageService';
import { ChatEvent } from './types';
import { ChatList } from './ChatList';

export const Chatter: React.FC = () => {
  const [canSendMessage, setCanSendMessage] = React.useState(false);
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState<ChatEvent[]>([]);

  React.useEffect(() => {
    connect(
      (msg: string, senderName: string) =>
        setMessageList(list => mergeNewMessage(list, msg, senderName, false)),
      (err: Event) => console.error('Error: ', err),
    );
  }, []);

  React.useEffect(() => {
    const enabled =
      message !== undefined &&
      message.trim().length > 0 &&
      name !== undefined &&
      name.trim().length > 0;

    setCanSendMessage(enabled);
  }, [name, message]);

  return (
    <div>
      <ChatList messageList={messageList} />
      <br />
      <div>
        <input
          type="text"
          autoFocus
          onChange={e => setName(e.target.value)}
          placeholder="enter your name"
        />
      </div>
      <br />
      <div>
        <textarea
          name="message"
          rows={10}
          cols={60}
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <br />
      <input
        type="button"
        value="SEND"
        disabled={!canSendMessage}
        onClick={() => {
          send(message, name);
          setMessageList(list => mergeNewMessage(list, message, name, true));
          setMessage('');
        }}
      />
    </div>
  );
};

function mergeNewMessage(
  messages: ChatEvent[],
  message: string,
  name: string,
  isOwn: boolean = false,
): ChatEvent[] {
  return [...messages, { id: uuid(), message, sender: name, own: isOwn }];
}
