
import React, { useState, useEffect, useRef } from 'react';
import { FileData, MVPData, Funder } from './types';
import { convertRepoToMVP } from './services/geminiService';
import { FunderList } from './components/FunderList';
import { FundingModal } from './components/FundingModal';
import { gsap } from 'gsap';
import { 
  Rocket, 
  Upload, 
  Cpu, 
  Coffee, 
  Users, 
  ChevronRight, 
  Eye, 
  Code2, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Mail,
  Zap,
  Terminal,
  Layers,
  Search,
  ArrowRight,
  RefreshCcw,
  DollarSign,
  TrendingUp as ValuationIcon,
  Globe,
  Database,
  Server,
  Layout,
  Smartphone,
  Box,
  Braces,
  GitBranch,
  Shield,
  Cloud,
  Github
} from 'lucide-react';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [mvpData, setMvpData] = useState<MVPData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'funding' | 'community'>('overview');
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [backers, setBackers] = useState<Funder[]>([
    { name: 'Elena Vance', amount: 250, date: '2023-11-01' },
    { name: 'Dr. Freeman', amount: 500, date: '2023-11-05' },
    { name: 'Alyx Vance', amount: 150, date: '2023-11-08' }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from('.hero-content', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.15
    });
  }, []);

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-10), msg]);

  const resetApp = () => {
    setFiles([]);
    setMvpData(null);
    setLogs([]);
    setIsConverting(false);
    setActiveTab('overview');
    setTimeout(() => {
      gsap.from('.hero-content', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.15
      });
    }, 0);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    setIsConverting(true);
    setLogs([]);
    addLog("> Initiating repo analysis sequence...");
    
    const fileList: FileData[] = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      addLog(`> Reading binary: ${file.name}`);
      const text = await file.text();
      fileList.push({ name: file.name, content: text, type: file.type });
    }

    setFiles(fileList);
    addLog("> Payload stabilized. Handing over to Gemini 3 Pro...");
    addLog("> Calculating market valuation metrics...");

    try {
      const data = await convertRepoToMVP(fileList);
      addLog("> Synthesis complete. Rendering KRACKED view.");
      setTimeout(() => {
        setMvpData(data);
        setIsConverting(false);
        gsap.fromTo('.dashboard-view', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      }, 1000);
    } catch (err) {
      addLog("!! Critical Error during conversion !!");
      setIsConverting(false);
    }
  };

  const addFunder = (name: string, amount: number) => {
    setBackers(prev => [{ name, amount, date: new Date().toISOString().split('T')[0] }, ...prev]);
  };

  const formatCurrency = (val: number, currency: string) => {
    return new Intl.NumberFormat(currency === 'MYR' ? 'en-MY' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getTechIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('react') || t.includes('vue') || t.includes('angular') || t.includes('svelte') || t.includes('frontend') || t.includes('ui')) return <Layout size={32} />;
    if (t.includes('node') || t.includes('express') || t.includes('backend') || t.includes('api') || t.includes('server')) return <Server size={32} />;
    if (t.includes('sql') || t.includes('db') || t.includes('mongo') || t.includes('prisma') || t.includes('database')) return <Database size={32} />;
    if (t.includes('python') || t.includes('js') || t.includes('typescript') || t.includes('rust') || t.includes('go') || t.includes('language')) return <Braces size={32} />;
    if (t.includes('aws') || t.includes('gcp') || t.includes('azure') || t.includes('cloud') || t.includes('docker') || t.includes('kubernetes')) return <Cloud size={32} />;
    if (t.includes('security') || t.includes('auth') || t.includes('jwt') || t.includes('firewall')) return <Shield size={32} />;
    if (t.includes('native') || t.includes('ios') || t.includes('android') || t.includes('mobile')) return <Smartphone size={32} />;
    if (t.includes('npm') || t.includes('yarn') || t.includes('package')) return <Box size={32} />;
    if (t.includes('git') || t.includes('github') || t.includes('version')) return <GitBranch size={32} />;
    if (t.includes('web') || t.includes('http') || t.includes('browser')) return <Globe size={32} />;
    return <Terminal size={32} />;
  };

  const getAvatarUrl = (name: string) => {
    const slug = encodeURIComponent(name.toLowerCase().trim());
    return `https://unavatar.io/${slug}?fallback=https://ui-avatars.com/api/?name=${slug}&background=18181b&color=fff`;
  };

  return (
    <div ref={containerRef} className="min-h-screen selection:bg-white selection:text-black">
      {/* Dynamic Nav */}
      <nav className="flex justify-between items-center px-8 py-8 absolute w-full top-0 z-50">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={resetApp}>
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-all shadow-xl">
            <Zap size={22} className="text-black fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-white">KRACKEDREPO</span>
        </div>
        
        <div className="flex items-center gap-6">
          {mvpData && (
            <button 
              onClick={resetApp}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <RefreshCcw size={14} /> Scan Another
            </button>
          )}
          <button 
            onClick={() => window.open('https://buymeacoffee.com', '_blank')}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-sm font-medium transition-all text-zinc-400 hover:text-white"
          >
            <Coffee size={14} /> Buy Coffee
          </button>
        </div>
      </nav>

      {/* Hero: Upload State */}
      {!mvpData && !isConverting && (
        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="hero-content inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span> AI-Driven Architecture
          </div>
          
          <h1 className="hero-content text-6xl md:text-8xl font-bold tracking-tighter text-gradient mb-8 leading-[0.9]">
            The path from code<br/>to product.
          </h1>
          
          <p className="hero-content text-lg text-zinc-500 max-w-xl mx-auto mb-16 leading-relaxed">
            Convert any repository into a structured MVP showcase. Complete with tech intelligence, funding gateways, and launch roadmaps.
          </p>

          <div className="hero-content relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative glass-card p-12 md:p-20 rounded-[3rem] border-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden">
              <input 
                type="file" 
                multiple 
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-white text-black rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                  <Upload size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Drop your Repository</h3>
                <p className="text-zinc-500 text-sm">Packages, projects, or raw file collections</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Conversion State (Terminal UI) */}
      {isConverting && (
        <section className="pt-48 flex justify-center px-6">
          <div className="w-full max-w-2xl glass-card rounded-3xl overflow-hidden border-white/5 shadow-2xl">
            <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4 mono">Repoconvert Console v3.1</span>
            </div>
            <div className="p-8 mono text-xs space-y-2 h-80 overflow-y-auto custom-scrollbar bg-black/40">
              {logs.map((log, i) => (
                <div key={i} className={log.startsWith('!!') ? 'text-red-500' : 'text-zinc-400'}>
                  <span className="text-zinc-700 mr-2">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                  {log}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-white animate-pulse"></div>
                <span className="text-zinc-600 italic">Thinking...</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Dashboard View */}
      {mvpData && (
        <main className="dashboard-view max-w-[1400px] mx-auto pt-32 pb-40 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Profile Card */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="glass-card p-10 rounded-[3rem] sticky top-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-white/10">
                  <Layers className="text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter leading-tight">{mvpData.projectName}</h2>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    MVP {mvpData.suggestedMvpVersion}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-10">
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Product Overview" icon={<Eye size={16}/>} />
                <TabButton active={activeTab === 'tech'} onClick={() => setActiveTab('tech')} label="Architecture" icon={<Cpu size={16}/>} />
                <TabButton active={activeTab === 'community'} onClick={() => setActiveTab('community')} label="Contributors" icon={<Users size={16}/>} />
                <TabButton active={activeTab === 'funding'} onClick={() => setActiveTab('funding')} label="Kickstart & Backers" icon={<TrendingUp size={16}/>} />
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                <button 
                  onClick={() => setIsSponsorModalOpen(true)}
                  className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                >
                  <Rocket size={18} /> Sponsor Build
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={resetApp}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCcw size={14} /> Scan New
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Window */}
          <section className="lg:col-span-8 space-y-8">
            <div className="glass-card rounded-[3.5rem] min-h-[700px] overflow-hidden flex flex-col premium-gradient">
              {/* Browser-like Toolbar */}
              <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-6">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                   </div>
                   <div className="px-4 py-1.5 bg-black/40 border border-white/5 rounded-full flex items-center gap-2 w-64">
                     <Search size={10} className="text-zinc-600" />
                     <span className="text-[10px] text-zinc-500 mono truncate uppercase tracking-widest">https://{mvpData.projectName.toLowerCase().replace(/\s+/g, '-')}.mvp/preview</span>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Live Preview</span>
                </div>
              </div>

              {/* Dynamic Tab Content */}
              <div className="p-10 md:p-16 flex-1 animate-in fade-in duration-1000">
                {activeTab === 'overview' && (
                  <div className="space-y-12 max-w-2xl">
                    <header>
                      <h3 className="text-4xl font-bold tracking-tight mb-4 text-gradient">{mvpData.tagline}</h3>
                      <p className="text-xl text-zinc-400 leading-relaxed font-light">
                        {mvpData.overview}
                      </p>
                    </header>

                    {/* Potential Valuation Widget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="glass-card p-6 rounded-3xl border-white/10 bg-white/[0.02] flex flex-col gap-2 group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                          <ValuationIcon size={14} className="text-green-500" /> Potential Valuation (USD)
                        </div>
                        <div className="text-3xl font-mono font-bold text-white group-hover:scale-[1.02] transition-transform origin-left">
                          {formatCurrency(mvpData.valuationUSD, 'USD')}
                        </div>
                        <div className="text-[10px] text-zinc-600">Based on architectural scan</div>
                      </div>
                      <div className="glass-card p-6 rounded-3xl border-white/10 bg-white/[0.02] flex flex-col gap-2 group hover:bg-white/[0.04] transition-all">
                        <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                          <DollarSign size={14} className="text-blue-500" /> Potential Valuation (MYR)
                        </div>
                        <div className="text-3xl font-mono font-bold text-white group-hover:scale-[1.02] transition-transform origin-left">
                          {formatCurrency(mvpData.valuationMYR, 'MYR')}
                        </div>
                        <div className="text-[10px] text-zinc-600">Local market estimation</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 border-b border-white/5 pb-2">Core Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mvpData.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5">
                            <CheckCircle2 size={18} className="text-white mt-1" />
                            <p className="text-sm font-medium leading-relaxed">{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 border-b border-white/5 pb-2">Growth Roadmap</h4>
                      <div className="space-y-3">
                        {mvpData.roadmap.map((r, i) => (
                          <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.01] border border-white/5 group hover:bg-white/[0.03] transition-all">
                            <div className="flex items-center gap-4">
                              <span className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">Q{i+1}</span>
                              <span className="text-sm text-zinc-400">{r}</span>
                            </div>
                            <ArrowRight size={14} className="text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tech' && (
                  <div className="space-y-12">
                    <header>
                      <h3 className="text-3xl font-bold tracking-tight mb-4">Architectural Blueprint</h3>
                      <p className="text-zinc-500 max-w-xl">Deep analysis of the codebase structural integrity and suggested technology scaling path.</p>
                    </header>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {mvpData.techStack.map((tech, i) => (
                        <div key={i} className="group relative aspect-square glass-card rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-white hover:text-black transition-all duration-700 cursor-default">
                          <div className="mb-4 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            {getTechIcon(tech.name)}
                          </div>
                          <span className="text-sm font-bold uppercase tracking-widest">{tech.name}</span>
                          
                          {/* Tooltip Content */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-48 p-4 rounded-2xl bg-zinc-900 border border-white/10 text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 shadow-2xl z-20 group-hover:-top-4">
                            <div className="font-bold text-white uppercase tracking-widest mb-1.5 border-b border-white/5 pb-1">{tech.name}</div>
                            <p className="leading-relaxed italic">{tech.role}</p>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-900"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <Zap size={20} className="text-indigo-400" />
                        <h4 className="font-bold text-indigo-100">AI Intelligence Report</h4>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed italic">
                        "Your codebase shows strong separation of concerns in the UI layer. We recommend integrating a global state orchestration 
                        module and hardening the API endpoints before the v1.2 release. Suggested scaling vector: Horizontal Pod Autoscaling."
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'community' && (
                  <div className="space-y-16">
                    {/* New Contributors Display Section */}
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-3xl font-bold">Project Collaborators</h3>
                          <p className="text-zinc-500 text-sm mt-2">The talent behind the architecture.</p>
                        </div>
                        <div className="text-xs mono text-zinc-600 uppercase tracking-widest">Active Talent Pool</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          { name: 'Isaac Kleiner', role: 'Lead Architect', github: 'isaac_k' },
                          { name: 'Barney Calhoun', role: 'Fullstack Operative', github: 'calhoun_b' },
                          { name: 'Judith Mossman', role: 'DevOps Strategist', github: 'mossman_j' }
                        ].map((dev, i) => (
                          <div key={i} className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 overflow-hidden mb-4 border border-white/10 group-hover:border-white/40 transition-all shadow-xl">
                              <img 
                                src={getAvatarUrl(dev.github)} 
                                alt={dev.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{dev.name}</h4>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold mt-1 mb-4">{dev.role}</p>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:bg-white hover:text-black transition-all">
                              <Github size={12}/> View Profile
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <h3 className="text-3xl font-bold">Waiting List</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Early access program is currently at capacity. Join the waitlist for the next cohort.</p>
                        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16}/>
                            <input 
                              type="email" 
                              placeholder="Enter email for access"
                              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-white/20 text-sm"
                            />
                          </div>
                          <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">Secure Spot</button>
                        </form>
                      </div>
                      <div className="space-y-8">
                        <h3 className="text-3xl font-bold">Collaborate</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">The project is looking for specialists in distributed systems and systems architecture.</p>
                        <button className="w-full py-4 bg-white text-black font-bold rounded-2xl shadow-xl hover:scale-[1.01] transition-all">Submit Portfolio</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'funding' && (
                  <div className="space-y-12">
                    <div className="flex justify-between items-end border-b border-white/5 pb-10">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-500 mb-2">Fund Allocation</h3>
                        <p className="text-5xl font-bold text-white tracking-tighter">${backers.reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Target Achievement</p>
                        <p className="text-xl font-mono text-zinc-400">22% Complete</p>
                      </div>
                    </div>
                    
                    <div className="w-full h-1 bg-white/[0.02] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-1000 ease-in-out" 
                        style={{ width: '22%' }}
                      ></div>
                    </div>

                    <FunderList funders={backers} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="px-8 py-20 border-t border-white/5 flex flex-col items-center">
        <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
          <Zap size={20} className="text-zinc-600" />
        </div>
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-center">
          KRACKEDREPO • Rapid Synthesis Protocol v4.0
        </p>
        <div className="flex gap-12 opacity-20 grayscale">
          <span className="font-bold tracking-tighter">REACT</span>
          <span className="font-bold tracking-tighter">TYPESCRIPT</span>
          <span className="font-bold tracking-tighter">TAILWIND</span>
          <span className="font-bold tracking-tighter">GSAP</span>
        </div>
      </footer>

      <FundingModal 
        isOpen={isSponsorModalOpen} 
        onClose={() => setIsSponsorModalOpen(false)} 
        onSuccess={addFunder}
      />
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${active ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
  >
    <div className="flex items-center gap-4">
      <span className={active ? 'text-black' : 'text-zinc-600'}>{icon}</span>
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
    <ChevronRight size={14} className={active ? 'opacity-40' : 'opacity-0'} />
  </button>
);

export default App;
