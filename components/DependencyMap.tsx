import React from 'react';

// A simple component to render the hierarchical tree
const Node = ({ label, subLabel, accent, type }: { label: string, subLabel?: string, accent?: boolean, type?: 'up' | 'down' | 'neutral' }) => {
    let borderClass = 'border-slate-600';
    let textClass = 'text-slate-200';
    let subTextClass = 'text-slate-500';
    
    if (accent) {
        borderClass = 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]';
        textClass = 'text-white font-bold';
    }
    
    let leftBorder = '';
    if (type === 'up') leftBorder = 'border-l-[3px] border-l-yellow-500';
    if (type === 'down') leftBorder = 'border-l-[3px] border-l-emerald-500';
    if (type === 'neutral') leftBorder = 'border-l-[3px] border-l-purple-500';

    return (
        <div className={`bg-slate-800 border ${borderClass} rounded p-3 min-w-[140px] text-center relative z-10 transition-transform hover:scale-105 ${leftBorder}`}>
            <div className={`text-sm ${textClass}`}>{label}</div>
            {subLabel && <div className={`text-[10px] mt-1 ${subTextClass}`}>{subLabel}</div>}
        </div>
    );
};

const Connector = ({ vertical = false }) => (
    <div className={`bg-slate-600 absolute ${vertical ? 'w-px h-8 left-1/2 -top-4' : 'h-px w-full top-0 left-0'}`}></div>
);

const DependencyMap: React.FC = () => {
  return (
    <div className="h-full w-full overflow-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-950 flex items-center justify-center p-12">
        <div className="flex flex-col items-center space-y-12 scale-90 md:scale-100">
            
            {/* Level 1: Core */}
            <div className="relative">
                <Node label="Vendor Matrix" subLabel="Core Artifact" accent />
                <div className="absolute w-px h-12 bg-slate-600 left-1/2 top-full"></div>
            </div>

            {/* Level 2: Categories */}
            <div className="flex gap-16 relative pt-8">
                 {/* Horizontal Line connecting children */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px border-t border-slate-600"></div>
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-600 -mt-8"></div>

                 {/* Group 1: Upstream */}
                 <div className="flex flex-col items-center relative">
                    <div className="absolute w-px h-8 bg-slate-600 bottom-full left-1/2"></div>
                    <Node label="Upstream Inputs" type="up" />
                    
                    <div className="flex gap-4 mt-8 relative pt-6">
                        <div className="absolute top-0 left-4 right-4 h-px border-t border-slate-600"></div>
                        <div className="absolute top-0 left-1/2 w-px h-6 bg-slate-600"></div>
                        
                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-600"></div>
                            <Node label="Compliance Reqs" subLabel="Master Doc §3" />
                        </div>
                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-600"></div>
                            <Node label="Client Exp." subLabel="Planning Doc §2" />
                        </div>
                    </div>
                 </div>

                 {/* Group 2: Downstream */}
                 <div className="flex flex-col items-center relative">
                    <div className="absolute w-px h-8 bg-slate-600 bottom-full left-1/2"></div>
                    <Node label="Downstream Outputs" type="down" />

                    <div className="flex gap-4 mt-8 relative pt-6">
                        <div className="absolute top-0 left-4 right-4 h-px border-t border-slate-600"></div>
                        <div className="absolute top-0 left-1/2 w-px h-6 bg-slate-600"></div>
                        
                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-600"></div>
                            <Node label="Vendor Log" subLabel="Audit Ready" />
                        </div>
                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-600"></div>
                            <Node label="Platform Roadmap" subLabel="CX Architecture" />
                        </div>
                    </div>
                 </div>

                 {/* Group 3: Cross */}
                 <div className="flex flex-col items-center relative">
                    <div className="absolute w-px h-8 bg-slate-600 bottom-full left-1/2"></div>
                    <Node label="Cross-Functional" type="neutral" />
                    
                    <div className="flex gap-4 mt-8 relative pt-6">
                        <div className="absolute top-0 left-4 right-4 h-px border-t border-slate-600"></div>
                        <div className="absolute top-0 left-1/2 w-px h-6 bg-slate-600"></div>

                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-600"></div>
                            <Node label="Technology" subLabel="API Tooling" />
                        </div>
                    </div>
                 </div>

            </div>
        </div>
    </div>
  );
};

export default DependencyMap;
