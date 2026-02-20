export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  attachment: string;

  creatorInfo?: {
    name: string;
    email: string;
  }; // Optional field for assigned user's name

}

export interface Comment {
  _id: string;  // Ensure this is included
  ticketId: string;
  UserId: string;
  comment: [];
  createdBy: string;
  createdAt: string;
}