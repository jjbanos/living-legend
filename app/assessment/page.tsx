'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const questions = [
  {
    id: 1,
    text: "How confident do you feel in your own abilities and judgment?",
    category: "Confidence",
  },
  {
    id: 2,
    text: "How often do you compare yourself unfavorably to other men?",
    category: "Insecurity",
  },
  {
    id: 3,
    text: "When you fail or make a mistake, how quickly do you recover your self-belief?",
    category: "Confidence",
  },
  {
    id: 4,
    text: "How frequently do you experience anxiety about your performance or status?",
    category: "Anxiety",
  },
  {
    id: 5,
    text: "How much does your ego prevent you from asking for help or admitting when you're wrong?",
    category: "Ego",
  },
  {
    id: 6,
    text: "When someone criticizes you, how emotionally reactive do you become?",
    category: "Emotional Reactivity",
  },
  {
    id: 7,
    text: "How fulfilling and connected do you feel in your intimate relationships?",
    category: "Relationships",
  },
  {
    id: 8,
    text: "How confident and present are you during moments of attraction, flirting, or sexual intimacy?",
    category: "Seduction",
  },
  {
    id: 9,
    text: "How clear and motivating is your sense of purpose or mission right now?",
    category: "Purpose",
  },
  {
    id: 10,
    text: "How steady and vital is your physical and mental energy throughout most days?",
    category: "Energy",
  },
  {
    id: 11,
    text: "How often do you feel fully here right now?",
    category: "Presence",
  },
];

const scaleLabels = [
  "Rarely / Very Low",
  "Occasionally / Low",
  "Sometimes / Moderate",
  "Often / High",
  "Almost Always / Very High",
];

