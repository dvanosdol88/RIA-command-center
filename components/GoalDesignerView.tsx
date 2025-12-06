import React, { useState, useMemo } from 'react';
import { 
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Cell
} from 'recharts';
import { 
  Target, Umbrella, GraduationCap, Home, Plane, Heart, Anchor, Bot, AlertCircle, CheckCircle2 
} from 'lucide-react';

// --- Types ---
interface Goal {
  id: string;
  name: string;
  icon: any;
  cost: number;
  priority: number;
  active: boolean;
  desc: string;
}

// --- Initial Data ---
const INITIAL_GOALS: Goal[] = [
  { id: 'retire', name: 'Retirement Base', icon: Umbrella, cost: 1500000, priority: 10, active: true, desc: "Essential living expenses age 65+" },
  { id: 'college', name: 'Kids\' College', icon: GraduationCap, cost: 250000, priority: 8, active: false, desc: "4-year state university funding" },
  { id: 'home', name: 'Dream Home Upgrade', icon: Home, cost: 400000, priority: 5, active: false, desc: "Renovation or new purchase in 5 years" },
  { id: 'travel', name: 'Annual World Travel', icon: Plane, cost: 150000, priority: 3, active: false, desc: "$15k/year for 10 years" }, // Adjusted total cost representation for simplicity
  { id: 'wedding', name: 'Luxury Wedding', icon: Heart, cost: 50000, priority: 2, active: false, desc: "Support for children's wedding" },
  { id: 'boat', name: 'Sailing Boat', icon: Anchor, cost: 120000, priority: 1, active: false, desc: "Purchase and maintenance" }
];

