import React from 'react';
import { 
  ShieldCheck, Settings, LayoutDashboard, Brain, 
  ArrowRight, Calculator, CheckCircle2, TrendingUp, Users 
} from 'lucide-react';

const ClientJourneyView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto bg-slate-900 text-slate-200 pb-20">
      
      {/* Hero Section */}
      <header className="bg-slate-900 border-b border-slate-700 py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          Your Journey to <span className="text-cyan-400">Smarter, Fairer</span> Financial Advice
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          A Client's Perspective on Our Flat-Fee RIA Model
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        
        {/* Step 1: Understand the Cost */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-emerald-500"></div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-slate-700 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">1</div>
                <h2 className="text-2xl font-bold text-white">Understand the Cost</h2>
              </div>
              <p className="text-slate-300 text-lg">
                Transparent & Predictable Pricing. Stop paying more just because your portfolio grows.
              </p>
              
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-4">
                    <Calculator className="text-emerald-400" />
                    <h3 className="font-bold text-white">Calculate Your Potential Savings</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">See how a flat fee compares to a traditional 1% AUM fee over 20 years.</p>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition shadow-lg shadow-emerald-900/20 w-full md:w-auto">
                    Launch Savings Calculator
                </button>
              </div>
            </div>

            {/* Visual Comparison */}
            <div className="flex-1 bg-slate-900 p-8 rounded-xl border border-slate-800 flex flex-col md:flex-row items-end justify-around gap-8 relative min-h-[300px]">
                
                {/* Traditional Model */}
                <div className="flex flex-col items-center w-full md:w-1/2 group">
                    <div className="text-center mb-4">
                        <div className="text-rose-400 font-bold mb-1">Traditional Model</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">1% AUM Fee</div>
                    </div>
                    <div className="relative w-full h-48 flex items-end justify-center">
                        {/* Pyramid Visual */}
                        <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[160px] border-l-transparent border-r-transparent border-b-rose-600/80 drop-shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all group-hover:scale-105"></div>
                        <div className="absolute top-1/2 text-white font-bold text-xs text-center drop-shadow-md">
                            Fees Grow<br/>With Wealth
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="text-slate-600" size={32} />
                </div>

                {/* Our Model */}
                <div className="flex flex-col items-center w-full md:w-1/2 group">
                    <div className="text-center mb-4">
                        <div className="text-emerald-400 font-bold mb-1">Our Model</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Flat Fee</div>
                    </div>
                    <div className="relative w-full h-48 flex items-end justify-center">
                         {/* Flat Box Visual */}
                         <div className="w-32 h-24 bg-emerald-600/80 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center border border-emerald-400/30 transition-all group-hover:scale-105">
                            <span className="text-white font-bold">~$1,200/yr</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Step 2: Experience the Value */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          
          <div className="text-center mb-12">
             <div className="inline-flex items-center justify-center bg-slate-700 text-white font-bold w-8 h-8 rounded-full mb-4">2</div>
             <h2 className="text-2xl font-bold text-white mb-2">Experience the Value</h2>
             <p className="text-slate-400">High-End, Tech-Enabled Service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition duration-300">
                <ShieldCheck className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-white font-bold mb-2">CFA & CFP® Experts</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Credentialed, fiduciary advice. Your best interests first, no commissions.</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition duration-300">
                <Settings className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Institutional-Grade Process</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Rigorous research and risk management for your portfolio.</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition duration-300">
                <LayoutDashboard className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-white font-bold mb-2">Interactive Planning Tools</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Real-time "what-if" scenarios & collaboration. A financial lab at your fingertips.</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition duration-300">
                <Brain className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-white font-bold mb-2">AI-Assisted Efficiency</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Faster insights and more thorough analysis, enhancing human advice.</p>
            </div>
          </div>
        </section>

        {/* Step 3: Achieve the Outcome */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <div className="flex-1 order-2 md:order-1 relative min-h-[300px] w-full bg-slate-900 rounded-xl border border-slate-800 p-8 flex items-center justify-center">
                 {/* Abstract Road Fork Visualization */}
                 <div className="relative w-full max-w-sm aspect-video">
                    {/* Road */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1/2 bg-slate-700 [clip-path:polygon(20%_0%,80%_0%,100%_100%,0%_100%)]"></div>
                    
                    {/* Fork Left */}
                    <div className="absolute bottom-[50%] left-[30%] w-32 h-20 bg-slate-700 [clip-path:polygon(0%_0%,20%_0%,100%_100%,80%_100%)] origin-bottom-right -rotate-12"></div>
                    
                    {/* Fork Right */}
                    <div className="absolute bottom-[50%] right-[30%] w-32 h-20 bg-slate-700 [clip-path:polygon(80%_0%,100%_0%,20%_100%,0%_100%)] origin-bottom-left rotate-12"></div>

                    {/* Signs */}
                    <div className="absolute top-[20%] left-[15%] bg-indigo-600 text-white text-xs px-2 py-1 rounded shadow-lg animate-pulse">Retirement</div>
                    <div className="absolute top-[20%] right-[15%] bg-cyan-600 text-white text-xs px-2 py-1 rounded shadow-lg animate-pulse animation-delay-500">Goals</div>

                    {/* Person Icon */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-slate-800 rounded-full p-2 border border-slate-600 shadow-xl">
                        <Users size={24} />
                    </div>
                 </div>
            </div>

            <div className="flex-1 order-1 md:order-2 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-slate-700 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">3</div>
                    <h2 className="text-2xl font-bold text-white">Achieve the Outcome</h2>
                </div>
                <h3 className="text-xl text-purple-300 font-light">Clarity & Control Over Your Future</h3>

                <ul className="space-y-6">
                    <li className="flex gap-4">
                        <div className="bg-emerald-900/30 p-2 rounded-full h-fit">
                            <TrendingUp className="text-emerald-400 w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-white block">More Money Working for You</strong>
                            <span className="text-slate-400 text-sm">Keep thousands more invested by avoiding percentage fees.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="bg-blue-900/30 p-2 rounded-full h-fit">
                            <LayoutDashboard className="text-blue-400 w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-white block">Greater Visibility & Control</strong>
                            <span className="text-slate-400 text-sm">Accessible, digestible reports and scenario testing.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="bg-purple-900/30 p-2 rounded-full h-fit">
                            <CheckCircle2 className="text-purple-400 w-5 h-5" />
                        </div>
                        <div>
                            <strong className="text-white block">Peace of Mind</strong>
                            <span className="text-slate-400 text-sm">Trust built on clear, fixed pricing and professional guidance.</span>
                        </div>
                    </li>
                </ul>
            </div>

          </div>
        </section>

        {/* Footer CTA */}
        <div className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-2">Upgrade Your Advice, Lower Your Cost</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

      </main>
    </div>
  );
};

export default ClientJourneyView;
