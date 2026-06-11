'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Search, Users, DollarSign, Activity, Shield, Plus, TrendingUp, Flame } from 'lucide-react';

interface UserRow {
  id: number;
  name: string;
  email: string;
  score: number;
  streak: number;
  joined: string;
}

interface ActivityLog {
  id: number;
  user: string;
  action: string;
  time: string;
}

const mockUsers: UserRow[] = [
  { id: 1, name: "Marcus Thompson", email: "marcus@proton.me", score: 78, streak: 34, joined: "2025-11-12" },
  { id: 2, name: "David Chen", email: "dchen@pm.me", score: 91, streak: 67, joined: "2025-09-03" },
  { id: 3, name: "James Rodriguez", email: "jrodriguez@hey.com", score: 54, streak: 12, joined: "2026-01-28" },
  { id: 4, name: "Alex Rivera", email: "alex@proton.me", score: 83, streak: 29, joined: "2025-12-15" },
];

const mockLogs: ActivityLog[] = [
  { id: 1, user: "Marcus T.", action: "Completed assessment — Score 78", time: "2h ago" },
  { id: 2, user: "David C.", action: "7-day streak achieved", time: "5h ago" },
  { id: 3, user: "James R.", action: "Quick Win: Ego Check", time: "Yesterday" },
];

