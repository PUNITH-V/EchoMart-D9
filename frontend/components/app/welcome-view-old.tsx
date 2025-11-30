'use client';

import { Button } from '@/components/livekit/button';
import React from 'react';

function ShoppingBagIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-6"
    >
      <path
        d="M12 20L16 52H48L52 20H12Z"
        stroke="#4f46e5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#e0e7ff"
      />
      <path
        d="M22 20V16C22 13.7909 23.7909 12 26 12H38C40.2091 12 42 13.7909 42 16V20"
        stroke="#4f46e5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 28V32M36 28V32"
        stroke="#4f46e5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const [trolleyActive, setTrolleyActive] = React.useState(false);

  const categories = [
    { name: 'Mugs', emoji: '☕' },
    { name: 'T-Shirts', emoji: '👕' },
    { name: 'Hoodies', emoji: '🧥' },
    { name: 'Caps', emoji: '🧢' },
    { name: 'Bags', emoji: '🎒' },
  ];

  const steps = [
    {
      title: 'Speak your request',
      description: "Tell me what you're looking for - 'show me hoodies' or 'I want a black cap'.",
    },
    {
      title: 'Browse with voice',
      description: "I'll show you products and help you find exactly what you need.",
    },
    {
      title: 'Place your order',
      description: "Say which item you want and I'll add it to your cart instantly.",
    },
  ];

  const productChips = [
    { name: 'Hoodie', color: 'bg-indigo-400' },
    { name: 'Cap', color: 'bg-blue-400' },
    { name: 'Mug', color: 'bg-purple-400' },
  ];

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-slate-400 via-slate-300 to-slate-200 relative overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-pink-200/20 rounded-full blur-2xl" />
      </div>

      {/* Background Animated Trolleys */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {/* Small trolley 1 */}
        <div className="absolute top-32 animate-trolleyBg1">
          <svg width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 80 L60 120 L140 120 L150 80 Z" fill="#6366f1" />
            <circle cx="75" cy="140" r="12" fill="#4f46e5" />
            <circle cx="125" cy="140" r="12" fill="#4f46e5" />
          </svg>
        </div>
        
        {/* Small trolley 2 */}
        <div className="absolute top-64 animate-trolleyBg2">
          <svg width="35" height="35" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 80 L60 120 L140 120 L150 80 Z" fill="#8b5cf6" />
            <circle cx="75" cy="140" r="12" fill="#7c3aed" />
            <circle cx="125" cy="140" r="12" fill="#7c3aed" />
          </svg>
        </div>
        
        {/* Small trolley 3 */}
        <div className="absolute bottom-40 animate-trolleyBg3">
          <svg width="38" height="38" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 80 L60 120 L140 120 L150 80 Z" fill="#3b82f6" />
            <circle cx="75" cy="140" r="12" fill="#2563eb" />
            <circle cx="125" cy="140" r="12" fill="#2563eb" />
          </svg>
        </div>
      </div>

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-6 animate-fadeSlideDown relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
              <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L16 52H48L52 20H12Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 20V16C22 13.7909 23.7909 12 26 12H38C40.2091 12 42 13.7909 42 16V20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">EchoMart</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#1e293b" strokeWidth="2"/>
                <path d="M12 8V12L15 15" stroke="#1e293b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - Card Layout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-12 relative z-10">
        <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-white/50">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="animate-fadeSlideUp">
              <div className="inline-block mb-6">
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
                  🎙️ Voice-Powered Shopping
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Sequoia Inspiring
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Voice Shop.
                </span>
              </h1>

              <div className="flex items-start gap-4 mb-8">
                <div className="text-6xl font-bold text-slate-200">01</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Clear Sounds</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Making your dream shopping come true with Voice Commands!
                  </p>
                </div>
              </div>

            {/* Primary Action */}
            <div className="mb-6">
              <Button
                variant="primary"
                size="lg"
                onClick={onStartCall}
                onMouseEnter={() => setTrolleyActive(true)}
                onMouseLeave={() => setTrolleyActive(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-150 ease-out"
              >
                {startButtonText}
              </Button>
              <p className="text-xs text-slate-400 mt-3">
                or say <span className="text-slate-600">"Show me hoodies under 1000"</span>
              </p>
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((category, index) => (
                <span
                  key={category.name}
                  className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 hover:-translate-y-px hover:shadow-sm hover:scale-105 transition-all duration-150 cursor-pointer animate-fadeSlideUp"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  <span className="inline-block transition-transform duration-200 hover:scale-125">{category.emoji}</span> {category.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Animated Loaded Trolley */}
          <div className="flex items-center justify-center animate-trolleyFadeIn">
            <div 
              className={`relative transition-all duration-300 ${trolleyActive ? 'translate-x-3 scale-105' : ''}`}
              style={{ willChange: 'transform' }}
            >
              {/* Loaded Shopping Trolley SVG */}
              <svg
                width="340"
                height="340"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-trolleyShopping"
              >
                {/* Items in cart - stacked boxes */}
                <g className="animate-itemBounce" style={{ transformOrigin: '100px 60px' }}>
                  {/* Box 1 - Hoodie */}
                  <rect x="70" y="40" width="35" height="30" rx="4" fill="#6366f1" opacity="0.9" />
                  <rect x="72" y="42" width="31" height="4" fill="#4f46e5" />
                  
                  {/* Box 2 - Cap */}
                  <rect x="108" y="45" width="30" height="25" rx="4" fill="#3b82f6" opacity="0.9" />
                  <rect x="110" y="47" width="26" height="3" fill="#2563eb" />
                  
                  {/* Box 3 - Mug */}
                  <rect x="85" y="25" width="28" height="22" rx="4" fill="#8b5cf6" opacity="0.9" />
                  <circle cx="99" cy="36" r="3" fill="#7c3aed" />
                </g>

                {/* Shopping Cart Body */}
                <path
                  d="M50 80 L60 120 L140 120 L150 80 Z"
                  fill="#6366f1"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                
                {/* Cart Grid Pattern */}
                <line x1="70" y1="85" x2="65" y2="115" stroke="#4f46e5" strokeWidth="2" />
                <line x1="90" y1="85" x2="85" y2="115" stroke="#4f46e5" strokeWidth="2" />
                <line x1="110" y1="85" x2="105" y2="115" stroke="#4f46e5" strokeWidth="2" />
                <line x1="130" y1="85" x2="125" y2="115" stroke="#4f46e5" strokeWidth="2" />
                
                {/* Cart Handle */}
                <path
                  d="M150 80 L155 60 L160 50"
                  stroke="#4f46e5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="160" cy="50" r="6" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" />

                {/* Wheels */}
                <g className="animate-wheelSpin" style={{ transformOrigin: '75px 140px' }}>
                  <circle cx="75" cy="140" r="12" fill="#1e293b" />
                  <circle cx="75" cy="140" r="8" fill="#475569" />
                  <circle cx="75" cy="140" r="4" fill="#cbd5e1" />
                </g>
                
                <g className="animate-wheelSpin" style={{ transformOrigin: '125px 140px' }}>
                  <circle cx="125" cy="140" r="12" fill="#1e293b" />
                  <circle cx="125" cy="140" r="8" fill="#475569" />
                  <circle cx="125" cy="140" r="4" fill="#cbd5e1" />
                </g>

                {/* Motion lines */}
                <g className="animate-motionLines" opacity="0.4">
                  <line x1="20" y1="100" x2="35" y2="100" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="110" x2="30" y2="110" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                  <line x1="25" y1="120" x2="40" y2="120" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>

              {/* Product Labels */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {productChips.map((chip, index) => (
                  <div
                    key={chip.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[10px] font-medium shadow-sm animate-floatChip"
                    style={{ 
                      animationDelay: `${index * 0.3}s`,
                      willChange: 'transform'
                    }}
                  >
                    <div className={`w-2 h-2 rounded-sm ${chip.color}`} />
                    <span>{chip.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 lg:px-8 pb-20 border-t border-slate-200 pt-16">
        <h2 className="text-xl lg:text-2xl font-semibold text-slate-900 text-center mb-8">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              style={{ 
                animation: 'fadeSlideUp 0.5s ease-out forwards',
                animationDelay: `${index * 100}ms`,
                opacity: 0
              }}
            >
              <div className="w-7 h-7 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full flex items-center justify-center mb-3">
                {index + 1}
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-400">
        <p>
          Powered by{' '}
          <a href="#" className="text-indigo-500 hover:text-indigo-600 transition-colors">
            EchoMart
          </a>
        </p>
      </footer>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes trolleyFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes trolleyShopping {
          0% {
            transform: translateX(-15px) translateY(0px);
          }
          25% {
            transform: translateX(-5px) translateY(-2px);
          }
          50% {
            transform: translateX(5px) translateY(0px);
          }
          75% {
            transform: translateX(15px) translateY(-2px);
          }
          100% {
            transform: translateX(-15px) translateY(0px);
          }
        }

        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes itemBounce {
          0%, 100% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-2px);
          }
          50% {
            transform: translateY(0px);
          }
          75% {
            transform: translateY(-2px);
          }
        }

        @keyframes motionLines {
          0% {
            opacity: 0;
            transform: translateX(0px);
          }
          50% {
            opacity: 0.5;
            transform: translateX(-8px);
          }
          100% {
            opacity: 0;
            transform: translateX(-15px);
          }
        }

        @keyframes floatChip {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes trolleyBg1 {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }

        @keyframes trolleyBg2 {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }

        @keyframes trolleyBg3 {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }

        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeSlideDown {
          animation: fadeSlideDown 0.5s ease-out forwards;
        }

        .animate-iconPulse {
          animation: iconPulse 3s ease-in-out infinite;
        }

        .animate-trolleyBg1 {
          animation: trolleyBg1 20s linear infinite;
        }

        .animate-trolleyBg2 {
          animation: trolleyBg2 25s linear infinite 5s;
        }

        .animate-trolleyBg3 {
          animation: trolleyBg3 22s linear infinite 10s;
        }

        .animate-trolleyFadeIn {
          animation: trolleyFadeIn 0.5s ease-out forwards;
        }

        .animate-trolleyShopping {
          animation: trolleyShopping 5s ease-in-out infinite;
        }

        .animate-wheelSpin {
          animation: wheelSpin 1.5s linear infinite;
        }

        .animate-itemBounce {
          animation: itemBounce 1.5s ease-in-out infinite;
        }

        .animate-motionLines {
          animation: motionLines 1.2s ease-out infinite;
        }

        .animate-floatChip {
          animation: floatChip 2.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-trolleyShopping,
          .animate-wheelSpin,
          .animate-itemBounce,
          .animate-motionLines,
          .animate-floatChip {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
