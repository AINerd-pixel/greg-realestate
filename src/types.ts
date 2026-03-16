export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Lead {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  timeline: string;
  propertyNeeds: string;
  created_at?: string;
}
