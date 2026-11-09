'use client';

import React from 'react';
import { ArrowUp, Globe, Mail, MapPin } from 'lucide-react';
import { configuratorStore } from '@/lib/configuratorStore';

export function Footer() {
  const scrollToTop = () => {
    configuratorStore.setConfiguratorMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040406] border-t border-white/10 text-slate-400 py-16 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Header & Newsletter / Atelier Inquiries */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rotate-45" />
              <span className="text-2xl font-light tracking-[0.35em] uppercase text-white font-display">
                AUREX
              </span>
            </div>
            <p className="text-xs font-light text-slate-400 leading-relaxed max-w-sm">
              High-performance automotive engineering atelier dedicated to the pursuit of mechanical purity, atmospheric combustion, and active aerodynamic supremacy.
            </p>
            <div className="flex items-center space-x-4 text-xs font-mono text-slate-300 pt-2">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>WEISSACH, GERMANY</span>
              </span>
              <span>//</span>
              <span className="flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-white" />
                <span>GLOBAL ATELIER</span>
              </span>
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-xs font-mono tracking-widest uppercase">
            <div className="space-y-3">
              <div className="text-white font-medium">EXPLORE</div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#hero" className="hover:text-white transition-colors">
                    OVERVIEW
                  </a>
                </li>
                <li>
                  <a href="#showcase" className="hover:text-white transition-colors">
                    SPECIFICATIONS
                  </a>
                </li>
                <li>
                  <a href="#performance" className="hover:text-white transition-colors">
                    PERFORMANCE
                  </a>
                </li>
                <li>
                  <a href="#configurator" className="hover:text-white transition-colors">
                    CONFIGURATOR
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-white font-medium">ATELIER</div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    PHILOSOPHY
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 cursor-not-allowed">BESPOKE COMMISSIONS</span>
                </li>
                <li>
                  <span className="text-slate-400 cursor-not-allowed">MOTORSPORT HERITAGE</span>
                </li>
                <li>
                  <span className="text-slate-400 cursor-not-allowed">CLIENT PORTAL</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter / Atelier Allocation Request */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-mono tracking-widest text-white uppercase">
              ATELIER INQUIRIES
            </div>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
              Register interest for next allocation window or bespoke design consultation.
            </p>
            <div className="flex border border-white/20 p-1 bg-black/60">
              <input
                type="email"
                placeholder="ATELIER@CLIENT.COM"
                className="bg-transparent text-xs font-mono text-white px-2 py-1.5 w-full focus:outline-none placeholder:text-slate-400"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert('Thank you for registering your inquiry with the AUREX Atelier.');
                }}
                className="px-3 py-1 bg-white text-black text-[10px] font-mono tracking-widest uppercase hover:bg-slate-200 transition-colors shrink-0"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest uppercase space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} AUREX AUTOMOTIVE AG. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <span>PRIVACY DOCTRINE</span>
            <span>//</span>
            <span>HOMOLOGATION DATA</span>
            <span>//</span>
            <span className="text-slate-400">3D MODEL: KAROL MIKLAS (CC-BY-SA 4.0)</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-white hover:text-slate-300 transition-colors"
          >
            <span>BACK TO APEX</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

