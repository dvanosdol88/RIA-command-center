import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    vendorName: string;
    location: 'front' | 'back';
    onImagesUpdate: (images: string[]) => void;
    currentImages: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    vendorName,
    location,
    onImagesUpdate,
    currentImages
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target?.result as string;
                    const newImages = [...currentImages, base64];
                    onImagesUpdate(newImages);

                    // Save to localStorage
                    const storageKey = `vendor_images_${vendorName}_${location}`;
                    localStorage.setItem(storageKey, JSON.stringify(newImages));
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const removeImage = (index: number) => {
        const newImages = currentImages.filter((_, i) => i !== index);
        onImagesUpdate(newImages);

        // Update localStorage
        const storageKey = `vendor_images_${vendorName}_${location}`;
        localStorage.setItem(storageKey, JSON.stringify(newImages));
    };

    return (
        <div className="space-y-3">
            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-all cursor-pointer ${isDragging
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'
                    }`}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id={`upload-${vendorName}-${location}`}
                />
                <label
                    htmlFor={`upload-${vendorName}-${location}`}
                    className="cursor-pointer flex flex-col items-center gap-2"
                >
                    <Upload className="text-slate-400" size={24} />
                    <div className="text-xs text-slate-400">
                        Drop images here or click to upload
                    </div>
                    <div className="text-[10px] text-slate-600">
                        {location === 'front' ? 'Card Screenshot' : 'Additional Screenshots'}
                    </div>
                </label>
            </div>

            {/* Image Preview Grid */}
            {currentImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                    {currentImages.map((img, index) => (
                        <div
                            key={index}
                            className="relative group aspect-video bg-slate-900 rounded border border-slate-700 overflow-hidden"
                        >
                            <img
                                src={img}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
