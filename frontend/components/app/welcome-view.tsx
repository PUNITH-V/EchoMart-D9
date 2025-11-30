'use client';

import { Button } from '@/components/livekit/button';
import React from 'react';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  const products = [
    { name: 'Hoodies', color: 'bg-amber-600', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' },
    { name: 'T-Shirts', color: 'bg-cyan-600', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
    { name: 'Caps', color: 'bg-rose-600', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop' },
    { name: 'Mugs', color: 'bg-emerald-600', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop' },
    { name: 'Bags', color: 'bg-violet-600', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' },
  ];

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-x-hidden overflow-y-auto"
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
      }}
    >
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-violet-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 pb-20 relative z-10">
        {/* Premium Header */}
        <div className="flex items-center justify-between mb-12 animate-fadeSlideDown">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <span className="text-2xl font-bold text-white tracking-tight">E</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>EchoMart</span>
              <p className="text-xs text-slate-400 tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Voice Commerce</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/70 group-hover:text-white transition-colors">
                <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 11H19L20 21H4L5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/70 group-hover:text-white transition-colors">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Ryman Alex</span>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg" />
            </div>
          </div>
        </div>

        {/* Hero Section with Light Content Area */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-8">
          {/* Left - Main Hero */}
          <div className="bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border border-white/10 animate-fadeSlideUp relative overflow-hidden">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            
            <div className="relative z-10">
              <div className="mb-8">
                <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full inline-flex items-center gap-2 border border-amber-500/20" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  PREMIUM VOICE COMMERCE
                </span>
              </div>

              <h1 className="text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Sequoia Inspiring
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
                  Fashion
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed mb-12 max-w-xl" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
                Experience the future of shopping with voice-powered commerce. Browse, select, and purchase premium fashion effortlessly.
              </p>

              <Button
                variant="primary"
                size="lg"
                onClick={onStartCall}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 flex items-center gap-4 group backdrop-blur-sm border border-amber-400/20"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:scale-110 transition-transform">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {startButtonText}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-2 transition-transform">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>

              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>5M+</div>
                  <div className="text-xs text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>Active Users</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>4.9</div>
                  <div className="text-xs text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>Rating</div>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>24/7</div>
                  <div className="text-xs text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Cards */}
          {/* Right - Featured Product with Lifestyle Image */}
          <div className="bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden animate-fadeSlideUp group cursor-pointer hover-lift" style={{ animationDelay: '100ms' }}>
            <div className="relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop&q=80"
                alt="Premium Fashion"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30" style={{ fontFamily: 'Inter, sans-serif' }}>NEW ARRIVAL</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Premium Collection</h3>
                <p className="text-slate-300 text-sm mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Luxury streetwear essentials</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>₹1,499</span>
                  <button className="w-12 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 flex items-center justify-center transition-all shadow-lg shadow-amber-500/30">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories - Light Theme Cards */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 animate-fadeSlideUp mt-8" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>Shop by Category</h2>
            <button className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {products.map((product, i) => (
              <div 
                key={i}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover-lift cursor-pointer group animate-fadeSlideUp"
                style={{ animationDelay: `${300 + i * 50}ms` }}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-slate-800 to-slate-900">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{product.name}</h3>
                <p className="text-slate-400 text-xs mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Premium quality</p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${product.color} shadow-lg`} />
                  <span className="text-xs text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>Multiple colors</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="grid grid-cols-3 gap-6 animate-fadeSlideUp mt-8" style={{ animationDelay: '500ms' }}>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover-lift cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Premium Quality</h3>
            <p className="text-slate-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Handpicked luxury items with lifetime warranty</p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover-lift cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Fast Delivery</h3>
            <p className="text-slate-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Express shipping within 24 hours worldwide</p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover-lift cursor-pointer">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/30">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Secure Payment</h3>
            <p className="text-slate-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>100% secure transactions with encryption</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-30px, 30px) scale(1.1);
          }
          66% {
            transform: translate(20px, -20px) scale(0.9);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fadeSlideDown {
          animation: fadeSlideDown 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hover-lift:hover {
          transform: translateY(-8px) translateZ(20px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800;900&display=swap');
      `}</style>
    </div>
  );
};