const GoalDesignerView: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);

  // --- Actions ---
  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, active: !g.active } : g));
  };

  const updatePriority = (id: string, val: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, priority: val } : g));
  };

  const getPriorityLabel = (val: number) => {
    if (val >= 9) return "Non-Negotiable";
    if (val >= 7) return "High Priority";
    if (val >= 4) return "Nice to Have";
    return "Wishlist";
  };

  // --- Simulation Engine ---
  const simulation = useMemo(() => {
    const baselineAssets = 500000;
    const annualSavings = 25000;
    const years = 30;
    const returnRate = 0.06;

    let assets = baselineAssets;
    const data = [];
    let isSuccess = true;
    let totalGoalCost = 0;

    for (let i = 0; i <= years; i++) {
        const year = 2025 + i;
        // Growth
        assets = assets * (1 + returnRate) + annualSavings;
        
        // Costs
        let yearCost = 0;
        goals.filter(g => g.active).forEach(g => {
            // Simplified distribution logic matches HTML prototype
            if (i > 5 && i < 25) { 
                 const chunk = g.cost / 20; // Spread over 20 years
                 yearCost += chunk;
            }
        });

        assets -= yearCost;
        if (assets < 0) isSuccess = false;
        
        // Floor at 0 for visual
        data.push({
            year,
            assets: Math.max(0, assets),
            spend: yearCost
        });
        
        totalGoalCost += yearCost;
    }

    // Allocation logic
    const activeGoals = goals.filter(g => g.active);
    const needs = activeGoals.filter(g => g.priority >= 7).reduce((a,b) => a + b.cost, 0);
    const wants = activeGoals.filter(g => g.priority >= 4 && g.priority < 7).reduce((a,b) => a + b.cost, 0);
    const dreams = activeGoals.filter(g => g.priority < 4).reduce((a,b) => a + b.cost, 0);
    
    const allocationData = [
        { name: 'Needs', value: needs, fill: '#22d3ee' },
        { name: 'Wants', value: wants, fill: '#818cf8' },
        { name: 'Dreams', value: dreams, fill: '#d946ef' },
    ];

    return { data, isSuccess, finalWealth: data[data.length-1].assets, allocationData };
  }, [goals]);

  // --- AI Insight Logic ---
  const aiFeedback = useMemo(() => {
    const activeGoals = goals.filter(g => g.active);
    const luxuryRisk = activeGoals.find(g => g.cost > 100000 && g.priority < 4);
    
    if (!simulation.isSuccess) {
        return {
            type: 'warning',
            text: "Warning: Projecting a shortfall in year 22. Consider reducing the scope of 'Dream Home' or delaying 'Retirement' by 2 years."
        };
    } 
    if (luxuryRisk) {
        return {
            type: 'insight',
            text: `Observation: '${luxuryRisk.name}' is high cost but marked as '${getPriorityLabel(luxuryRisk.priority)}'. If you remove this, your confidence score jumps to 99%.`
        };
    }
    if (activeGoals.length > 4) {
        return {
            type: 'insight',
            text: "You have many competing goals active. Try prioritizing your top 3 to see the impact on your long-term safety."
        };
    }
    return null;
  }, [goals, simulation.isSuccess]);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
        
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 py-4 px-6 flex justify-between items-center shrink-0 shadow-md z-10">
            <div className="flex items-center space-x-3">
                <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                    <Target className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        Goal Designer 
                        <span className="text-[10px] align-top bg-purple-600 text-white px-1.5 py-0.5 rounded font-bold tracking-wider">BETA</span>
                    </h1>
                    <p className="text-xs text-slate-400">Drag, Drop & Prioritize your Life Events</p>
                </div>
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
                <div className="text-right">
                    <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Projected Success</div>
                    <div className={`font-bold text-2xl ${simulation.isSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {simulation.isSuccess ? '92%' : '45%'}
                    </div>
                </div>
                <div className="text-right border-l border-slate-700 pl-8">
                    <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Monthly Shortfall</div>
                    <div className={`font-bold text-2xl ${simulation.isSuccess ? 'text-slate-200' : 'text-rose-400'}`}>
                        {simulation.isSuccess ? '$0' : '-$1,200'}
                    </div>
                </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
            
            {/* Left Panel: Goal List */}
            <div className="w-1/3 bg-slate-800/50 border-r border-slate-700 flex flex-col min-w-[320px]">
                <div className="p-4 border-b border-slate-700 bg-slate-800/80 backdrop-blur z-10">
                    <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">1. Select Life Goals</h2>
                    <p className="text-[10px] text-slate-400">Click to activate. Adjust priority sliders to impact the plan.</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {goals.map(goal => (
                        <div 
                            key={goal.id}
                            className={`
                                relative border rounded-lg p-4 transition-all duration-200 
                                ${goal.active 
                                    ? 'bg-cyan-900/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                                }
                            `}
                        >
                            <div 
                                className="flex items-start justify-between cursor-pointer group"
                                onClick={() => toggleGoal(goal.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`
                                        w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                                        ${goal.active ? 'bg-cyan-900/30 text-cyan-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}
                                    `}>
                                        <goal.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-sm ${goal.active ? 'text-white' : 'text-slate-300'}`}>{goal.name}</h3>
                                        <div className="text-xs text-slate-500 font-mono">${goal.cost.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className={`
                                    w-5 h-5 rounded-full border flex items-center justify-center transition-all
                                    ${goal.active ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600 group-hover:border-slate-400'}
                                `}>
                                    {goal.active && <CheckCircle2 size={12} className="text-slate-900" />}
                                </div>
                            </div>
                            
                            {goal.active && (
                                <div className="mt-4 pt-3 border-t border-slate-700/50 animate-fade-in">
                                    <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                                        <span>Priority: <span className="text-cyan-300 font-bold uppercase">{getPriorityLabel(goal.priority)}</span></span>
                                        <span>{goal.priority}/10</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="10" 
                                        value={goal.priority}
                                        onChange={(e) => updatePriority(goal.id, parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Analysis */}
            <div className="w-2/3 bg-slate-900 flex flex-col p-6 overflow-y-auto">
                
                {/* AI & Header */}
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 min-h-[80px]">
                    <div>
                        <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">2. Trade-Off Analysis</h2>
                        <div className="text-slate-200 text-lg font-light flex items-center gap-2">
                            Current Projection: 
                            <span className={`font-medium ${simulation.isSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {simulation.isSuccess ? 'On Track' : 'At Risk'}
                            </span>
                        </div>
                    </div>
                    
                    {/* AI Feedback Box */}
                    {aiFeedback && (
                        <div className={`
                            flex items-start gap-3 p-3 rounded-lg max-w-md animate-fade-in border
                            ${aiFeedback.type === 'warning' 
                                ? 'bg-rose-900/10 border-rose-500/30' 
                                : 'bg-indigo-900/20 border-indigo-500/30'}
                        `}>
                            {aiFeedback.type === 'warning' 
                                ? <AlertCircle className="text-rose-400 mt-0.5 shrink-0" size={16} /> 
                                : <Bot className="text-indigo-400 mt-0.5 shrink-0" size={16} />
                            }
                            <div>
                                <div className={`text-[10px] font-bold uppercase mb-0.5 ${
                                    aiFeedback.type === 'warning' ? 'text-rose-300' : 'text-indigo-300'
                                }`}>
                                    AI Insight
                                </div>
                                <p className={`text-xs italic leading-relaxed ${
                                    aiFeedback.type === 'warning' ? 'text-rose-100' : 'text-indigo-100'
                                }`}>
                                    {aiFeedback.text}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Chart */}
                <div className="bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700 mb-6 flex-1 min-h-[300px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-semibold text-sm">Wealth Projection vs. Goal Costs</h3>
                        <div className="flex space-x-4 text-xs">
                            <div className="flex items-center"><span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 shadow-[0_0_8px_#22d3ee]"></span>Portfolio Assets</div>
                            <div className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Goal Spending</div>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={simulation.data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis 
                                    dataKey="year" 
                                    stroke="#64748b" 
                                    fontSize={10} 
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis 
                                    stroke="#64748b" 
                                    fontSize={10} 
                                    tickFormatter={(val) => `$${val/1000}k`} 
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <RechartsTooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', fontSize: '12px' }}
                                    formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="assets" 
                                    stroke="#22d3ee" 
                                    strokeWidth={3}
                                    fill="url(#colorAssets)" 
                                />
                                <Bar dataKey="spend" fill="#d946ef" barSize={8} radius={[4, 4, 0, 0]} />
                                <defs>
                                    <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Allocation Chart */}
                <div className="bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700 min-h-[200px] flex flex-col">
                    <h3 className="text-white font-semibold text-sm mb-4">Funding Allocation by Priority</h3>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={simulation.allocationData} margin={{ left: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    stroke="#94a3b8" 
                                    fontSize={11} 
                                    width={60} 
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <RechartsTooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', fontSize: '12px' }}
                                    formatter={(val: number) => [`$${val.toLocaleString()}`, 'Allocated']}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                    {simulation.allocationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </main>
    </div>
  );
};

export default GoalDesignerView;
