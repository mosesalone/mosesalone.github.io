import { User } from '../contexts/AuthContext';

export type TicketStatus = 'open' | 'in-progress' | 'completed' | 'cancelled';
export type PaymentMethod = 'Bitcoin' | 'Ethereum' | 'USDT' | 'PayPal' | 'CashApp' | 'Bank Transfer' | 'Gift Card' | 'Other';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isSystem?: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  clientId: string;
  counterpartyId: string;
  middlemanId: string | null;
  status: TicketStatus;
  amount: number;
  paymentMethod: PaymentMethod;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock data generator for tickets
export const generateMockTickets = (currentUser: User): Ticket[] => {
  if (!currentUser) return [];
  
  // Generate some mock tickets for the current user
  const mockTickets: Ticket[] = [];
  
  // Admin sees all tickets, regular users see only their tickets
  if (currentUser.isAdmin) {
    // Generate admin view tickets (3-7 random tickets)
    const ticketCount = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < ticketCount; i++) {
      const status: TicketStatus = ['open', 'in-progress', 'completed', 'cancelled'][Math.floor(Math.random() * 4)] as TicketStatus;
      const paymentMethod: PaymentMethod = ['Bitcoin', 'Ethereum', 'PayPal', 'CashApp', 'Gift Card'][Math.floor(Math.random() * 5)] as PaymentMethod;
      
      const ticket: Ticket = {
        id: `T${Math.floor(1000 + Math.random() * 9000)}`,
        title: `Transaction #${i + 1}`,
        description: `Mock transaction for demonstration purposes.`,
        clientId: Math.random() > 0.5 ? currentUser.id : `user${i}`,
        counterpartyId: `user${i + 10}`,
        middlemanId: status === 'open' ? null : 'middleman1',
        status,
        amount: Math.floor(Math.random() * 500) + 50,
        paymentMethod,
        messages: generateMockMessages(3 + Math.floor(Math.random() * 5)),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date()
      };
      
      mockTickets.push(ticket);
    }
  } else {
    // Generate user's tickets (1-3 tickets)
    const ticketCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < ticketCount; i++) {
      const status: TicketStatus = ['open', 'in-progress'][Math.floor(Math.random() * 2)] as TicketStatus;
      const paymentMethod: PaymentMethod = ['Bitcoin', 'Ethereum', 'PayPal'][Math.floor(Math.random() * 3)] as PaymentMethod;
      
      const ticket: Ticket = {
        id: `T${Math.floor(1000 + Math.random() * 9000)}`,
        title: `My Transaction #${i + 1}`,
        description: 'Transaction details will be discussed in private chat.',
        clientId: currentUser.id,
        counterpartyId: 'user5',
        middlemanId: status === 'open' ? null : 'middleman1',
        status,
        amount: Math.floor(Math.random() * 300) + 50,
        paymentMethod,
        messages: generateMockMessages(2 + Math.floor(Math.random() * 3)),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date()
      };
      
      mockTickets.push(ticket);
    }
  }
  
  // Sort by most recent first
  mockTickets.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  
  return mockTickets;
};

// Helper to generate mock messages
const generateMockMessages = (count: number): Message[] => {
  const messages: Message[] = [];
  const users = ['Client', 'Counterparty', 'Middleman'];
  const systemMessages = [
    'Ticket has been created.',
    'Middleman has been assigned to this transaction.',
    'Transaction is now in progress.'
  ];
  
  // Always add a system message first
  messages.push({
    id: `msg${Math.random().toString(36).substring(2, 9)}`,
    senderId: 'system',
    senderName: 'System',
    content: systemMessages[0],
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
    isSystem: true
  });
  
  if (count > 1) {
    messages.push({
      id: `msg${Math.random().toString(36).substring(2, 9)}`,
      senderId: 'system',
      senderName: 'System',
      content: systemMessages[1],
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 12 * 60 * 60 * 1000)),
      isSystem: true
    });
  }
  
  const userMessages = [
    'Hi there, I\'m ready to proceed with the transaction.',
    'Can we discuss the payment details?',
    'I\'ve sent the payment, please confirm.',
    'Everything looks good on my end.',
    'When will you be available to complete this?',
    'Let me know if you have any questions.',
    'I\'ll need verification once the payment is received.'
  ];
  
  for (let i = 2; i < count; i++) {
    const isSystem = Math.random() < 0.3 && i > 2;
    
    if (isSystem) {
      messages.push({
        id: `msg${Math.random().toString(36).substring(2, 9)}`,
        senderId: 'system',
        senderName: 'System',
        content: systemMessages[2],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 6 * 60 * 60 * 1000)),
        isSystem: true
      });
    } else {
      const userIndex = Math.floor(Math.random() * users.length);
      messages.push({
        id: `msg${Math.random().toString(36).substring(2, 9)}`,
        senderId: `user${userIndex}`,
        senderName: users[userIndex],
        content: userMessages[Math.floor(Math.random() * userMessages.length)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 4 * 60 * 60 * 1000))
      });
    }
  }
  
  // Sort by timestamp
  messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  return messages;
};