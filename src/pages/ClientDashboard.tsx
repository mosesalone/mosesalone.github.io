import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Ticket, generateMockTickets, PaymentMethod } from '../models/Ticket';
import { PlusCircle, DollarSign, User, ExternalLink } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    amount: '',
    paymentMethod: 'Bitcoin' as PaymentMethod,
    counterparty: ''
  });
  
  // Mock data loading
  useEffect(() => {
    if (user) {
      const mockTickets = generateMockTickets(user);
      setTickets(mockTickets);
    }
  }, [user]);
  
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Create a new ticket ID with a random number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `T${randomNum}H`;
    
    const createdTicket: Ticket = {
      id: newId,
      title: newTicket.title,
      description: newTicket.description,
      clientId: user.id,
      counterpartyId: newTicket.counterparty,
      middlemanId: null,
      status: 'open',
      amount: parseFloat(newTicket.amount),
      paymentMethod: newTicket.paymentMethod,
      messages: [{
        id: `msg${Math.random().toString(36).substring(2, 9)}`,
        senderId: 'system',
        senderName: 'System',
        content: 'Ticket has been created.',
        timestamp: new Date(),
        isSystem: true
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTickets(prevTickets => [createdTicket, ...prevTickets]);
    setIsCreatingTicket(false);
    setNewTicket({
      title: '',
      description: '',
      amount: '',
      paymentMethod: 'Bitcoin',
      counterparty: ''
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Client Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your anonymous transactions securely.
        </p>
      </div>
      
      {/* Create Ticket Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card mb-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isCreatingTicket ? 'Create New Transaction' : 'Transactions'}
            </h2>
            {!isCreatingTicket && (
              <button
                onClick={() => setIsCreatingTicket(true)}
                className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
              >
                <PlusCircle size={18} className="mr-2" />
                New Transaction
              </button>
            )}
          </div>
          
          {isCreatingTicket ? (
            <form onSubmit={handleCreateTicket} className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Transaction Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="e.g., Bitcoin Exchange"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="counterparty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Counterparty Username
                  </label>
                  <input
                    type="text"
                    id="counterparty"
                    value={newTicket.counterparty}
                    onChange={(e) => setNewTicket({...newTicket, counterparty: e.target.value})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="Username of the other party"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount ($)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="number"
                      id="amount"
                      min="1"
                      step="0.01"
                      value={newTicket.amount}
                      onChange={(e) => setNewTicket({...newTicket, amount: e.target.value})}
                      className="block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                      placeholder="100.00"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    value={newTicket.paymentMethod}
                    onChange={(e) => setNewTicket({...newTicket, paymentMethod: e.target.value as PaymentMethod})}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                    required
                  >
                    <option value="Bitcoin">Bitcoin</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="USDT">USDT</option>
                    <option value="PayPal">PayPal</option>
                    <option value="CashApp">CashApp</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Gift Card">Gift Card</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                  placeholder="Provide details about the transaction"
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCreatingTicket(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
                >
                  Create Transaction
                </button>
              </div>
            </form>
          ) : (
            <div className="overflow-x-auto">
              {tickets.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {ticket.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          ${ticket.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ticket.status === 'completed' 
                              ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300'
                              : 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300'
                          }`}>
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ticket.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          <Link 
                            to={`/ticket/${ticket.id}`} 
                            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 flex items-center justify-end"
                          >
                            View <ExternalLink size={14} className="ml-1" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No transactions yet. Create your first transaction to get started.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;