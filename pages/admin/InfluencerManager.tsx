import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Influencer, InfluencerSize, InfluencerType, Gender } from '../../types';
import { Trash2, Edit, Plus, Search, X } from 'lucide-react';

const InfluencerManager: React.FC = () => {
  const { influencers, addInfluencer, updateInfluencer, deleteInfluencer } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const emptyForm: Influencer = {
    id: '',
    name_en: '', name_ar: '',
    bio_en: '', bio_ar: '',
    gender: Gender.FEMALE,
    size: InfluencerSize.NANO,
    type: InfluencerType.TRENDY,
    profileImage: 'https://picsum.photos/300/300',
    album: [],
    socials: []
  };

  const [formData, setFormData] = useState<Influencer>(emptyForm);

  const handleOpen = (inf?: Influencer) => {
    if (inf) {
      setEditingId(inf.id);
      setFormData(inf);
    } else {
      setEditingId(null);
      setFormData({ ...emptyForm, id: Date.now().toString(), socials: [{ platform: 'instagram', handle: '', followers: '', url: '' }] });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateInfluencer(formData);
    } else {
      addInfluencer(formData);
    }
    setIsModalOpen(false);
  };

  const filtered = influencers.filter(i => i.name_en.toLowerCase().includes(search.toLowerCase()) || i.name_ar.includes(search));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Influencer Manager</h1>
        <button onClick={() => handleOpen()} className="px-6 py-2 bg-pink-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-pink-700 transition-colors">
          <Plus size={20} /> Add New
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
           <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
             <input 
              type="text" 
              placeholder="Search influencers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-pink-500"
            />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase">
              <tr>
                <th className="p-4">Profile</th>
                <th className="p-4">Name (EN/AR)</th>
                <th className="p-4">Category</th>
                <th className="p-4">Size</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((inf) => (
                <tr key={inf.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src={inf.profileImage} alt="" className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-gray-800">{inf.name_en}</p>
                    <p className="text-gray-500 text-xs">{inf.name_ar}</p>
                  </td>
                  <td className="p-4">{inf.type}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                      {inf.size.split('(')[0]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleOpen(inf)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit size={18} /></button>
                      <button onClick={() => { if(window.confirm('Delete this influencer?')) deleteInfluencer(inf.id) }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Influencer' : 'New Influencer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Name (English)</label>
                  <input required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" 
                    value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Name (Arabic)</label>
                  <input required dir="rtl" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" 
                    value={formData.name_ar} onChange={e => setFormData({...formData, name_ar: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Bio (English)</label>
                  <textarea required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" rows={3}
                    value={formData.bio_en} onChange={e => setFormData({...formData, bio_en: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Bio (Arabic)</label>
                  <textarea required dir="rtl" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" rows={3}
                    value={formData.bio_ar} onChange={e => setFormData({...formData, bio_ar: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Size Category</label>
                  <select className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                    value={formData.size} onChange={e => setFormData({...formData, size: e.target.value as InfluencerSize})}>
                      {Object.values(InfluencerSize).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Type</label>
                  <select className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                    value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as InfluencerType})}>
                      {Object.values(InfluencerType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                 <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Gender</label>
                  <select className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                    value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as Gender})}>
                      {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Profile Image URL</label>
                <input className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" 
                  value={formData.profileImage} onChange={e => setFormData({...formData, profileImage: e.target.value})} />
              </div>

              {/* Simple Socials for demo */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Main Social (Platform - Handle - Followers)</label>
                <div className="flex gap-2">
                   <select className="p-3 bg-gray-50 rounded-xl border border-gray-200" 
                    value={formData.socials[0]?.platform || 'instagram'} 
                    onChange={e => {
                        const newSocials = [...formData.socials];
                        if(!newSocials[0]) newSocials[0] = { platform: 'instagram', handle: '', followers: '', url: '' };
                        newSocials[0].platform = e.target.value as any;
                        setFormData({...formData, socials: newSocials});
                    }}>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                   </select>
                   <input placeholder="Handle" className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex-1" 
                      value={formData.socials[0]?.handle || ''}
                      onChange={e => {
                        const newSocials = [...formData.socials];
                        if(!newSocials[0]) newSocials[0] = { platform: 'instagram', handle: '', followers: '', url: '' };
                        newSocials[0].handle = e.target.value;
                        setFormData({...formData, socials: newSocials});
                    }}
                   />
                   <input placeholder="100K" className="p-3 bg-gray-50 rounded-xl border border-gray-200 w-24"
                      value={formData.socials[0]?.followers || ''}
                       onChange={e => {
                        const newSocials = [...formData.socials];
                        if(!newSocials[0]) newSocials[0] = { platform: 'instagram', handle: '', followers: '', url: '' };
                        newSocials[0].followers = e.target.value;
                        setFormData({...formData, socials: newSocials});
                    }}
                   />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-700 shadow-lg">Save Influencer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerManager;