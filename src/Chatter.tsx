import * as React from 'react';
import { v4 as uuid } from 'uuid';
// import { fromEvent } from 'rxjs';
import { connect, send } from './services/messageService';
import { ChatEvent } from './types';
import { ChatList } from './ChatList';

export const Chatter: React.FC = () => {
  // const chatInput = React.useRef<HTMLTextAreaElement>(null);
  const [canSendMessage, setCanSendMessage] = React.useState(false);
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messageList, setMessageList] = React.useState<ChatEvent[]>([]);

  React.useEffect(() => {
    connect((msg: string, senderName: string) =>
            setMessageList(list => mergeNewMessage(list, msg, senderName, false)),
        (err: Event) => console.error('Error: ', err));
    /*const chatInputSource$ = fromEvent(chatInput.current!, 'change');
    chatInputSource$.subscribe((c: Event) => console.log(c));*/
  }, []);

  React.useEffect(() => {
    const enabled = (name !== undefined && name.trim().length > 0);
    setCanSendMessage(enabled);
  }, [name]);

  return (
      <div>
        <div>
        <input type="text"
               autoFocus
               onChange={e => setName(e.target.value)}
               placeholder="enter your name"
        />
        </div>
        <br/>
        <div>
        <textarea name="message"
                  rows={10}
                  cols={60}
                  onChange={e => setMessage(e.target.value)}
                  disabled={!canSendMessage}
                  value={message}
                  // ref={chatInput}
        />
        </div>
        <br/>
        <input type="button"
               value="SEND"
               disabled={!canSendMessage}
               onClick={() => {
                 send(message, name);
                 setMessageList(list => mergeNewMessage(list, message, name, true));
                 setMessage('');
               }} />
        <br/>

        <ChatList messageList={messageList} />

      </div>
  );
};


function mergeNewMessage(messages: ChatEvent[],
                         message: string,
                         name: string,
                         isOwn: boolean = false): ChatEvent[] {
  return [{ id: uuid(), message, sender: name, own: isOwn }, ...messages];
}

