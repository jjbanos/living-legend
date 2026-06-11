"use client";

import Link from "next/link";
import { Shield, Users, Award, Target, Flame, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LivingLegendHomepage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] dark">
      {/* Premium Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-bold tracking-[-2px] text-2xl">LIVING LEGEND</div>
            <div className="hidden sm:block text-[10px] uppercase tracking-[3px] text-[#C5A26F] mt-1">FOR MEN</div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <Link href="#how" className="text-[#a1a1aa] hover:text-white transition-colors hidden md:block">
              How it works
            </Link>
            <Link href="#pillars" className="text-[#a1a1aa] hover:text-white transition-colors hidden md:block">
              The Pillars
            </Link>
            <Link href="/sign-in" className="text-[#a1a1aa] hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="font-semibold px-5">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dark Navy/Charcoal Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1421] via-[#0F172A] to-[#111827]">
        <div className="absolute inset-0 bg-[radial-gradient(#1F2937_0.8px,transparent_1px)] bg-[length:5px_5px] opacity-40" />
        
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-xs tracking-[1.5px] text-[#a1a1aa]">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> PRIVATE
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> FOR MEN ONLY
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> REAL RESULTS
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-[82px] font-bold tracking-[-4.5px] leading-[0.9] mb-8">
            <span className="text-white">Build the man.</span>
            <br />
            <span className="bg-gradient-to-r from-[#C5A26F] via-[#E8D5A3] to-[#C5A26F] bg-clip-text text-transparent">
              Become the legend.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-[#a1a1aa] mb-12 leading-tight">
            Confidence. Energy. Presence. Relationships.<br /> 
            The daily system that actually works for real men.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button 
                size="lg" 
                className="text-base px-10 h-14 font-semibold shadow-lg shadow-[#C5A26F]/20 hover:shadow-[#C5A26F]/40 transition-all active:scale-[0.985]"
              >
                Start Free 7-Day Challenge
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#how">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 h-14 border-white/20 hover:bg-white/5"
              >
                See how it works
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-xs text-[#64748b] tracking-wide">
            No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* The 7-Day Challenge Teaser */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-b border-white/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 text-[#C5A26F] text-xs tracking-[2px] mb-4">
            <Flame className="w-3.5 h-3.5" /> 7-DAY TRANSFORMATION
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">Start your free 7-day challenge</h2>
          <p className="mt-4 max-w-md mx-auto text-[#a1a1aa]">
            One powerful daily practice. Real accountability. See measurable change in your confidence, energy, and presence.
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="px-12 h-14 text-base font-semibold">
              Begin the Challenge — Free
            </Button>
          </Link>
        </div>
      </section>

      {/* The Four Pillars */}
      <section id="pillars" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-[#C5A26F] text-xs tracking-[3px] mb-3">THE FOUNDATION</div>
          <h2 className="text-4xl font-semibold tracking-[-1px]">Four pillars. One daily system.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Target, 
              title: "Confidence", 
              desc: "Build unshakeable self-trust through consistent action and honest reflection." 
            },
            { 
              icon: Flame, 
              title: "Energy", 
              desc: "Master your body and mind with non-negotiable daily movement and presence practices." 
            },
            { 
              icon: Shield, 
              title: "Presence", 
              desc: "Develop deep masculine presence that commands respect in every room you enter." 
            },
            { 
              icon: Users, 
              title: "Relationships", 
              desc: "Lead with clarity and strength in your partnerships and brotherhood." 
            }
          ].map((pillar, index) => (
            <div 
              key={index} 
              className="group border border-white/10 bg-[#111] hover:bg-[#161616] rounded-2xl p-7 transition-all duration-300"
            >
              <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-[#C5A26F] group-hover:bg-[#C5A26F]/10 transition-colors">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-2xl tracking-tight mb-3">{pillar.title}</h3>
              <p className="text-[#a1a1aa] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="border-y border-white/10 bg-[#111] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[#C5A26F] text-xs tracking-[3px] mb-3">THE METHOD</div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">How Living Legend works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Take the Assessment",
                desc: "Complete our 11-question diagnostic to understand where you truly stand in confidence, energy, presence, and relationships."
              },
              {
                step: "02",
                title: "Daily System",
                desc: "Follow a simple, powerful daily practice: movement, presence work, shadow journaling, and one intentional action."
              },
              {
                step: "03",
                title: "Track & Transform",
                desc: "Watch your Legend Score rise. Build an unbroken streak. Unlock deeper insights and real, lasting change."
              }
            ].map((item, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-0 top-1 font-mono text-5xl font-bold text-[#C5A26F]/20 tracking-tighter">
                  {item.step}
                </div>
                <h3 className="font-semibold text-2xl mb-3 tracking-tight">{item.title}</h3>
                <p className="text-[#a1a1aa] text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-[#C5A26F] text-xs tracking-[3px] mb-6">MEN WHO SHOWED UP</div>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              quote: "This is the first system that actually made me consistent. My wife noticed the difference in 10 days.",
              name: "Marcus T.",
              role: "Entrepreneur, 38"
            },
            {
              quote: "The daily Shadow Win practice changed how I show up at work and at home. I finally feel like the man I want to be.",
              name: "David R.",
              role: "Executive, 42"
            },
            {
              quote: "No fluff. Just real work. The Legend Score keeps me honest. Best investment I've made in myself.",
              name: "James K.",
              role: "Father & Husband, 35"
            }
          ].map((testimonial, index) => (
            <div key={index} className="border-l-2 border-[#C5A26F] pl-6">
              <p className="italic text-[#d1d5db] leading-relaxed">“{testimonial.quote}”</p>
              <div className="mt-6 text-sm">
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-[#64748b]">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-[#111] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-semibold tracking-tighter mb-6">Ready to build the man you were meant to be?</h2>
          <p className="text-xl text-[#a1a1aa] mb-10">Start your free 7-day challenge today. No credit card required.</p>
          
          <Link href="/sign-up">
            <Button size="lg" className="px-14 h-14 text-base font-semibold">
              Start Free 7-Day Challenge
            </Button>
          </Link>
          
          <div className="mt-6 text-xs text-[#64748b]">
            Join thousands of men transforming their lives • Private by design
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Living Legend. For men who refuse to live small.</div>
          <div className="flex gap-6">
            <Link href="/sign-in" className="hover:text-[#a1a1aa]">Log in</Link>
            <Link href="/sign-up" className="hover:text-[#a1a1aa]">Start challenge</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
