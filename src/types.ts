export interface ChatEvent {
  id: string;
  message: string;
  sender: string;
  own: boolean;
}
