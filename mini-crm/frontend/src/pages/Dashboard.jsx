import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    convertedLeads: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/leads');
        const leads = response.data.items || [];
        setStats({
          totalLeads: leads.length,
          newLeads: leads.filter(l => l.status === 'New').length,
          contactedLeads: leads.filter(l => l.status === 'Contacted').length,
          convertedLeads: leads.filter(l => l.status === 'Converted').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Leads', value: stats.totalLeads, icon: '📊', color: 'from-blue-500 to-blue-600' },
    { title: 'New Leads', value: stats.newLeads, icon: '🆕', color: 'from-purple-500 to-purple-600' },
    { title: 'Contacted', value: stats.contactedLeads, icon: '📞', color: 'from-yellow-500 to-yellow-600' },
    { title: 'Converted', value: stats.convertedLeads, icon: '✅', color: 'from-green-500 to-green-600' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{stat.icon}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                Current
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="text-2xl">👋</span>
            <span>Welcome to your CRM dashboard! Start by adding new leads.</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <span className="text-2xl">💡</span>
            <span>Click on "Leads" in the sidebar to manage your contacts.</span>
          </div>
        </div>
      </div>
    </div>
  );
}