interface Snapshot {
  score: number;
  strengths: string[];
  shadows: string[];
  protocol: string[];
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(11).fill(0));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentAnswer = answers[currentStep];

  const selectAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    // Auto-advance after short delay for better UX
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 250);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateSnapshot = (ans: number[]): Snapshot => {
    const avg = ans.reduce((a, b) => a + b, 0) / ans.length;
    const score = Math.round(avg * 20);

    // Category scores (average)
    const confidence = (ans[0] + ans[1] + ans[2]) / 3;
    const emotional = (ans[3] + ans[4] + ans[5]) / 3;
    const relationships = (ans[6] + ans[7]) / 2;
    const purposeEnergy = (ans[8] + ans[9]) / 2;
    const presence = ans[10];

    const categories = [
      { name: "Confidence", score: confidence },
      { name: "Emotional Mastery", score: emotional },
      { name: "Relationships & Seduction", score: relationships },
      { name: "Purpose & Energy", score: purposeEnergy },
      { name: "Presence", score: presence },
    ];

    const strengths = categories
      .filter((c) => c.score >= 4)
      .map((c) => c.name);

    const shadows = categories
      .filter((c) => c.score <= 2.5)
      .map((c) => c.name);

    // Build personalized starter protocol
    const protocol: string[] = [
      "Start each morning with 5 minutes of box breathing to anchor your presence.",
      "Write one honest Shadow Win in your journal every evening.",
    ];

    if (shadows.includes("Confidence") || shadows.includes("Emotional Mastery")) {
      protocol.push("Practice the 3-second rule: when you feel hesitation or reactivity, count to three before acting or speaking.");
    }
    if (shadows.includes("Relationships & Seduction")) {
      protocol.push("Initiate one meaningful conversation or moment of physical connection with your partner (or practice eye contact with strangers) daily.");
    }
    if (shadows.includes("Purpose & Energy")) {
      protocol.push("Define your top 3 non-negotiables for the day and move your body for at least 20 minutes, no matter what.");
    }
    if (shadows.includes("Presence")) {
      protocol.push("Set 3 phone reminders throughout the day that simply say: \"Where are you right now?\"");
    }

    // Ensure at least 3-4 items
    if (protocol.length < 4) {
      protocol.push("End the day by naming three things you did well.");
    }

    return {
      score,
      strengths: strengths.length > 0 ? strengths : ["Self-awareness (you showed up and took the assessment)"],
      shadows: shadows.length > 0 ? shadows : ["None identified — you're operating at a high level"],
      protocol: protocol.slice(0, 5),
    };
  };

  const handleSubmit = () => {
    if (answers.some((a) => a === 0)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const newSnapshot = calculateSnapshot(answers);
    setSnapshot(newSnapshot);
    setIsSubmitted(true);
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers(Array(11).fill(0));
    setIsSubmitted(false);
    setSnapshot(null);
  };

  if (isSubmitted && snapshot) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <Button variant="outline" size="sm" onClick={resetAssessment}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
          </div>

          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1 rounded-full bg-[#C5A26F]/10 text-[#C5A26F] text-xs tracking-[2px] mb-4">
              PRIVATE RESULTS
            </div>
            <h1 className="text-5xl font-semibold tracking-[-1.5px] mb-3">Your Legend Snapshot</h1>
            <p className="text-[#a1a1aa]">This is for you alone. Use it as a mirror, not a judgment.</p>
          </div>

          {/* Score */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-10 text-center mb-8">
            <div className="text-sm text-[#a1a1aa] tracking-widest mb-2">YOUR LEGEND SCORE</div>
            <div className="text-[92px] font-bold leading-none text-[#C5A26F] tabular-nums mb-2">
              {snapshot.score}
            </div>
            <div className="text-[#a1a1aa]">out of 100</div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-xl tracking-tight">Strengths</h3>
              </div>
              <ul className="space-y-3 text-[#d1d5db]">
                {snapshot.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shadows */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <RotateCcw className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-semibold text-xl tracking-tight">Shadows</h3>
              </div>
              <ul className="space-y-3 text-[#d1d5db]">
                {snapshot.shadows.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Starter Protocol */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 mb-8">
            <h3 className="font-semibold text-xl tracking-tight mb-2">Recommended Starter Protocol</h3>
            <p className="text-[#a1a1aa] mb-6">Begin with these practices for the next 7 days. Small, consistent actions create legends.</p>
            
            <ol className="space-y-4">
              {snapshot.protocol.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C5A26F] text-black flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-[#d1d5db] leading-relaxed">{item}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={resetAssessment} variant="outline" size="lg">
              Retake Assessment
            </Button>
            <Link href="/dashboard">
              <Button size="lg">
                View in Dashboard
              </Button>
            </Link>
          </div>

          <p className="text-center text-xs text-[#666] mt-10">
            Your answers are private and only visible to you. Revisit this assessment monthly to track your growth.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="text-sm text-[#C5A26F] font-mono tracking-widest">
            QUESTION {currentStep + 1} OF {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-[#C5A26F] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#666] mt-2">
            <div>START</div>
            <div>COMPLETE</div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 md:p-10 mb-8">
          <div className="text-xs uppercase tracking-[2px] text-[#C5A26F] mb-3">
            {currentQuestion.category.toUpperCase()}
          </div>
          
          <h2 className="text-3xl font-semibold tracking-tight leading-tight mb-10">
            {currentQuestion.text}
          </h2>

          {/* Scale Options */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => selectAnswer(value)}
                className={`w-full flex items-center justify-between px-6 py-5 rounded-xl border text-left transition-all group ${
                  currentAnswer === value
                    ? "border-[#C5A26F] bg-[#C5A26F]/10"
                    : "border-white/10 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-semibold transition-colors ${
                      currentAnswer === value
                        ? "bg-[#C5A26F] text-black"
                        : "bg-white/5 text-[#a1a1aa] group-hover:bg-white/10"
                    }`}
                  >
                    {value}
                  </div>
                  <span className="text-lg">{scaleLabels[value - 1]}</span>
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-all ${
                    currentAnswer === value ? "text-[#C5A26F]" : "text-[#666] group-hover:translate-x-0.5"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex justify-between text-xs text-[#666] mt-6 px-1">
            <div>1 — Rarely / Very Low</div>
            <div>5 — Almost Always / Very High</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={currentStep === 0}
            className="border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {currentStep === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={currentAnswer === 0}
              className="px-10"
            >
              Submit Assessment
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(Math.min(questions.length - 1, currentStep + 1))}
              disabled={currentAnswer === 0}
              className="px-8"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        <p className="text-center text-xs text-[#555] mt-8 max-w-xs mx-auto">
          Answer honestly. There are no wrong answers — only useful data for your growth.
        </p>
      </div>
    </div>
  );
}
