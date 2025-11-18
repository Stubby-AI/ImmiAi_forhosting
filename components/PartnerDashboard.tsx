import React from 'react';
import { Lead, UserType } from '../types';
import { Search, Bell, MoreHorizontal, Calendar, FileText, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'New', score: 85, type: UserType.Worker, lastActive: '2 hrs ago' },
  { id: '2', name: 'Mohammed Ali', email: 'm.ali@example.com', status: 'Consultation Booked', score: 92, type: UserType.Student, lastActive: '10 mins ago' },
  { id: '3', name: 'Li Wei', email: 'li.wei@example.com', status: 'In Progress', score: 74, type: UserType.Worker, lastActive: '1 day ago' },
  { id: '4', name: 'Priya Patel', email: 'priya.p@example.com', status: 'New', score: 60, type: UserType.Student, lastActive: '5 hrs ago' },
  { id: '5', name: 'Carlos Rodriguez', email: 'carlos.r@example.com', status: 'Visa Approved', score: 98, type: UserType.Worker, lastActive: '1 week ago' },
];

const STATS_DATA = [
  { name: 'Mon', leads: 12 },
  { name: 'Tue', leads: 19 },
  { name: 'Wed', leads: 15 },
  { name: 'Thu', leads: 22 },
  { name: 'Fri', leads: 30 },
  { name: 'Sat', leads: 10 },
  { name: 'Sun', leads: 5 },
];

export const PartnerDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
          <p className="text-gray-500">Manage your immigration leads and consultations</p>
        </div>
        <div className="flex gap-3">
            <button className="p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">
                + Add Client
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <p className="text-sm text-gray-500 mb-1">Total Active Leads</p>
             <h2 className="text-3xl font-bold text-gray-900">142</h2>
             <span className="text-xs text-green-600 font-medium">+12% from last month</span>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <p className="text-sm text-gray-500 mb-1">Consultations Booked</p>
             <h2 className="text-3xl font-bold text-gray-900">28</h2>
             <span className="text-xs text-green-600 font-medium">+5% from last week</span>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
             <h2 className="text-3xl font-bold text-gray-900">18.5%</h2>
             <span className="text-xs text-gray-500">Industry avg: 12%</span>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <p className="text-sm text-gray-500 mb-1">Revenue (This Month)</p>
             <h2 className="text-3xl font-bold text-gray-900">$4,250</h2>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Leads Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent High-Potential Leads</h3>
                <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600"><Search size={18} /></button>
                    <button className="text-gray-400 hover:text-gray-600"><Filter size={18} /></button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">AI Score</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_LEADS.map(lead => (
                            <tr key={lead.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900 flex flex-col">
                                    <span>{lead.name}</span>
                                    <span className="text-xs text-gray-400">{lead.email}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${lead.type === UserType.Worker ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                        {lead.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`font-bold ${lead.score > 80 ? 'text-green-600' : lead.score > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                        {lead.score}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`px-2 py-1 rounded-full text-xs font-medium
                                        ${lead.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                                          lead.status === 'Consultation Booked' ? 'bg-orange-50 text-orange-600' :
                                          lead.status === 'Visa Approved' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}
                                     `}>
                                        {lead.status}
                                     </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-400 hover:text-gray-700">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-900 mb-4">Lead Volume</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={STATS_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                        <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="leads" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2">
                        <FileText size={14} /> Documents Reviewed
                    </span>
                    <span className="font-bold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500 flex items-center gap-2">
                        <Calendar size={14} /> Upcoming Calls
                    </span>
                    <span className="font-bold text-gray-900">8</span>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};