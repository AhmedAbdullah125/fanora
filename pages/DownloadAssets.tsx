import React, { useEffect, useState } from 'react';
import { GlassCard, Button } from '../components/ui/GlassComponents';
import { Download, CheckCircle, AlertCircle, Loader, FileArchive } from 'lucide-react';

declare global {
  interface Window {
    JSZip: any;
    saveAs: any;
  }
}

const DownloadAssets: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading_libs' | 'downloading' | 'zipping' | 'done' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string>('Ready to start.');

  // Load JSZip and FileSaver from CDN on mount
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    setStatus('loading_libs');
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js')
    ]).then(() => {
      setStatus('idle');
      setLog('Libraries loaded. Ready to download.');
    }).catch(err => {
      setLog('Error loading libraries: ' + err.message);
      setStatus('error');
    });
  }, []);

  const assets = [
     // Global & Home
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', path: 'assets/about/hero.jpg' },
    { url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80', path: 'assets/services/marketing-bg.jpg' },
    { url: 'https://images.unsplash.com/photo-1590664216212-62e7637d1665?auto=format&fit=crop&w=800&q=80', path: 'assets/services/studio-bg.jpg' },
    { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80', path: 'assets/services/influencer-bg.jpg' },
    { url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80', path: 'assets/contact/map.jpg' },
    
    // Galleries
    { url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', path: 'assets/services/gallery/marketing-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', path: 'assets/services/gallery/marketing-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80', path: 'assets/services/gallery/marketing-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=400&q=80', path: 'assets/services/gallery/studio-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1471341971474-27c5b4505886?auto=format&fit=crop&w=400&q=80', path: 'assets/services/gallery/studio-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1590664216212-62e7637d1665?auto=format&fit=crop&w=400&q=80', path: 'assets/services/gallery/studio-3.jpg' },

    // Influencer Profiles
    { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80', path: 'assets/influencers/sarah/profile.jpg' },
    { url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', path: 'assets/influencers/omar/profile.jpg' },
    { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', path: 'assets/influencers/layla/profile.jpg' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', path: 'assets/influencers/fahad/profile.jpg' },
    { url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80', path: 'assets/influencers/noura/profile.jpg' },

    // Influencer Albums
    { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/sarah/1.jpg' },
    { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/sarah/2.jpg' },
    { url: 'https://images.unsplash.com/photo-1529139574466-a302c27e3844?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/sarah/3.jpg' },
    { url: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/sarah/4.jpg' },
    
    { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/omar/1.jpg' },
    { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/omar/2.jpg' },
    { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/omar/3.jpg' },

    { url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/layla/1.jpg' },
    { url: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/layla/2.jpg' },
    { url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/layla/3.jpg' },

    { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/fahad/1.jpg' },
    { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/fahad/2.jpg' },

    { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/noura/1.jpg' },
    { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', path: 'assets/influencers/noura/2.jpg' },
  ];

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleDownload = async () => {
    if (!window.JSZip || !window.saveAs) {
      setLog('Libraries not loaded. Please refresh.');
      return;
    }

    setStatus('downloading');
    setProgress(0);
    const zip = new window.JSZip();
    let completed = 0;
    let failed = 0;

    const proxyUrl = 'https://api.allorigins.win/raw?url=';

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      try {
        setLog(`Fetching: ${asset.path}`);
        await delay(500); 

        const fetchUrl = proxyUrl + encodeURIComponent(asset.url);
        const response = await fetch(fetchUrl);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        if (blob.size < 100) throw new Error('Empty file received');
        
        zip.file(asset.path, blob);
        completed++;
      } catch (err: any) {
        console.error(err);
        failed++;
        setLog(`Failed to fetch: ${asset.path} - ${err.message}`);
      }
      setProgress(Math.round(((i + 1) / assets.length) * 100));
    }

    if (completed === 0) {
        setStatus('error');
        setLog('All downloads failed. Please check your internet connection.');
        return;
    }

    setStatus('zipping');
    setLog('Compressing files into assets.zip...');
    
    zip.generateAsync({ type: "blob" }).then((content: any) => {
        window.saveAs(content, "assets.zip");
        setStatus('done');
        setLog(`Done! ${completed} files downloaded. ${failed} failed.`);
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-light-bg flex justify-center items-center px-4">
        <GlassCard className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-light-bg rounded-full text-accent">
                    <FileArchive size={32} />
                </div>
            </div>
            
            <h1 className="text-2xl font-bold text-primary">Download Assets</h1>
            <p className="text-secondary text-sm">
                Click below to download <b>assets.zip</b> containing all demo images. 
                Extract this into your project's <code>public/</code> folder.
            </p>

            {status === 'loading_libs' && (
                <div className="flex items-center justify-center gap-2 text-accent text-sm font-medium">
                    <Loader className="animate-spin" size={16} /> Loading libraries...
                </div>
            )}

            {status === 'downloading' && (
                <div className="space-y-2">
                    <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                        <div className="bg-accent h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-xs text-accent font-medium">{progress}%</p>
                </div>
            )}

            <div className="bg-light-bg rounded-lg p-3 text-xs font-mono text-left h-24 overflow-y-auto text-secondary border border-border">
                {log}
            </div>

            <Button 
                onClick={handleDownload} 
                fullWidth 
                disabled={status === 'loading_libs' || status === 'downloading' || status === 'zipping'}
                className="py-3"
            >
                {status === 'idle' || status === 'done' || status === 'error' ? (
                    <><Download className="me-2" size={18} /> Download assets.zip</>
                ) : (
                    <><Loader className="me-2 animate-spin" size={18} /> Processing...</>
                )}
            </Button>
            
            {status === 'done' && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2 justify-center border border-green-200">
                    <CheckCircle size={16} /> Download Complete!
                </div>
            )}
            
             {status === 'error' && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2 justify-center border border-red-200">
                    <AlertCircle size={16} /> Error occurred.
                </div>
            )}

        </GlassCard>
    </div>
  );
};

export default DownloadAssets;