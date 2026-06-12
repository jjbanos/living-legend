'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  Flame, Target, BookOpen, Award, Zap, Brain, Heart, TrendingUp, 
  ArrowRight, Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - in production would come from Prisma + Clerk
const initialScore = 58;
const initialStreak = 12;

const quickWins = [
  { id: 'anxiety', label: '60s Anxiety Reset', icon: Brain, color: 'text-blue-400' },
  { id: 'ego', label: 'Ego Check', icon: Zap, color: 'text-amber-400' },
  { id: 'confidence', label: 'Confidence Boost', icon: TrendingUp, color: 'text-emerald-400' },
  { id: 'energy', label: 'Energy Reset', icon: Heart, color: 'text-rose-400' },
];

const miniClassesPreview = [
  { title: "Name It to Tame It", duration: "7 min", category: "Anxiety" },
  { title: "Sexual Energy Mastery", duration: "12 min", category: "Power" },
  { title: "Destroy Insecurity in 7 Days", duration: "9 min", category: "Confidence" },
  { title: "The Observer Gap", duration: "6 min", category: "Presence" },
  { title: "Build Unshakable Confidence", duration: "11 min", category: "Mindset" },
];

export default function DailyPracticeDashboard() {
  const { data: session } = useSession();
  const [legendScore, setLegendScore] = useState(initialScore);
  const [streak, setStreak] = useState(initialStreak);
  const [journalEntry, setJournalEntry] = useState('');
  const [savedJournals, setSavedJournals] = useState<string[]>([]);
  const [completedWins, setCompletedWins] = useState<string[]>([]);
  const [showQuickWinFeedback, setShowQuickWinFeedback] = useState<string | null>(null);

  // Load from localStorage for demo persistence
  useEffect(() => {
    const savedScore = localStorage.getItem('legendScore');
    const savedStreak = localStorage.getItem('streak');
    const savedJournalsStr = localStorage.getItem('journals');
    const savedWins = localStorage.getItem('completedWins');

    if (savedScore) setLegendScore(parseInt(savedScore));
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedJournalsStr) setSavedJournals(JSON.parse(savedJournalsStr));
    if (savedWins) setCompletedWins(JSON.parse(savedWins));
  }, []);

  const saveToStorage = (score: number, newStreak: number, journals: string[], wins: string[]) => {
    localStorage.setItem('legendScore', score.toString());
    localStorage.setItem('streak', newStreak.toString());
    localStorage.setItem('journals', JSON.stringify(journals));
    localStorage.setItem('completedWins', JSON.stringify(wins));
  };

  // Progress circle calculation (SVG)
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = (legendScore / 100) * circumference;

  const handleQuickWin = (winId: string) => {
    if (completedWins.includes(winId)) return;

    const newWins = [...completedWins, winId];
    const scoreBoost = 3;
    const newScore = Math.min(100, legendScore + scoreBoost);
    
    setLegendScore(newScore);
    setCompletedWins(newWins);
    setShowQuickWinFeedback(winId);

    // Update streak occasionally
    let newStreak = streak;
    if (newWins.length % 2 === 0) {
      newStreak = streak + 1;
      setStreak(newStreak);
    }

    saveToStorage(newScore, newStreak, savedJournals, newWins);

    // Hide feedback after 2s
    setTimeout(() => {
      setShowQuickWinFeedback(null);
    }, 2000);
  };

  const saveJournal = () => {
    if (!journalEntry.trim()) return;

    const newJournals = [journalEntry.trim(), ...savedJournals].slice(0, 5);
    const newScore = Math.min(100, legendScore + 2);
    
    setSavedJournals(newJournals);
    setLegendScore(newScore);
    setJournalEntry('');

    saveToStorage(newScore, streak, newJournals, completedWins);
  };

  const name = session?.user?.name?.split(' ')[0] || 'Brother';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="font-semibold tracking-tight text-lg">LIVING LEGEND</Link>
            <div className="hidden md:flex items-center gap-6 text-[#a1a1aa]">
              <Link href="/dashboard" className="hover:text-white">Daily</Link>
              <Link href="/journal" className="hover:text-white">Journal</Link>
              <Link href="/classes" className="hover:text-white">Master Classes</Link>
              <Link href="/assessment" className="hover:text-white">Assessment</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-[#666] hidden sm:block">Welcome, {name}</div>
            <button
              onClick={() => signOut({ redirectTo: '/' })}
              className="text-xs text-[#a1a1aa] hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="text-[#C5A26F] text-xs tracking-[3px] mb-1">PRIVATE DAILY PRACTICE</div>
            <h1 className="text-5xl tracking-[-2px] font-semibold">Good morning, {name}.</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20"
            onClick={() => signOut({ redirectTo: '/' })}
          >
            Sign out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Legend Score with Progress Circle */}
          <div className="lg:col-span-5 border border-white/10 bg-[#121212] rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[#C5A26F] text-xs tracking-widest">LEGEND SCORE</div>
                <div className="text-6xl font-bold tabular-nums text-[#C5A26F] mt-1">{legendScore}</div>
              </div>
              <div className="text-right text-xs text-[#666]">0 — 100</div>
            </div>

            {/* Progress Circle */}
            <div className="flex justify-center my-6">
              <svg width="140" height="140" className="transform -rotate-90">
                <circle
                  cx="70" cy="70" r={radius}
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="12"
                />
                <circle
                  cx="70" cy="70" r={radius}
                  fill="none"
                  stroke="#C5A26F"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute mt-[42px] text-center">
                <div className="text-4xl font-semibold text-[#C5A26F]">{legendScore}</div>
                <div className="text-[10px] text-[#666] -mt-1">LEVEL {Math.floor(legendScore / 12) + 1}</div>
              </div>
            </div>

            <div className="text-center text-sm text-[#a1a1aa]">
              +{Math.floor((legendScore - 42) / 3)} points this week. Keep the streak alive.
            </div>
          </div>

          {/* Streak & Quick Stats */}
          <div className="lg:col-span-7 border border-white/10 bg-[#121212] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-6 h-6 text-[#C5A26F]" />
              <div>
                <div className="text-[#C5A26F] text-xs tracking-widest">CURRENT STREAK</div>
                <div className="text-5xl font-semibold tabular-nums">{streak} <span className="text-2xl text-[#666]">days</span></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-[#666] text-xs">LONGEST STREAK</div>
                <div className="font-semibold text-2xl mt-1">{Math.max(streak, 28)} days</div>
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-[#666] text-xs">PRACTICES LOGGED</div>
                <div className="font-semibold text-2xl mt-1">{streak * 3 + 14}</div>
              </div>
            </div>
          </div>

          {/* Quick Win Buttons */}
          <div className="lg:col-span-12 border border-white/10 bg-[#121212] rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-semibold text-xl">Quick Wins</div>
                <div className="text-[#a1a1aa] text-sm">60-second tools to shift your state immediately</div>
              </div>
              <Target className="w-5 h-5 text-[#C5A26F]" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickWins.map((win) => {
                const isCompleted = completedWins.includes(win.id);
                const isActive = showQuickWinFeedback === win.id;
                return (
                  <button
                    key={win.id}
                    onClick={() => handleQuickWin(win.id)}
                    disabled={isCompleted}
                    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-xl border transition-all text-center
                      ${isCompleted 
                        ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' 
                        : isActive 
                          ? 'border-[#C5A26F] bg-[#C5A26F]/10' 
                          : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                  >
                    <win.icon className={`w-6 h-6 ${win.color}`} />
                    <div className="text-sm font-medium">{win.label}</div>
                    {isCompleted && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-[#666] mt-4 text-center">Each win adds +3 to your Legend Score</div>
          </div>

          {/* Private Journal */}
          <div className="lg:col-span-7 border border-white/10 bg-[#121212] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-[#C5A26F]" />
              <div className="font-semibold text-xl">Private Journal</div>
            </div>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="What did you face today? What did you name? What courage did you show?"
              className="w-full h-32 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-sm resize-y focus:outline-none focus:border-[#C5A26F]/60 placeholder:text-[#666]"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-[#666]">Only you can see this.</div>
              <Button onClick={saveJournal} disabled={!journalEntry.trim()} size="sm">
                Save Entry
              </Button>
            </div>

            {savedJournals.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="text-xs text-[#666] mb-2">RECENT ENTRIES</div>
                <ul className="text-sm space-y-2 text-[#a1a1aa]">
                  {savedJournals.slice(0, 3).map((entry, i) => (
                    <li key={i} className="line-clamp-1">• {entry}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mini Master Class Carousel */}
          <div className="lg:col-span-5 border border-white/10 bg-[#121212] rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-xl flex items-center gap-3">
                <Award className="w-5 h-5 text-[#C5A26F]" /> Mini Master Classes
              </div>
              <Link href="/classes" className="text-xs text-[#C5A26F] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {miniClassesPreview.map((cls, index) => (
                <Link 
                  key={index} 
                  href="/classes" 
                  className="min-w-[160px] snap-start border border-white/10 hover:border-[#C5A26F]/40 bg-[#0a0a0a] rounded-xl p-4 flex-shrink-0 transition-all"
                >
                  <div className="text-[#C5A26F] text-[10px] tracking-widest mb-1">{cls.category.toUpperCase()}</div>
                  <div className="font-medium text-sm leading-tight mb-3 line-clamp-2">{cls.title}</div>
                  <div className="text-xs text-[#666]">{cls.duration}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-[#444]">
          Everything here is private. No social features. Your data stays yours.
        </div>
      </div>
    </div>
  );
}
