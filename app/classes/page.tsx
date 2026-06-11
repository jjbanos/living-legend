'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MasterClass {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  category: string;
  content: string;
}

const masterClasses: MasterClass[] = [
  {
    id: 1,
    title: "Name It to Tame It",
    subtitle: "Anxiety & ego — label the emotion to reduce its power",
    duration: "7 min",
    category: "Anxiety",
    content: "The moment you name the feeling ('This is anxiety about being seen as weak'), the prefrontal cortex comes online. You are no longer the emotion. You are the observer of it. Practice: When you notice tension, say out loud or in your head: 'I am noticing anxiety.' Then ask: 'What story am I telling myself right now?'"
  },
  {
    id: 2,
    title: "Sexual Energy Mastery Without Losing Power",
    subtitle: "Channel drive instead of leaking it",
    duration: "12 min",
    category: "Power",
    content: "Sexual energy is life force. Most men either repress it or waste it. The master channels it into mission, creativity, and presence. Technique: When aroused or distracted, breathe into the lower belly for 10 seconds and visualize the energy moving up the spine into your chest and head. Do not suppress — transmute."
  },
  {
    id: 3,
    title: "Destroy Insecurity in 7 Days",
    subtitle: "The daily practice that rewires self-doubt",
    duration: "9 min",
    category: "Confidence",
    content: "Insecurity is a story you keep telling yourself. For 7 days: 1) Write the insecurity. 2) Write the evidence against it. 3) Take one small action that contradicts the story. Repeat. Insecurity dies from lack of attention and proof of capability."
  },
  {
    id: 4,
    title: "Build Unshakable Confidence",
    subtitle: "Evidence-based self-trust",
    duration: "11 min",
    category: "Mindset",
    content: "Confidence is not a feeling. It is the memory of past competence. Keep a 'Proof Journal'. Every night write three things you did well, no matter how small. Over 30 days your nervous system rewires. You start to trust yourself because you have receipts."
  },
  {
    id: 5,
    title: "Fix Energy Leaks in Relationships",
    subtitle: "Stop giving power away",
    duration: "8 min",
    category: "Relationships",
    content: "Every time you seek validation, over-explain, or people-please, you leak energy. Practice: Before responding to your partner or friends, ask 'Am I saying this to be seen or to lead?' Speak from direction, not reaction."
  },
  {
    id: 6,
    title: "The Observer Gap",
    subtitle: "The space between stimulus and response",
    duration: "6 min",
    category: "Presence",
    content: "Between every trigger and your reaction there is a gap. The gap is where power lives. Train it: When you feel the urge to react (anger, lust, defense), pause for 3 full breaths. Name the thought. Then choose. This is the difference between a boy and a man."
  },
  {
    id: 7,
    title: "Cold Exposure for Men",
    subtitle: "Forge resilience in the body",
    duration: "5 min",
    category: "Energy",
    content: "Cold showers or ice baths train the nervous system to stay calm under stress. Start with 30 seconds at the end of your shower. Breathe through the discomfort. The mind that can stay present in cold can stay present in life."
  },
  {
    id: 8,
    title: "The King’s Posture",
    subtitle: "Physical presence that commands respect",
    duration: "10 min",
    category: "Presence",
    content: "Shoulders back. Chest open. Chin parallel to ground. Walk like the room belongs to you. Practice 2 minutes of power posing before important moments. Your body leads your mind."
  },
  {
    id: 9,
    title: "Shadow Work for the Modern Man",
    subtitle: "Face what you avoid",
    duration: "14 min",
    category: "Shadow",
    content: "Your shadow is not evil — it is unlived life. Write the three things you are most ashamed of. Sit with them without judgment. Ask: 'What gift is hidden inside this part of me?' Integration begins with ownership."
  },
  {
    id: 10,
    title: "Legacy Thinking",
    subtitle: "Live as the man your future self will respect",
    duration: "9 min",
    category: "Purpose",
    content: "Write a letter from your 80-year-old self to the man you are today. What does he want you to stop doing? What does he want you to start? Read it weekly. Make decisions from that future perspective."
  }
];

export default function MasterClassesLibrary() {
  const [selectedClass, setSelectedClass] = useState<MasterClass | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/dashboard" className="text-sm text-[#a1a1aa] hover:text-white flex items-center gap-2">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-semibold tracking-tight mt-2">Mini Master Classes</h1>
            <p className="text-[#a1a1aa] mt-1">10 powerful, no-fluff lessons. 5–15 minutes each. Read. Apply. Transform.</p>
          </div>
          <div className="text-xs text-[#C5A26F] tracking-widest hidden md:block">FOR MEN ONLY</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {masterClasses.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className="group border border-white/10 bg-[#121212] hover:border-[#C5A26F]/40 rounded-2xl p-6 cursor-pointer transition-all flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-[2px] text-[#C5A26F] font-medium">{cls.category.toUpperCase()}</span>
                <div className="flex items-center gap-1 text-xs text-[#666]">
                  <Clock className="w-3 h-3" /> {cls.duration}
                </div>
              </div>
              <h3 className="font-semibold text-xl tracking-tight group-hover:text-[#C5A26F] transition-colors mb-2">
                {cls.title}
              </h3>
              <p className="text-sm text-[#a1a1aa] line-clamp-2 flex-1">{cls.subtitle}</p>
              <div className="mt-6 text-xs text-[#C5A26F] flex items-center gap-1 group-hover:gap-2 transition-all">
                Read lesson <span>→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-[#555]">
          Complete classes to raise your Legend Score. Content is private and for your eyes only.
        </div>
      </div>

      {/* Modal / Lesson Viewer */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-50" onClick={() => setSelectedClass(null)}>
          <div 
            className="bg-[#121212] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-auto p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedClass(null)} 
              className="absolute top-6 right-6 text-[#666] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs tracking-[2px] text-[#C5A26F]">{selectedClass.category.toUpperCase()} • {selectedClass.duration}</span>
              <h2 className="text-3xl font-semibold tracking-tight mt-2">{selectedClass.title}</h2>
              <p className="text-[#a1a1aa] mt-1">{selectedClass.subtitle}</p>
            </div>

            <div className="prose prose-invert text-[#d1d5db] leading-relaxed whitespace-pre-line text-[15px]">
              {selectedClass.content}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
              <div className="text-[#666]">Mark as complete to increase your Legend Score</div>
              <Button onClick={() => {
                alert("Class marked complete. +4 to Legend Score (demo).");
                setSelectedClass(null);
              }}>
                Mark Complete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
