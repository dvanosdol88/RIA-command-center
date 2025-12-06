import React from 'react';
import { CATEGORIES, VENDORS } from '../constants';
import { Download } from 'lucide-react';

const Matrix: React.FC = () => {
  const downloadCSV = () => {
    let csv = "Vendor," + CATEGORIES.map(c => c.name).join(",") + "\n";
    VENDORS.forEach(v => {
      csv += `"${v.name}",${v.scores.join(",")}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendor_matrix.csv';
    a.click();
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-2xl max-w-7xl mx-auto">
        <div className="bg-slate-800/80 p-4 border-b border-slate-700 flex justify-between items-center backdrop-blur-sm sticky top-0 z-10">
          <h3 className="font-bold text-white text-sm uppercase tracking-wide">Vendor Data Matrix</h3>
          <button 
            onClick={downloadCSV}
            className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition flex items-center gap-2"
          >
            <Download size={14} /> Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-slate-900/90 text-slate-400 text-xs uppercase font-bold sticky top-[60px] z-10">
              <tr>
                <th className="p-4 border-b border-slate-700 bg-slate-900">Vendor</th>
                {CATEGORIES.map(c => (
                  <th key={c.id} className="p-4 border-b border-slate-700 text-center min-w-[80px]">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-slate-800">
              {VENDORS.map((vendor, vIndex) => (
                <tr key={vIndex} className="hover:bg-slate-700/50 transition">
                  <td className="p-4 font-bold text-blue-400 border-r border-slate-800 bg-slate-800/30 sticky left-0">
                    {vendor.name}
                  </td>
                  {vendor.scores.map((score, sIndex) => {
                    let colorClass = 'text-slate-300';
                    if (score >= 8) colorClass = 'text-emerald-400 font-bold';
                    if (score <= 5) colorClass = 'text-rose-400 opacity-80';
                    
                    return (
                      <td key={sIndex} className={`p-4 text-center ${colorClass}`}>
                        {score}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Matrix;
