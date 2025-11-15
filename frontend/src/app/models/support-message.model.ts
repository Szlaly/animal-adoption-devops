export interface SupportMessage {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email?: string;   
    role?: string;    
  };
  text: string;       
  sentAt: string;     
}
