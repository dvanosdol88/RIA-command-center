import React, { useState } from 'react';
import { VendorResult, WeightState } from '../types';
import { NARRATIVES } from '../constants';
import { Check, X, Award, ChevronRight } from 'lucide-react';

interface VendorCardsProps {
  results: VendorResult[];
  weights?: WeightState;
  onSelectVendor: (vendor: VendorResult) => void;
}

const VendorCards: React.FC<VendorCardsProps> = ({ results, weights, onSelectVendor }) => {
  return (
    <div className="p-6 overflow-y-auto h-full pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {results.map((vendor, index) => {
          const narrative = NARRATIVES[vendor.name];
          const isWinner = index === 0;
          
          return (
            <div 
              key={vendor.name}
              onClick={() => onSelectVendor(vendor)}
              className={`bg-slate-800 border rounded-lg p-6 flex flex-col h-full relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
                isWinner 
                  ? 'border-emerald-500 shadow-lg shadow-emerald-900/20' 
                  : 'border-slate-700 hover:border-blue-500'
              }`}
            >
              {isWinner ? (
                <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Award size={12} /> #1 CHOICE
                </div>
              ) : (
                <div className="absolute top-4 right-4 bg-slate-700 text-slate-400 text-[10px] font-bold px-2 py-1 rounded">
                  #{index + 1}
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{vendor.name}</h3>
              <div className="text-2xl font-bold text-blue-400 mb-4">
                {vendor.finalScore} <span className="text-xs text-slate-500 font-normal">/ 10</span>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="text-[10px] uppercase text-emerald-500 font-bold mb-2">Strengths</div>
                  <ul className="space-y-1">
                    {narrative.pros.slice(0, 3).map((p, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <Check size={12} className="text-emerald-500 mt-0.5 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-rose-500 font-bold mb-2">Weaknesses</div>
                  <ul className="space-y-1">
                    {narrative.cons.slice(0, 2).map((c, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                         <X size={12} className="text-rose-500 mt-0.5 shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-end">
                <div>
                    <div className="text-[10px] uppercase text-blue-500 font-bold mb-1">Best For</div>
                    <div className="text-xs text-slate-300 italic leading-relaxed line-clamp-2">
                    {narrative.bestFor}
                    </div>
                </div>
                <div className="bg-slate-900 p-2 rounded-full text-slate-500 group-hover:text-white group-hover:bg-blue-600 transition">
                    <ChevronRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorCards;
