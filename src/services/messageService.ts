import { v4 as uuid } from 'uuid';

const wsUrl = 'ws://localhost:8080';
let ws: WebSocket;
let sessionId: string;

export function send(message: string, name: string): void {
  if (!sessionId) {
    sessionId = uuid();
  }

  const msg = JSON.stringify({ id: sessionId, message, name });
  ws.send(msg);
}

export function connect(onMessage: (msg: string, senderName: string) => void,
                        onError: (msg: Event) => void) {
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    send('', ''); // init message registers session on server
  };

  ws.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    onMessage(data.message, data.name);
  };
  ws.onerror = err => onError(err);
}


