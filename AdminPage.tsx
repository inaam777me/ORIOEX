
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { leadStore, PersistedLead } from './services/leadStore';

// --- Auth Hook ---
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('orioex_admin_auth') === 'true';
  });

  const login = (password: string) => {
    if (password === 'admin123') {
      sessionStorage.setItem('orioex_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('orioex_admin_auth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

// --- Login Page Component ---
export const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin');
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid access credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="w-full max-w-md bg-white/[0.03] border border-white/10 p-10 rounded-3xl">
        <div className="text-center mb-10">
          <div className="text-3xl font-bold tracking-tighter mb-2">ORIO<span className="text-blue-500">EX</span></div>
          <p className="text-gray-400 text-sm">Authorized Personnel Only</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Access Key</label>
            <input 
              autoFocus
              required
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600 text-white"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all text-white">
            Unlock Console
          </button>
        </form>
        <Link to="/" className="block text-center mt-6 text-xs text-gray-500 hover:text-white transition-colors">
          &larr; Return to public site
        </Link>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
export const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<PersistedLead[]>([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    setLeads(leadStore.getLeads());
  }, [isAuthenticated, navigate]);

  const filteredLeads = useMemo(() => {
    if (filter === 'ALL') return leads;
    return leads.filter(l => l.priority === filter);
  }, [leads, filter]);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all lead history?')) {
      leadStore.clearLeads();
      setLeads([]);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this record?')) {
      leadStore.deleteLead(id);
      setLeads(leadStore.getLeads());
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
              ORIO<span className="text-blue-500">EX</span>
            </Link>
            <span className="h-4 w-px bg-white/10"></span>
            <div className="text-sm text-gray-400 font-medium">Console</div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Sign Out</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lead Intelligence</h1>
            <p className="text-gray-400 text-sm">Enterprise inquiry management and AI qualification metrics.</p>
          </div>
          <div className="flex gap-4 items-center">
             <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {f}
                  </button>
                ))}
             </div>
             <button onClick={handleClear} className="text-xs font-bold text-red-500/80 hover:text-red-500 transition-colors px-4 py-2 rounded-lg hover:bg-red-500/5">Clear All</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-gray-400 text-[10px] font-bold uppercase mb-2 tracking-widest">Total Inquiries</div>
            <div className="text-4xl font-bold tracking-tighter">{leads.length}</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-blue-400 text-[10px] font-bold uppercase mb-2 tracking-widest">High Priority</div>
            <div className="text-4xl font-bold tracking-tighter">{leads.filter(l => l.priority === 'HIGH').length}</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-purple-400 text-[10px] font-bold uppercase mb-2 tracking-widest">In Pipeline</div>
            <div className="text-4xl font-bold tracking-tighter">{leads.filter(l => l.priority !== 'LOW').length}</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-gray-400 text-[10px] font-bold uppercase mb-2 tracking-widest">Score Avg.</div>
            <div className="text-4xl font-bold tracking-tighter">
              {leads.length > 0 ? (leads.reduce((acc, l) => acc + l.score, 0) / leads.length).toFixed(0) : 0}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Identity</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Assessment</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Budget / Tier</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length > 0 ? filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-6">
                    <div className="font-bold text-white mb-1">{lead.name}</div>
                    <div className="text-xs text-gray-400">{lead.email}</div>
                    <div className="text-[10px] text-blue-400/80 font-mono mt-1 tracking-tight">{lead.company || 'Direct Engagement'}</div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-grow h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[100px]">
                        <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${lead.score}%` }}></div>
                      </div>
                      <span className="text-xs font-black text-blue-400">{lead.score}</span>
                    </div>
                    <div className="text-xs text-gray-400 max-w-sm leading-relaxed">{lead.summary}</div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${
                      lead.priority === 'HIGH' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]' :
                      lead.priority === 'MEDIUM' ? 'bg-purple-500/10 text-purple-500 border-purple-500/30' :
                      'bg-gray-500/10 text-gray-500 border-gray-500/30'
                    }`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="text-sm font-semibold text-gray-300">{lead.budget || 'UNDISCLOSED'}</div>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">{new Date(lead.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button 
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 rounded-lg bg-red-500/0 hover:bg-red-500/10 text-gray-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Entry"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-500 text-sm italic font-light tracking-wide">
                    Zero records matching the current parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
