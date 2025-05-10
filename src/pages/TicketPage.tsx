import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Ticket, Message, generateMockTickets } from '../models/Ticket';
import { 
  Clock, CheckCircle, XCircle, AlertCircle, 
  ArrowLeft, Send, Shield, User, DollarSign
} from 'lucide-react';

const TicketPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load ticket data
  useEffect(() => {
    if (user && id) {
      // Generate mock tickets and find the requested one
      const mockTickets = generateMockTickets(user);
      const foundTicket = mockTickets.find(t => t.id === id);
      setTicket(foundTicket || null);
      setIsLoading(false);
    }
  }, [id, user]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket?.messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !ticket || !user) return;
    
    const message: Message = {
      id: `msg${Math.random().toString(36).substring(2, 9)}`,
      senderId: user.id,
      senderName: user.username,
      content: newMessage,
      timestamp: new Date()
    };
    
    setTicket({
      ...ticket,
      messages: [...ticket.messages, message],
      updatedAt: new Date()
    });
    
    setNewMessage('');
  };
  
  const updateTicketStatus = (newStatus: 'completed' | 'cancelled') => {
    if (!ticket) return;
    
    const systemMessage: Message = {
      id: `msg${Math.random().toString(36).substring(2, 9)}`,
      senderId: 'system',
      senderName: 'System',
      content: `Ticket has been marked as ${newStatus}.`,
      timestamp: new Date(),
      isSystem: true
    };
    
    setTicket({
      ...ticket,
      status: newStatus,
      messages: [...ticket.messages, systemMessage],
      updatedAt: new Date()
    });
  };
  
  // Helper function to format timestamps
  const formatTimestamp = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Helper function to format full dates
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Render status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            <Clock size={12} className="mr-1" />
            Open
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            <AlertCircle size={12} className="mr-1" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
            <XCircle size={12} className="mr-1" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!ticket) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ticket Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The ticket you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200 inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  const isCompleted = ticket.status === 'completed' || ticket.status === 'cancelled';
  const isAdmin = user?.isAdmin;
  const isMiddleman = user?.id === ticket.middlemanId;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticket Details */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card transition-colors duration-300 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {ticket.title}
                </h1>
                {getStatusBadge(ticket.status)}
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                ID: {ticket.id}
              </p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {ticket.description}
              </p>
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Transaction Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <DollarSign size={20} className="text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Amount
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${ticket.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User size={20} className="text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Method
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {ticket.paymentMethod}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={20} className="text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Created
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formatDate(ticket.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield size={20} className="text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Middleman
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {ticket.middlemanId ? 'Assigned' : 'Waiting for assignment'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {(isAdmin || isMiddleman) && !isCompleted && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Admin Actions
                </h2>
                
                <div className="space-y-2">
                  <button
                    onClick={() => updateTicketStatus('completed')}
                    className="w-full py-2 px-4 bg-success-600 hover:bg-success-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark as Completed
                  </button>
                  
                  <button
                    onClick={() => updateTicketStatus('cancelled')}
                    className="w-full py-2 px-4 bg-error-600 hover:bg-error-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <XCircle size={16} className="mr-2" />
                    Cancel Transaction
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card h-full flex flex-col transition-colors duration-300">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Transaction Chat
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Communicate securely with all parties involved
              </p>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6" style={{ maxHeight: '500px' }}>
              <div className="space-y-4">
                {ticket.messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.isSystem ? 'justify-center' : 'items-start'}`}
                  >
                    {message.isSystem ? (
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                        {message.content}
                      </div>
                    ) : (
                      <>
                        <div className={`flex max-w-[80%] ${message.senderId === user?.id ? 'ml-auto flex-row-reverse' : ''}`}>
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.senderId === user?.id 
                                ? 'ml-2 bg-primary-100 dark:bg-primary-900/30' 
                                : 'mr-2 bg-gray-100 dark:bg-gray-700'
                            }`}
                          >
                            <User 
                              size={16} 
                              className={message.senderId === user?.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'} 
                            />
                          </div>
                          <div>
                            <div 
                              className={`rounded-lg px-4 py-2 inline-block ${
                                message.senderId === user?.id 
                                  ? 'bg-primary-600 text-white' 
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <p className="text-sm font-medium mb-1">
                                {message.senderName}
                              </p>
                              <p>{message.content}</p>
                            </div>
                            <p className={`text-xs text-gray-500 mt-1 ${
                              message.senderId === user?.id ? 'text-right' : ''
                            }`}>
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {!isCompleted && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white transition-colors duration-200"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Send size={16} className="mr-2" />
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;