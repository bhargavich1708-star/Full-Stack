import React, { useState } from 'react';
import axios from 'axios';
import { Calculator, Percent, Clock, DollarSign, RefreshCw, Heart, Star, Sparkles, Cloud, Cat, Flower2, Moon } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <Heart className="absolute top-[10%] left-[5%] text-pink-400 opacity-40 animate-float-slow" size={60} fill="currentColor" />
      <Star className="absolute top-[20%] right-[10%] text-yellow-400 opacity-50 animate-float-medium" size={40} fill="currentColor" />
      <Sparkles className="absolute bottom-[15%] left-[10%] text-blue-400 opacity-40 animate-float-fast" size={50} />
      <Cloud className="absolute top-[35%] right-[5%] text-white opacity-60 animate-float-slow" size={80} fill="currentColor" />
      <Heart className="absolute bottom-[10%] right-[15%] text-pink-300 opacity-50 animate-float-medium" size={45} fill="currentColor" />
      <Cat className="absolute top-[60%] left-[5%] text-blue-300 opacity-30 animate-float-fast" size={50} />
      <Flower2 className="absolute top-[5%] right-[20%] text-pink-200 opacity-40 animate-float-slow" size={40} />
      <Moon className="absolute bottom-[40%] left-[2%] text-yellow-200 opacity-30 animate-float-medium" size={35} fill="currentColor" />
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('simple');
  const [formData, setFormData] = useState({
    principal: '',
    rate: '',
    time: '',
    frequency: '1'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const calculateSimpleInterest = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/simple-interest`, {
        principal: formData.principal,
        rate: formData.rate,
        time: formData.time
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Magic failed u_u');
    } finally {
      setLoading(false);
    }
  };

  const calculateCompoundInterest = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/compound-interest`, {
        principal: formData.principal,
        rate: formData.rate,
        time: formData.time,
        frequency: formData.frequency
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Magic failed u_u');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'simple') {
      calculateSimpleInterest();
    } else {
      calculateCompoundInterest();
    }
  };

  const reset = () => {
    setFormData({ principal: '', rate: '', time: '', frequency: '1' });
    setResult(null);
    setError('');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 sm:p-12">
      <FloatingElements />
      
      <div className="relative z-10 w-full max-w-sm glass-morphism rounded-[3rem] overflow-hidden transform transition-all duration-500 hover:rotate-1 shadow-[0_30px_100px_rgba(244,114,182,0.3)]">
        {/* Header */}
        <div className="bg-gradient-to-br from-soft-blue via-pink-300 to-soft-pink p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <Cat size={40} />
          </div>
          <div className="inline-block p-4 bg-white/30 rounded-full mb-3 backdrop-blur-md animate-pulse-kawaii shadow-lg">
            <Heart className="fill-white" size={28} />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-1 drop-shadow-lg font-mono">Interest.kawaii()</h1>
          <p className="text-xs opacity-90 font-bold uppercase tracking-widest bg-black/10 inline-block px-3 py-1 rounded-full">{"<dev_princess />"}</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/50 border-b-4 border-pink-100">
          <button
            onClick={() => { setActiveTab('simple'); setResult(null); }}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'simple' ? 'text-soft-blue border-b-4 border-soft-blue bg-white' : 'text-slate-300 hover:text-soft-blue'}`}
          >
            Simple ✨
          </button>
          <button
            onClick={() => { setActiveTab('compound'); setResult(null); }}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'compound' ? 'text-soft-pink border-b-4 border-soft-pink bg-white' : 'text-slate-300 hover:text-soft-pink'}`}
          >
            Compound 💖
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white/40">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <DollarSign size={12} /> Treasure Box
              </label>
              <input
                type="number"
                name="principal"
                value={formData.principal}
                onChange={handleInputChange}
                placeholder="1000"
                className="w-full p-3 bg-white/80 border-4 border-pink-50 rounded-2xl focus:border-soft-blue outline-none transition-all font-black text-slate-600 shadow-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Percent size={12} /> Bloom %
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  placeholder="5.0"
                  className="w-full p-3 bg-white/80 border-4 border-blue-50 rounded-2xl focus:border-soft-blue outline-none transition-all font-black text-slate-600 shadow-sm"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <Clock size={12} /> Moons
                </label>
                <input
                  type="number"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="2"
                  className="w-full p-3 bg-white/80 border-4 border-blue-50 rounded-2xl focus:border-soft-blue outline-none transition-all font-black text-slate-600 shadow-sm"
                  required
                />
              </div>
            </div>

            {activeTab === 'compound' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-2 px-1">
                  <RefreshCw size={12} /> Magic Spins
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-white/80 border-4 border-pink-50 rounded-2xl focus:border-soft-pink outline-none transition-all font-black text-slate-600 shadow-sm cursor-pointer appearance-none"
                >
                  <option value="1">Once a Year 🌸</option>
                  <option value="2">Twice a Year 🎀</option>
                  <option value="4">Seasonal ❄️</option>
                  <option value="12">Monthly 🌙</option>
                  <option value="365">Daily ✨</option>
                </select>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-100 text-red-500 text-[10px] font-black rounded-xl border-2 border-red-200 flex items-center gap-2 animate-bounce">
                <Heart size={12} fill="currentColor" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-white text-xs uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(244,114,182,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 ${
                activeTab === 'simple' ? 'bg-gradient-to-r from-soft-blue to-blue-400' : 'bg-gradient-to-r from-soft-pink to-pink-400'
              } ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Casting Spell...' : 'Summon Result! ✨'}
            </button>
          </form>

          {/* Result Section */}
          {result && (
            <div className="p-6 bg-white/90 rounded-[2rem] border-4 border-pink-100 shadow-inner animate-in zoom-in duration-500 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                <Cat size={80} />
              </div>
              <div className="text-center relative z-10">
                <p className="text-pink-300 text-[9px] font-black uppercase tracking-widest mb-1">Your Magic Fortune</p>
                <h2 className="text-4xl font-black text-slate-700 mb-4 tracking-tighter">${result.total}</h2>
                
                <div className="flex justify-center gap-4 border-t-2 border-pink-50 pt-4">
                  <div className="text-center px-2">
                    <p className="text-[8px] text-slate-300 font-black uppercase">Start</p>
                    <p className="text-sm font-black text-slate-500">${result.principal}</p>
                  </div>
                  <div className="text-center px-2">
                    <p className="text-[8px] text-pink-300 font-black uppercase">Glow</p>
                    <p className="text-sm font-black text-soft-pink">+{result.interest}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={reset}
                className="w-full mt-6 text-slate-300 hover:text-pink-400 text-[9px] font-black uppercase tracking-widest transition-colors"
              >
                (x) Clear Memories
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