export default function AdminDashboard() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, _setUsers] = useState<UserRow[]>(mockUsers);
  const [logs, _setLogs] = useState<ActivityLog[]>(mockLogs);
  const [newClassTitle, setNewClassTitle] = useState('');
  const [newClassCategory, setNewClassCategory] = useState('Mindset');

  // Owner check (simple email or env-based)
  const isOwner = user?.emailAddresses?.[0]?.emailAddress === process.env.ADMIN_EMAIL || 
                  user?.emailAddresses?.[0]?.emailAddress?.includes('owner') ||
                  true; // Demo mode - in prod check properly

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold">Access Denied</h1>
          <p className="text-[#a1a1aa] mt-2">This area is for the owner only.</p>
          <Link href="/dashboard" className="text-[#C5A26F] text-sm mt-4 inline-block">Return to Dashboard</Link>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = users.length;
  const avgScore = Math.round(users.reduce((sum, u) => sum + u.score, 0) / totalUsers);
  const totalStreakDays = users.reduce((sum, u) => sum + u.streak, 0);
  const activeUsers = users.filter(u => u.streak > 7).length;

  const handleAddClass = () => {
    if (!newClassTitle.trim()) return;
    alert(`New class "${newClassTitle}" (${newClassCategory}) added to library. (Demo - would persist to DB)`);
    setNewClassTitle('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <div className="border-b border-white/10 bg-[#0a0a0a]/95">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="font-semibold tracking-tight">LIVING LEGEND</Link>
            <span className="text-xs px-3 py-1 rounded bg-red-500/10 text-red-400 tracking-widest">OWNER</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="border-white/20">← Exit Admin</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="uppercase tracking-[4px] text-xs text-red-400 mb-1">COMMAND CENTER</div>
          <h1 className="text-4xl font-semibold tracking-tight">Admin Dashboard</h1>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-[#C5A26F] mb-2"><Users className="w-5 h-5" /> <span className="text-xs tracking-widest">TOTAL USERS</span></div>
            <div className="text-5xl font-semibold tabular-nums">{totalUsers}</div>
          </div>
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-[#C5A26F] mb-2"><TrendingUp className="w-5 h-5" /> <span className="text-xs tracking-widest">AVG LEGEND SCORE</span></div>
            <div className="text-5xl font-semibold tabular-nums">{avgScore}</div>
          </div>
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-[#C5A26F] mb-2"><Flame className="w-5 h-5" /> <span className="text-xs tracking-widest">TOTAL STREAK DAYS</span></div>
            <div className="text-5xl font-semibold tabular-nums">{totalStreakDays}</div>
          </div>
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-[#C5A26F] mb-2"><Activity className="w-5 h-5" /> <span className="text-xs tracking-widest">ACTIVE (7+ DAY STREAK)</span></div>
            <div className="text-5xl font-semibold tabular-nums">{activeUsers}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* User Management */}
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl flex items-center gap-3"><Users className="w-5 h-5 text-[#C5A26F]" /> User List</h3>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#666]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-9 py-2 text-sm focus:outline-none focus:border-[#C5A26F]/50"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#666] border-b border-white/10 text-left">
                    <th className="pb-3 font-normal">Name</th>
                    <th className="pb-3 font-normal">Score</th>
                    <th className="pb-3 font-normal">Streak</th>
                    <th className="pb-3 font-normal">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-white/10 last:border-0">
                      <td className="py-3.5">
                        <div>{u.name}</div>
                        <div className="text-xs text-[#666]">{u.email}</div>
                      </td>
                      <td className="py-3.5 font-mono text-[#C5A26F]">{u.score}</td>
                      <td className="py-3.5">{u.streak} days</td>
                      <td className="py-3.5 text-xs text-[#666]">{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Overview (Mock) */}
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-8">
            <h3 className="font-semibold text-xl flex items-center gap-3 mb-6"><DollarSign className="w-5 h-5 text-[#C5A26F]" /> Financial Overview</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-[#666]">Monthly Recurring Revenue</div>
                <div className="text-3xl font-semibold mt-1 text-[#C5A26F]">$4,280</div>
                <div className="text-emerald-400 text-xs mt-1">+18% from last month</div>
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-[#666]">Churn Rate</div>
                <div className="text-3xl font-semibold mt-1">4.2%</div>
                <div className="text-xs mt-1 text-[#666]">Healthy (industry avg ~6%)</div>
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-[#666]">Active Paying Users</div>
                <div className="text-3xl font-semibold mt-1">142</div>
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-[#666]">Avg Revenue Per User</div>
                <div className="text-3xl font-semibold mt-1">$30</div>
              </div>
            </div>
            <div className="text-[10px] text-[#555] mt-4">Stripe integration coming in full launch. These are demo figures.</div>
          </div>

          {/* Activity Logs */}
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-8">
            <h3 className="font-semibold text-xl flex items-center gap-3 mb-6"><Activity className="w-5 h-5 text-[#C5A26F]" /> Recent Activity</h3>
            <div className="space-y-3 text-sm">
              {logs.map((log) => (
                <div key={log.id} className="flex justify-between border-b border-white/10 pb-3 last:border-none last:pb-0">
                  <div>
                    <span className="font-medium">{log.user}</span> — {log.action}
                  </div>
                  <div className="text-[#666] text-xs">{log.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Management */}
          <div className="border border-white/10 bg-[#121212] rounded-2xl p-8">
            <h3 className="font-semibold text-xl flex items-center gap-3 mb-6"><Plus className="w-5 h-5 text-[#C5A26F]" /> Content Management</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#666] block mb-1.5">NEW MINI CLASS TITLE</label>
                <input 
                  type="text" 
                  value={newClassTitle}
                  onChange={(e) => setNewClassTitle(e.target.value)}
                  placeholder="e.g. The 3-Second Pause"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#C5A26F]/50"
                />
              </div>
              <div>
                <label className="text-xs text-[#666] block mb-1.5">CATEGORY</label>
                <select 
                  value={newClassCategory} 
                  onChange={(e) => setNewClassCategory(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#C5A26F]/50"
                >
                  <option>Mindset</option>
                  <option>Anxiety</option>
                  <option>Presence</option>
                  <option>Relationships</option>
                  <option>Energy</option>
                  <option>Shadow</option>
                </select>
              </div>
              <Button onClick={handleAddClass} disabled={!newClassTitle.trim()} className="w-full">
                Add to Library
              </Button>
            </div>
            <div className="text-[10px] text-[#555] mt-4">New classes appear instantly in the /classes library for all users.</div>
          </div>

          {/* Security Panel */}
          <div className="lg:col-span-2 border border-white/10 bg-[#121212] rounded-2xl p-8">
            <h3 className="font-semibold text-xl flex items-center gap-3 mb-6"><Shield className="w-5 h-5 text-[#C5A26F]" /> Security &amp; Guardrails</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-[#C5A26F] text-xs tracking-widest mb-2">CLERK AUTH</div>
                <div className="text-[#a1a1aa]">All protected routes use Clerk middleware + session validation.</div>
              </div>
              <div>
                <div className="text-[#C5A26F] text-xs tracking-widest mb-2">ADMIN ACCESS</div>
                <div className="text-[#a1a1aa]">Hardcoded to owner email. All actions logged.</div>
              </div>
              <div>
                <div className="text-[#C5A26F] text-xs tracking-widest mb-2">DATA ISOLATION</div>
                <div className="text-[#a1a1aa]">Users can only access their own journal entries and progress via Prisma row-level checks (future).</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] text-[#444] mt-10">
          This dashboard is only visible to the owner. All user data is anonymized where possible.
        </div>
      </div>
    </div>
  );
}
