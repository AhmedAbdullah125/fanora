import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { SiteImages } from '../../types';
import { ImageIcon, Link as LinkIcon, ExternalLink, Save, RefreshCw } from 'lucide-react';

const ImageManager: React.FC = () => {
  const { siteImages, replaceSiteImages } = useData();
  const [activeTab, setActiveTab] = useState<keyof SiteImages>('global');
  
  // Local state for editing to allow "Save" workflow
  const [localImages, setLocalImages] = useState<SiteImages>(siteImages);
  const [hasChanges, setHasChanges] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Sync local state when siteImages changes (e.g. on first load)
  useEffect(() => {
    setLocalImages(siteImages);
  }, [siteImages]);

  const tabs: (keyof SiteImages)[] = ['global', 'home', 'about', 'services', 'contact'];

  const handleUrlChange = (section: keyof SiteImages, key: string, newUrl: string, index?: number) => {
    const newImages = { ...localImages };
    const sectionData = newImages[section];
    
    if (Array.isArray(sectionData[key as keyof typeof sectionData]) && index !== undefined) {
      // Handle Array
      const arr = [...(sectionData[key as keyof typeof sectionData] as string[])];
      arr[index] = newUrl;
      // @ts-ignore
      newImages[section][key] = arr;
    } else {
      // Handle String
      // @ts-ignore
      newImages[section][key] = newUrl;
    }

    setLocalImages(newImages);
    setHasChanges(true);
  };

  const handleSave = () => {
    replaceSiteImages(localImages);
    setHasChanges(false);
    setSuccessMsg('All images updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Discard unsaved changes?')) {
      setLocalImages(siteImages);
      setHasChanges(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Image URL Manager</h1>
           <p className="text-gray-500 text-sm">Edit image URLs below and click Save to update the website.</p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <button 
              onClick={handleReset}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold flex items-center gap-2"
            >
              <RefreshCw size={18} /> Reset
            </button>
          )}
          <button 
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-6 py-2 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${
              hasChanges 
                ? 'bg-pink-600 hover:bg-pink-700 hover:scale-105' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl font-bold animate-in fade-in slide-in-from-top-2">
          {successMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-t-xl font-bold transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-white text-pink-600 border-b-2 border-pink-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* URL Inputs List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 gap-8">
          {Object.keys(localImages[activeTab]).map((key) => {
            const value = localImages[activeTab][key as keyof typeof localImages[typeof activeTab]];
            
            // Handle Arrays (Galleries)
            if (Array.isArray(value)) {
               return (
                 <div key={key} className="space-y-4">
                   <h3 className="font-bold text-lg text-indigo-900 capitalize border-b pb-2">{key.replace(/([A-Z])/g, ' $1')} Gallery</h3>
                   <div className="grid gap-4">
                     {(value as string[]).map((imgUrl, idx) => (
                        <UrlInputRow 
                            key={`${key}-${idx}`}
                            label={`Image #${idx + 1}`}
                            value={imgUrl}
                            onChange={(newUrl) => handleUrlChange(activeTab, key, newUrl, idx)}
                        />
                     ))}
                   </div>
                 </div>
               );
            } else {
               // Handle Single Strings
               return (
                  <UrlInputRow 
                      key={key}
                      label={key.replace(/([A-Z])/g, ' $1')}
                      value={value as string}
                      onChange={(newUrl) => handleUrlChange(activeTab, key, newUrl)}
                  />
               );
            }
          })}
        </div>
      </div>
    </div>
  );
};

interface UrlInputRowProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const UrlInputRow: React.FC<UrlInputRowProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
       {/* Preview */}
       <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative border border-gray-300 group">
          {value ? (
             <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
             <div className="flex items-center justify-center h-full text-gray-400">
                <ImageIcon size={24} />
             </div>
          )}
          {value && (
             <a href={value} target="_blank" rel="noreferrer" className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
                <ExternalLink size={12} />
             </a>
          )}
       </div>

       {/* Input */}
       <div className="flex-1 w-full">
          <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">{label}</label>
          <div className="relative">
             <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
             <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm font-mono text-gray-600"
             />
          </div>
          <p className="text-xs text-gray-400 mt-2">Paste a direct image link (JPG, PNG, WebP).</p>
       </div>
    </div>
  );
};

export default ImageManager;
