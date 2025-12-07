import React, { useState, useEffect } from 'react';
import { VendorResult, WeightState } from '../types';
import { NARRATIVES } from '../constants';
import { Check, X, Award, ChevronRight, ZoomIn, XIcon, Settings } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface VendorCardsProps {
  results: VendorResult[];
  weights?: WeightState;
  onSelectVendor: (vendor: VendorResult) => void;
}

// Image Modal Component
const ImageModal: React.FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-blue-400 transition"
      >
        <XIcon size={32} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

// Image Management Modal
const ImageManagementModal: React.FC<{
  vendorName: string;
  onClose: () => void;
  onUpdate: () => void;
}> = ({ vendorName, onClose, onUpdate }) => {
  const [frontImages, setFrontImages] = useState<string[]>([]);

  useEffect(() => {
    // Load existing images from localStorage
    const storageKey = `vendor_images_${vendorName}_front`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setFrontImages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved images');
      }
    }
  }, [vendorName]);

  const handleUpdate = (images: string[]) => {
    setFrontImages(images);
    onUpdate();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg border border-slate-700 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Manage {vendorName} Images</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <XIcon size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-blue-400 mb-3">Card Screenshot (Front)</h4>
            <ImageUploader
              vendorName={vendorName}
              location="front"
              currentImages={frontImages}
              onImagesUpdate={handleUpdate}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// Load images from localStorage
const loadVendorImages = (vendorName: string, location: 'front' | 'back'): string[] => {
  const storageKey = `vendor_images_${vendorName}_${location}`;
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved images');
    }
  }
  return [];
};

// Vendor screenshot mapping (default screenshots)
const VENDOR_SCREENSHOTS: Record<string, string> = {
  "RightCapital": "/uploaded_image_1765143260406.png"
};

const VendorCards: React.FC<VendorCardsProps> = ({ results, weights, onSelectVendor }) => {
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);
  const [managingVendor, setManagingVendor] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleImageClick = (e: React.MouseEvent, src: string, alt: string) => {
    e.stopPropagation();
    setEnlargedImage({ src, alt });
  };

  const handleManageImages = (e: React.MouseEvent, vendorName: string) => {
    e.stopPropagation();
    setManagingVendor(vendorName);
  };

  const handleUpdateComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <div className="p-6 overflow-y-auto h-full pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {results.map((vendor, index) => {
            const narrative = NARRATIVES[vendor.name];
            const isWinner = index === 0;

            // Get custom images or default screenshot
            const customImages = loadVendorImages(vendor.name, 'front');
            const screenshot = customImages.length > 0 ? customImages[0] : VENDOR_SCREENSHOTS[vendor.name];

            return (
              <div
                key={`${vendor.name}-${refreshKey}`}
                onClick={() => onSelectVendor(vendor)}
                className={`bg-slate-800 border rounded-lg p-6 relative group transition-all duration-300 hover:scale-[1.01] hover:shadow-xl cursor-pointer ${isWinner
                    ? 'border-emerald-500 shadow-lg shadow-emerald-900/20'
                    : 'border-slate-700 hover:border-blue-500'
                  }`}
              >
                {isWinner ? (
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
                    <Award size={12} /> #1 CHOICE
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-slate-700 text-slate-400 text-[10px] font-bold px-2 py-1 rounded z-10">
                    #{index + 1}
                  </div>
                )}

                {/* 2-Column Grid Layout */}
                <div className="grid grid-cols-2 gap-6">

                  {/* Left Column: Content */}
                  <div className="flex flex-col">
                    <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{vendor.name}</h3>
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

                    <div className="mt-6 pt-4 border-t border-slate-700">
                      <div className="text-[10px] uppercase text-blue-500 font-bold mb-1">Best For</div>
                      <div className="text-xs text-slate-300 italic leading-relaxed">
                        {narrative.bestFor}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Screenshot Space */}
                  <div className="flex flex-col justify-center items-center relative">
                    {/* Manage Images Button */}
                    <button
                      onClick={(e) => handleManageImages(e, vendor.name)}
                      className="absolute top-2 right-2 z-20 bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Manage Images"
                    >
                      <Settings size={16} />
                    </button>

                    {screenshot ? (
                      <div
                        className="relative w-full h-full min-h-[300px] bg-slate-900/50 rounded-lg border-2 border-slate-700 overflow-hidden group/img cursor-zoom-in"
                        onClick={(e) => handleImageClick(e, screenshot, `${vendor.name} Screenshot`)}
                      >
                        <img
                          src={screenshot}
                          alt={`${vendor.name} Screenshot`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                          <ZoomIn className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity" size={32} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-full min-h-[300px] bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:border-slate-600 transition"
                        onClick={(e) => handleManageImages(e, vendor.name)}
                      >
                        <div className="text-center text-slate-600">
                          <Settings className="mx-auto mb-2" size={24} />
                          <div className="text-sm font-medium mb-1">Add Screenshot</div>
                          <div className="text-xs">Click to upload</div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Action */}
                <div className="mt-4 flex justify-end">
                  <div className="bg-slate-900 p-2 rounded-full text-slate-500 group-hover:text-white group-hover:bg-blue-600 transition">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Modal */}
      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}

      {/* Image Management Modal */}
      {managingVendor && (
        <ImageManagementModal
          vendorName={managingVendor}
          onClose={() => setManagingVendor(null)}
          onUpdate={handleUpdateComplete}
        />
      )}
    </>
  );
};

export default VendorCards;
