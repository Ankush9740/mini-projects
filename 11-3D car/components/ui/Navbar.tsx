'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { useConfigurator } from '@/lib/configuratorStore';
import { configuratorStore } from '@/lib/configuratorStore';

export function Navbar() {
  const { soundEnabled, isConfiguratorMode, activeSection } = useConfigurator();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'COLLECTION', href: '#showcase', id: 'showcase' },
    { label: 'PERFORMANCE', href: '#performance', id: 'performance' },
    { label: 'CONFIGURATOR', href: '#configurator', id: 'configurator' },
    { label: 'ABOUT', href: '#about', id: 'about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id === 'configurator') {
      configuratorStore.setConfiguratorMode(true);
    } else {
      configuratorStore.setConfiguratorMode(false);
    }

    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || isConfiguratorMode
            ? 'bg-[#060709]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-[#060709]/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero', 'hero')}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-2 h-2 bg-white rotate-45 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-125" />
            <span className="text-xl md:text-2xl font-light tracking-[0.35em] uppercase text-white font-display">
              AUREX
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 text-[11px] font-mono tracking-[0.25em] uppercase">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`relative py-1 transition-colors duration-300 ${
                    isActive ? 'text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Sound Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Audio Toggle */}
            <button
              onClick={() => configuratorStore.toggleSound()}
              className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-slate-400 hover:text-white transition-colors duration-300 p-1.5 rounded-sm hover:bg-white/5"
              title={soundEnabled ? 'Mute engine audio' : 'Enable engine audio'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Configurator Direct CTA */}
            <a
              href="#configurator"
              onClick={(e) => handleNavClick(e, '#configurator', 'configurator')}
              className="flex items-center space-x-2 px-4 py-2 border border-white/20 hover:border-white text-[11px] font-mono tracking-[0.2em] uppercase text-white transition-all duration-300 bg-white/5 hover:bg-white hover:text-black"
            >
              <span>CONFIGURE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => configuratorStore.toggleSound()}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#060709]/98 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.id)}
              className="text-lg font-light tracking-[0.35em] uppercase text-slate-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-8 border-t border-white/10 flex justify-center">
            <a
              href="#configurator"
              onClick={(e) => handleNavClick(e, '#configurator', 'configurator')}
              className="px-8 py-3 border border-white text-xs font-mono tracking-widest uppercase bg-white text-black"
            >
              ENTER CONFIGURATOR
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

