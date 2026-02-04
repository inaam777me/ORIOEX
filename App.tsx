
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { NAV_LINKS, SERVICES, PROBLEM_SOLUTION, WHY_CHOOSE_US, ENGINEERING_PROCESS } from './constants';
import { LeadFormData, LeadScoreResult } from './types';
import { geminiService } from './services/geminiService';
import { leadStore } from './services/leadStore';
import { LoginPage, AdminDashboard } from './AdminPage';

// --- Shared Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (pathname.startsWith('/admin') || pathname === '/login') return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || pathname !== '/' ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          ORIO<span className="text-blue-500">EX</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.href} 
              to={link.href.replace('#', '')} 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden p-2 text-gray-400 hover:text-white transition-colors" aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
        <div className="flex flex-col p-6 gap-6">
          {NAV_LINKS.map(link => (
            <Link key={link.href} to={link.href.replace('#', '')} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-400 hover:text-white transition-colors border-b border-white/5 pb-2">
              {link.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-6 py-4 rounded-xl text-center font-bold text-lg">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin') || pathname === '/login') return null;

  return (
    <footer className="py-12 border-t border-white/10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="text-xl font-bold tracking-tighter">
          ORIO<span className="text-blue-500">EX</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs sm:text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/" className="hover:text-white transition-colors">Twitter</Link>
          <Link to="/" className="hover:text-white transition-colors">LinkedIn</Link>
          <Link to="/login" className="hover:text-white transition-colors text-gray-600">Admin</Link>
        </div>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ORIOEX Solutions. Built for scale.
        </div>
      </div>
    </footer>
  );
};

// --- Landing Page Sections ---

const Hero: React.FC = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4 sm:px-6">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full gradient-bg -z-10 opacity-70"></div>
    <div className="max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-semibold mb-6 sm:mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        NOW ACCEPTING Q4 PROJECTS
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1]">
        Architecting the <br className="hidden sm:block" /> Future of{' '}
        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          SaaS Excellence.
        </span>
      </h1>
      <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed">
        ORIOEX builds enterprise-grade software solutions designed for scale, 
        security, and peak performance. From ideation to cloud-native deployment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/contact" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 text-center">
          Book a Consultation
        </Link>
        <Link to="/services" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center">
          View Solutions
        </Link>
      </div>
    </div>
  </section>
);

const ProblemSolution: React.FC = () => (
  <section className="py-16 md:py-24 px-4 sm:px-6 border-y border-white/5 bg-white/[0.01]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 tracking-tight">Stop solving the same <br className="hidden lg:block" /> problems twice.</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Most businesses lose speed to technical debt and inefficient manual processes. ORIOEX identifies these bottlenecks and replaces them with automated, future-proof logic.
          </p>
          <div className="space-y-6">
            {PROBLEM_SOLUTION.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold">!</div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">{item.problem}</div>
                  <div className="text-blue-400 font-semibold">{item.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-black rounded-3xl p-8 border border-white/10 h-full min-h-[300px] flex items-center justify-center overflow-hidden">
             <div className="grid grid-cols-2 gap-4 w-full opacity-50 grayscale group-hover:grayscale-0 transition-all">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-2xl border border-white/10 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
                ))}
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-600 p-6 rounded-2xl shadow-2xl shadow-blue-500/40">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProcessPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen">
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Engineering <span className="text-blue-500">DNA</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We don't just write code; we architect scalable assets. Here is how we take your vision from zero to production at scale.
            </p>
          </div>
          
          <div className="relative space-y-24">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 -translate-x-1/2 opacity-20"></div>

            {ENGINEERING_PROCESS.map((p, idx) => (
              <div key={p.step} className={`flex flex-col lg:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full">
                  <div className={`p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all group relative ${idx % 2 !== 0 ? 'lg:text-right' : ''}`}>
                    <div className={`absolute top-0 ${idx % 2 !== 0 ? 'lg:right-0 lg:translate-x-1/2' : 'lg:left-0 lg:-translate-x-1/2'} -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg shadow-xl shadow-blue-600/30 group-hover:scale-110 transition-transform hidden lg:flex`}>
                      {p.step}
                    </div>
                    <div className="lg:hidden text-blue-500 font-bold mb-4">Step {p.step}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{p.title}</h3>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">{p.description}</p>
                    <div className={`flex flex-wrap gap-2 ${idx % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                      {p.details.map(detail => (
                        <span key={detail} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex flex-1 justify-center relative">
                   <div className="w-32 h-32 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center group">
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-pulse"></div>
                   </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center p-12 rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/5">
             <h3 className="text-3xl font-bold mb-6">Ready to start step one?</h3>
             <Link to="/contact" className="inline-block bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all">
               Schedule Architecture Review
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage: React.FC = () => (
  <div className="pt-24 min-h-screen">
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Expertise</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            High-performance engineering for companies that refuse to settle for average.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map(s => (
            <div key={s.id} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all h-full">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-8">{s.description}</p>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">{s.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const WhyUsPage: React.FC = () => (
  <div className="pt-24 min-h-screen">
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The ORIOEX Advantage</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Why enterprise leaders choose us to build their core technical assets.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div key={idx} className="p-10 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all">
              <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '', email: '', company: '', budget: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<LeadScoreResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await geminiService.scoreLead(formData);
      leadStore.saveLead(formData, result);
      setScore(result);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen px-4 sm:px-6">
      <section className="py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Get in touch</h2>
          <p className="text-gray-400 text-lg">We typically reply within 2 hours during business cycles.</p>
        </div>
        
        <div className="bg-white/[0.03] p-8 md:p-12 rounded-3xl border border-white/10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Work Email</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="john@company.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Company</label>
                  <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="Acme Inc." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Budget Range</label>
                  <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all text-gray-400 text-sm appearance-none">
                    <option value="">Select range</option>
                    <option value="10-50k">$10k - $50k</option>
                    <option value="50-150k">$50k - $150k</option>
                    <option value="150k+">$150k+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Project Message</label>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600 text-sm" placeholder="Describe your technical requirements..."></textarea>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 text-lg">
                {loading ? 'Processing Lead...' : 'Send Inquiry'}
              </button>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-bold mb-4">Inquiry Received</h3>
              <p className="text-gray-400 mb-8 text-lg">Based on our AI analysis, your project is a <strong>{score?.priority}</strong> priority match. One of our lead engineers will reach out shortly.</p>
              <button onClick={() => setSubmitted(false)} className="text-blue-400 hover:underline font-semibold">Send another message</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const LandingPage: React.FC = () => (
  <div className="min-h-screen bg-black overflow-x-hidden">
    <Hero />
    <ProblemSolution />
    <section className="py-24 px-4 sm:px-6">
       <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">Built with Precision</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
             <div className="text-xl font-bold">NEXT.JS</div>
             <div className="text-xl font-bold">AWS</div>
             <div className="text-xl font-bold">PRISMA</div>
             <div className="text-xl font-bold">NESTJS</div>
          </div>
       </div>
    </section>
  </div>
);

// --- Root Component ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-black text-white antialiased selection:bg-blue-500 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
