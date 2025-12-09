import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save } from 'lucide-react';

const ContentManager: React.FC = () => {
  const { translations, updateTranslations } = useData();
  const [jsonContent, setJsonContent] = useState(JSON.stringify(translations, null, 2));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonContent);
      updateTranslations(parsed);
      setError('');
      setSuccess('Translations updated successfully! Check the public site.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e) {
      setError('Invalid JSON format. Please check your syntax.');
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Content Editor</h1>
           <p className="text-gray-500 text-sm">Edit website text (EN & AR) directly via JSON.</p>
        </div>
        <button onClick={handleSave} className="px-6 py-2 bg-pink-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-pink-700 shadow-lg">
          <Save size={18} /> Save Changes
        </button>
      </div>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl font-bold">{error}</div>}
      {success && <div className="p-4 bg-green-100 text-green-700 rounded-xl font-bold">{success}</div>}

      <div className="flex-1 bg-gray-900 rounded-2xl overflow-hidden shadow-inner border border-gray-700">
        <textarea
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
          className="w-full h-full bg-transparent text-green-400 font-mono p-6 outline-none resize-none text-sm"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default ContentManager;