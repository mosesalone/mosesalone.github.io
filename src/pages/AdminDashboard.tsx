import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Ticket, generateMockTickets, TicketStatus, PaymentMethod } from '../models/Ticket';
import { 
  Clock, CheckCircle, XCircle, AlertCircle, 
  Search, Filter, ExternalLink, RefreshCw, User
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, toggleMiddlemanStatus } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable || false);
  
  // Mock data loading
  useEffect(() => {
    if (user) {
      const mockTickets = generateMockTickets(user);
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
    }
  }, [user]);
  
  // Filter tickets based on status and search term
  useEffect(() => {
    let filtered = [...tickets];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(term) || 
        ticket.id.toLowerCase().includes(term) ||
        ticket.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredTickets(filtered);
  }, [statusFilter, searchTerm, tickets]);
  
  const handleToggleAvailability = () => {
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    toggleMiddlemanStatus(newAvailability);
  };
  
  const handleUpdateTicketStatus = (ticketId: string, newStatus: TicketStatus) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          updatedAt: new Date(),
          middlemanId: newStatus === 'open' ? null : (ticket.middlemanId || user?.id || null),
          messages: [
            ...ticket.messages,
            {
              id: `msg${Math.random().toString(36).substring(2, 9)}`,
              senderId: 'system',
              senderName: 'System',
              content: `Ticket status changed to ${newStatus}.`,
              timestamp: new Date(),
              isSystem: true
            }
          ]
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
  };
  
  const handleAssignSelf = (ticketId: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          middlemanId: user?.id || null,
          status: 'in-progress',
          updatedAt: new Date(),
          messages: [
            ...ticket.messages,
            {
              id: `msg${Math.random().toString(36).substring(2, 9)}`,
              senderId: 'system',
              senderName: 'System',
              content: `Admin ${user?.username} has been assigned as middleman.`,
              timestamp: new Date(),
              isSystem: true
            }
          ]
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
  };
  
  // Helper function to render status badge
  const getStatusBadge = (status: TicketStatus) => {
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
  
  const refreshTickets = () => {
    if (user) {
      const mockTickets = generateMockTickets(user);
      setTickets(mockTickets);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage tickets and oversee transactions
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          {user?.isMiddleman && (
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={handleToggleAvailability}
                className={`px-4 py-2 rounded-lg flex items-center ${
                  isAvailable 
                    ? 'bg-success-500 hover:bg-success-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                } transition-colors duration-200`}
              >
                <User size={18} className="mr-2" />
                {isAvailable ? 'Available as Middleman' : 'Set as Available'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Admin Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card mb-8 transition-colors duration-300">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All Transactions
            </h2>
            
            <button
              onClick={refreshTickets}
              className="mt-2 sm:mt-0 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200 flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </button>
          </div>
          
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white transition-colors duration-200"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white transition-colors duration-200"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          {/* Tickets Table */}
          <div className="overflow-x-auto">
            {filteredTickets.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTickets.map((ticket) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {ticket.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(ticket.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {ticket.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                        {ticket.status === 'open' && (
                          <button
                            onClick={() => handleAssignSelf(ticket.id)}
                            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            Assign Self
                          </button>
                        )}
                        {ticket.status === 'in-progress' && (
                          <button
                            onClick={() => handleUpdateTicketStatus(ticket.id, 'completed')}
                            className="text-success-600 hover:text-success-500 dark:text-success-400 dark:hover:text-success-300"
                          >
                            Complete
                          </button>
                        )}
                        {(ticket.status === 'open' || ticket.status === 'in-progress') && (
                          <button
                            onClick={() => handleUpdateTicketStatus(ticket.id, 'cancelled')}
                            className="text-error-600 hover:text-error-500 dark:text-error-400 dark:hover:text-error-300"
                          >
                            Cancel
                          </button>
                        )}
                        <Link 
                          to={`/ticket/${ticket.id}`} 
                          className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center"
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
                  No tickets found with the current filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 transition-colors duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
              <Clock size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tickets.filter(t => t.status === 'open').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 transition-colors duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-4">
              <AlertCircle size={24} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tickets.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 transition-colors duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mr-4">
              <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tickets.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 transition-colors duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mr-4">
              <XCircle size={24} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tickets.filter(t => t.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;