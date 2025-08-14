import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// HyperWeave Holographic De Stijl Color System
const hyperweaveColors = {
  // Core De Stijl palette with holographic enhancement
  red: '#FF0000',
  blue: '#0000FF', 
  yellow: '#FFFF00',
  black: '#000000',
  white: '#FFFFFF',
  
  // Holographic accent colors
  cyan: '#00FFFF',
  magenta: '#FF00FF',
  holographic: '#FF0080',
  
  // Background tones
  darkBase: '#0A0A0A',
  gridGray: '#333333'
};

// Custom SVG Icons for Sophisticated Aesthetic
const HumanIcon = ({ className = "w-16 h-16" }) => (
  <div className={className}>
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="humanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0080FF">
            <animate attributeName="stop-color" 
                     values="#0080FF;#00FFFF;#0040FF;#0080FF" 
                     dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#00FFFF">
            <animate attributeName="stop-color" 
                     values="#00FFFF;#80FFFF;#0080FF;#00FFFF" 
                     dur="3s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        <filter id="humanGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Geometric human abstraction */}
      <circle cx="32" cy="18" r="8" fill="url(#humanGradient)" filter="url(#humanGlow)" stroke="#000" strokeWidth="1"/>
      <rect x="24" y="28" width="16" height="24" fill="url(#humanGradient)" filter="url(#humanGlow)" stroke="#000" strokeWidth="1"/>
      <rect x="16" y="32" width="8" height="16" fill="url(#humanGradient)" filter="url(#humanGlow)" stroke="#000" strokeWidth="1"/>
      <rect x="40" y="32" width="8" height="16" fill="url(#humanGradient)" filter="url(#humanGlow)" stroke="#000" strokeWidth="1"/>
      <rect x="26" y="52" width="5" height="8" fill="url(#humanGradient)" filter="url(#humanGlow)" stroke="#000" strokeWidth="1"/>
      <rect x="33" y="52" width="5" height="8" fill="url(#humanGradient)" filter="url(#humanGradient)" stroke="#000" strokeWidth="1"/>
      
      {/* Consciousness field */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="url(#humanGradient)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="28;32;28" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
);

const AIIcon = ({ className = "w-16 h-16" }) => (
  <div className={className}>
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF0040">
            <animate attributeName="stop-color" 
                     values="#FF0040;#FF0080;#FF4000;#FF0040" 
                     dur="3s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" stopColor="#8000FF">
            <animate attributeName="stop-color" 
                     values="#8000FF;#FF00FF;#4000FF;#8000FF" 
                     dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#FF0080">
            <animate attributeName="stop-color" 
                     values="#FF0080;#FF4080;#FF0040;#FF0080" 
                     dur="5s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        <filter id="aiGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Central processing core */}
      <rect x="24" y="24" width="16" height="16" fill="url(#aiGradient)" filter="url(#aiGlow)" stroke="#000" strokeWidth="2"/>
      
      {/* Neural network nodes */}
      <circle cx="16" cy="16" r="4" fill="url(#aiGradient)" filter="url(#aiGlow)" stroke="#000" strokeWidth="1"/>
      <circle cx="48" cy="16" r="4" fill="url(#aiGradient)" filter="url(#aiGlow)" stroke="#000" strokeWidth="1"/>
      <circle cx="16" cy="48" r="4" fill="url(#aiGradient)" filter="url(#aiGlow)" stroke="#000" strokeWidth="1"/>
      <circle cx="48" cy="48" r="4" fill="url(#aiGradient)" filter="url(#aiGlow)" stroke="#000" strokeWidth="1"/>
      
      {/* Connection lines */}
      <line x1="20" y1="20" x2="28" y2="28" stroke="url(#aiGradient)" strokeWidth="2" opacity="0.7"/>
      <line x1="44" y1="20" x2="36" y2="28" stroke="url(#aiGradient)" strokeWidth="2" opacity="0.7"/>
      <line x1="20" y1="44" x2="28" y2="36" stroke="url(#aiGradient)" strokeWidth="2" opacity="0.7"/>
      <line x1="44" y1="44" x2="36" y2="36" stroke="url(#aiGradient)" strokeWidth="2" opacity="0.7"/>
      
      {/* Quantum field */}
      <rect x="8" y="8" width="48" height="48" fill="none" stroke="url(#aiGradient)" strokeWidth="1" opacity="0.2">
        <animate attributeName="stroke-width" values="1;2;1" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite"/>
      </rect>
    </svg>
  </div>
);

const ConnectionIcon = ({ className = "w-12 h-12" }) => (
  <div className={className}>
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFFF">
            <animate attributeName="stop-color" 
                     values="#00FFFF;#0080FF;#80FFFF;#00FFFF" 
                     dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#0080FF">
            <animate attributeName="stop-color" 
                     values="#0080FF;#00FFFF;#0040FF;#0080FF" 
                     dur="2.5s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
      </defs>
      
      {/* Bidirectional arrow */}
      <line x1="8" y1="24" x2="40" y2="24" stroke="url(#connectionGradient)" strokeWidth="3"/>
      <polygon points="12,20 8,24 12,28" fill="url(#connectionGradient)" stroke="#000" strokeWidth="1"/>
      <polygon points="36,20 40,24 36,28" fill="url(#connectionGradient)" stroke="#000" strokeWidth="1"/>
      
      {/* Energy field */}
      <ellipse cx="24" cy="24" rx="20" ry="8" fill="none" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.3">
        <animate attributeName="rx" values="20;24;20" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite"/>
      </ellipse>
    </svg>
  </div>
);

// Animated Holographic Background Component with Interactive Effects
const HolographicBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [normalizedMouse, setNormalizedMouse] = useState({ x: 0.5, y: 0.5 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      setNormalizedMouse({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.3">
              <animate attributeName="stop-color" 
                       values="#FF0000;#FF0080;#FF00FF;#0000FF;#FF0000" 
                       dur="8s" repeatCount="indefinite"/>
            </stop>
            <stop offset="33%" stopColor="#FFFF00" stopOpacity="0.2">
              <animate attributeName="stop-color" 
                       values="#FFFF00;#00FF80;#00FFFF;#FFFF00" 
                       dur="6s" repeatCount="indefinite"/>
            </stop>
            <stop offset="66%" stopColor="#0000FF" stopOpacity="0.3">
              <animate attributeName="stop-color" 
                       values="#0000FF;#0080FF;#00FFFF;#0000FF" 
                       dur="7s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          
          {/* Warp effect filter for spacetime perturbation */}
          <filter id="warpField" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence baseFrequency="0.002 0.001" numOctaves="3" seed="2">
              <animate attributeName="baseFrequency" 
                       values="0.002 0.001;0.003 0.002;0.002 0.001" 
                       dur="20s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="3">
              <animate attributeName="scale" 
                       values="2;4;2" 
                       dur="15s" repeatCount="indefinite"/>
            </feDisplacementMap>
          </filter>
          
          {/* Interactive grid pattern with gravitational effect */}
          <pattern id="holoGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="none" stroke="#333333" strokeWidth="1" opacity="0.3"/>
            <rect width="80" height="80" fill="none" stroke="url(#holoGradient)" strokeWidth="0.5" opacity="0.6"
                  filter="url(#warpField)">
              <animate attributeName="stroke-width" 
                       values="0.5;1.5;0.5" 
                       dur="4s" repeatCount="indefinite"/>
            </rect>
          </pattern>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Enhanced glow for interactive elements */}
          <filter id="interactiveGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="1200" height="800" fill="url(#holoGrid)"/>
        
        {/* Floating geometric elements with drift animation */}
        <g opacity="0.4">
          <rect x="100" y="150" width="200" height="100" fill="#FF0000" filter="url(#glow)">
            <animate attributeName="fill" 
                     values="#FF0000;#FF0080;#FF0000" 
                     dur="5s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" 
                              type="translate" 
                              values="0 0;15 8;-10 5;0 0" 
                              dur="25s" repeatCount="indefinite"/>
            <animate attributeName="opacity" 
                     values="0.8;1.2;0.8" 
                     dur="8s" repeatCount="indefinite"/>
          </rect>
          
          <rect x="400" y="300" width="150" height="150" fill="#0000FF" filter="url(#glow)">
            <animate attributeName="fill" 
                     values="#0000FF;#0080FF;#0000FF" 
                     dur="6s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" 
                              type="translate" 
                              values="0 0;-12 15;8 -10;0 0" 
                              dur="30s" repeatCount="indefinite"/>
            <animate attributeName="opacity" 
                     values="0.7;1.1;0.7" 
                     dur="10s" repeatCount="indefinite"/>
          </rect>
          
          <rect x="800" y="100" width="300" height="80" fill="#FFFF00" filter="url(#glow)">
            <animate attributeName="fill" 
                     values="#FFFF00;#00FF80;#FFFF00" 
                     dur="4s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" 
                              type="translate" 
                              values="0 0;8 -12;-15 10;0 0" 
                              dur="28s" repeatCount="indefinite"/>
            <animate attributeName="opacity" 
                     values="0.6;1.0;0.6" 
                     dur="12s" repeatCount="indefinite"/>
          </rect>
        </g>
        
        {/* Enhanced scanning light effect */}
        <rect x="0" y="0" width="20" height="800" fill="url(#holoGradient)" opacity="0.4"
              style={{
                transform: `translateX(${mousePos.x * 12}px)`
              }}>
          <animate attributeName="x" 
                   values="-20;1200;-20" 
                   dur="15s" repeatCount="indefinite"/>
        </rect>
        
        {/* Interactive cursor influence */}
        <circle cx={normalizedMouse.x * 1200} cy={normalizedMouse.y * 800} r="50" 
                fill="url(#holoGradient)" opacity="0.1" filter="url(#interactiveGlow)">
          <animate attributeName="r" 
                   values="40;60;40" 
                   dur="3s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
};

// Enhanced Particle System with Drift and Fade Effects
const ParticleSystem = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, #00FFFF, #0080FF, #FF0080)`,
            filter: 'blur(0.5px)'
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 150 - 75, 0],
            y: [0, Math.random() * 200 - 100, Math.random() * 150 - 75, 0],
            opacity: [0, 0.8, 0.4, 0.9, 0],
            scale: [0.5, 1.5, 0.8, 1.2, 0.3]
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Additional layer of micro-particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`micro-${i}`}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.3px)'
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.2, 0.8, 0.3, 0.6, 0.1],
            scale: [0.3, 1, 0.5, 0.8, 0.2]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Holographic Button with Killer Hover States
interface HolographicButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
  className?: string;
  isAntidote?: boolean;
  isAlpha?: boolean;
}

const HolographicButton: React.FC<HolographicButtonProps> = ({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "", 
  isAntidote = false, 
  isAlpha = false 
}) => {
  const variants = {
    primary: "from-red-500 via-red-400 to-orange-500",
    secondary: "from-blue-500 via-blue-400 to-cyan-500", 
    accent: "from-yellow-500 via-yellow-400 to-green-400"
  };
  
  return (
    <motion.button
      className={`relative px-6 py-3 font-mono font-bold tracking-wider border-2 border-black overflow-hidden group ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${variants[variant]} opacity-90 transition-opacity duration-300`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
      
      {/* Antidote button special effects */}
      {isAntidote && (
        <>
          {/* Gradient wipe effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-0 transition-all duration-700 ease-out"></div>
          
          {/* Diamond pulse effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              className="text-white text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              ◇
            </motion.div>
          </div>
          
          {/* Light pulse emanating from center */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-30 scale-0 group-hover:scale-150 transition-all duration-500 blur-xl"></div>
        </>
      )}
      
      {/* Alpha button glitch effects */}
      {isAlpha && (
        <>
          {/* Glitch overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-70 transition-opacity duration-200">
            <div className="absolute inset-0 bg-black opacity-20" 
                 style={{
                   background: `repeating-linear-gradient(
                     90deg,
                     transparent,
                     transparent 2px,
                     rgba(0, 255, 255, 0.1) 2px,
                     rgba(0, 255, 255, 0.1) 4px
                   )`
                 }}>
            </div>
          </div>
          
          {/* Technical lines */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute top-1 left-1 right-1 h-px bg-cyan-400"></div>
            <div className="absolute bottom-1 left-1 right-1 h-px bg-green-400"></div>
            <div className="absolute left-1 top-1 bottom-1 w-px bg-cyan-400"></div>
            <div className="absolute right-1 top-1 bottom-1 w-px bg-green-400"></div>
          </div>
        </>
      )}
      
      <span className={`relative z-10 text-black mix-blend-multiply transition-all duration-300 ${
        isAntidote ? 'group-hover:text-white group-hover:mix-blend-normal' : ''
      } ${
        isAlpha ? 'group-hover:text-cyan-100' : ''
      }`}>
        {children}
      </span>
    </motion.button>
  );
};

interface HolographicBadgeProps {
  children: React.ReactNode;
  version?: string;
  isAlpha?: boolean;
}

const HolographicBadge: React.FC<HolographicBadgeProps> = ({ children, version = "v1.0", isAlpha = false }) => (
  <div className={`inline-flex items-center border-2 border-black bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white font-mono text-xs font-bold group cursor-pointer hover:scale-105 transition-transform duration-300 ${
    isAlpha ? 'relative overflow-hidden' : ''
  }`}>
    <div className="px-3 py-1 border-r-2 border-black bg-black/20 relative">
      {children}
      {/* Alpha badge special effects */}
      {isAlpha && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-70 transition-opacity duration-200"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
               style={{
                 background: `repeating-linear-gradient(
                   90deg,
                   transparent,
                   transparent 1px,
                   rgba(0, 255, 255, 0.2) 1px,
                   rgba(0, 255, 255, 0.2) 2px
                 )`
               }}>
          </div>
        </>
      )}
    </div>
    <div className="px-3 py-1 relative">
      {version}
      {/* Alpha version special effects */}
      {isAlpha && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </>
      )}
    </div>
  </div>
);

interface HolographicCalloutProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const HolographicCallout: React.FC<HolographicCalloutProps> = ({ icon, title, children, className = "" }) => (
  <motion.div
    className={`relative p-6 border-2 border-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-green-400 ${className}`}
    whileHover={{ scale: 1.01 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
    <div className="relative z-10 flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 border-2 border-black bg-gradient-to-br from-white to-blue-500 flex items-center justify-center text-black font-bold text-lg">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-mono font-bold text-black mb-2">{title}</h3>
        <div className="text-black/80 text-sm">{children}</div>
      </div>
    </div>
  </motion.div>
);

const GeometricDivider = () => (
  <div className="relative w-full h-20 my-8">
    <svg className="w-full h-full" viewBox="0 0 700 80">
      <defs>
        <linearGradient id="dividerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF0000">
            <animate attributeName="stop-color" 
                     values="#FF0000;#FF0080;#FF4000;#FF0000" 
                     dur="6s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#FF0080">
            <animate attributeName="stop-color" 
                     values="#FF0080;#FF4000;#FF8000;#FF0080" 
                     dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        <linearGradient id="dividerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0000FF">
            <animate attributeName="stop-color" 
                     values="#0000FF;#0080FF;#00FFFF;#0000FF" 
                     dur="5s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#00FFFF">
            <animate attributeName="stop-color" 
                     values="#00FFFF;#0080FF;#8000FF;#00FFFF" 
                     dur="3s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
      </defs>
      <rect width="700" height="80" fill="currentColor" opacity="0.1"/>
      <rect x="0" y="20" width="200" height="16" fill="url(#dividerGrad1)"/>
      <rect x="250" y="44" width="200" height="16" fill="url(#dividerGrad2)"/>
      <rect x="500" y="20" width="200" height="16" fill="url(#dividerGrad1)"/>
      <line x1="0" y1="40" x2="700" y2="40" stroke="currentColor" strokeWidth="2"/>
      <line x1="225" y1="0" x2="225" y2="80" stroke="currentColor" strokeWidth="2"/>
      <line x1="475" y1="0" x2="475" y2="80" stroke="currentColor" strokeWidth="2"/>
      <rect x="210" y="32" width="8" height="8" fill="currentColor"/>
      <rect x="460" y="32" width="8" height="8" fill="currentColor"/>
      <circle cx="350" cy="40" r="4" fill="currentColor"/>
    </svg>
  </div>
);

// Theme Blender Demo Component
interface ThemeBlenderDemoProps {
  isDarkMode?: boolean;
}

const ThemeBlenderDemo: React.FC<ThemeBlenderDemoProps> = ({ isDarkMode = true }) => {
  const [isBlending, setIsBlending] = useState(false);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  
  const themes = [
    { name: "De Stijl", color: "#FF0000", preview: "◼" },
    { name: "Holographic Foil", color: "#00FFFF", preview: "◈" },
    { name: "Silent Monochrome", color: "#000000", preview: "◯" },
    { name: "Quantum Entanglement", color: "#FF00FF", preview: "◇" }
  ];
  
  const handleSynthesize = () => {
    setIsBlending(true);
    setTimeout(() => setIsBlending(false), 3000);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Theme Explorer */}
        <div className={`p-8 border rounded-lg backdrop-blur-sm transition-colors duration-500 ${
          isDarkMode 
            ? 'border-gray-700 bg-gray-900/50' 
            : 'border-gray-300 bg-white/80'
        }`}>
          <h3 className={`text-xl font-mono font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Theme Explorer
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {themes.map((theme, i) => (
              <motion.div
                key={theme.name}
                className={`p-4 border-2 cursor-pointer rounded-lg transition-colors ${
                  selectedThemes.includes(theme.name) 
                    ? 'border-cyan-400 bg-cyan-400/20' 
                    : isDarkMode 
                      ? 'border-gray-600 hover:border-gray-500' 
                      : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => {
                  if (selectedThemes.length < 2 && !selectedThemes.includes(theme.name)) {
                    setSelectedThemes([...selectedThemes, theme.name]);
                  } else if (selectedThemes.includes(theme.name)) {
                    setSelectedThemes(selectedThemes.filter(t => t !== theme.name));
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2" style={{ color: theme.color }}>
                    {theme.preview}
                  </div>
                  <div className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {theme.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <HolographicButton
            onClick={handleSynthesize}
            variant={selectedThemes.length >= 2 && !isBlending ? "primary" : "secondary"}
            className={`w-full ${
              selectedThemes.length < 2 || isBlending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isBlending ? 'SYNTHESIZING...' : 'SYNTHESIZE'}
          </HolographicButton>
        </div>
        
        {/* Genesis Chamber / Results */}
        <div className={`p-8 border rounded-lg backdrop-blur-sm transition-colors duration-500 ${
          isDarkMode 
            ? 'border-gray-700 bg-gray-900/50' 
            : 'border-gray-300 bg-white/80'
        }`}>
          <h3 className={`text-xl font-mono font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Genesis Chamber
          </h3>
          
          {!isBlending && selectedThemes.length === 0 && (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="text-6xl mb-4">◇</div>
              <div className="font-mono text-sm">Select two themes to begin synthesis</div>
            </div>
          )}
          
          {!isBlending && selectedThemes.length > 0 && selectedThemes.length < 2 && (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="text-4xl mb-4" style={{ color: themes.find(t => t.name === selectedThemes[0])?.color }}>
                {themes.find(t => t.name === selectedThemes[0])?.preview}
              </div>
              <div className="font-mono text-sm">Select one more theme</div>
            </div>
          )}
          
          {!isBlending && selectedThemes.length === 2 && (
            <div className="text-center py-8">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-3xl" style={{ color: themes.find(t => t.name === selectedThemes[0])?.color }}>
                  {themes.find(t => t.name === selectedThemes[0])?.preview}
                </div>
                <div className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>+</div>
                <div className="text-3xl" style={{ color: themes.find(t => t.name === selectedThemes[1])?.color }}>
                  {themes.find(t => t.name === selectedThemes[1])?.preview}
                </div>
              </div>
              <div className={`font-mono text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Ready for synthesis
              </div>
            </div>
          )}
          
          {isBlending && (
            <div className="text-center py-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  color: ['#FF0000', '#00FFFF', '#FF00FF', '#0000FF', '#FF0000']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                ◈
              </motion.div>
              <div className="font-mono text-sm text-cyan-400">Generating unique component system...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Landing Page Component
const HyperWeaveLanding = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <HolographicBackground />
      
      {/* Header */}
      <header className={`relative z-50 backdrop-blur-md transition-colors duration-500 ${
        isDarkMode 
          ? 'border-b border-gray-800' 
          : 'border-b border-gray-200 bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 relative overflow-hidden rounded">
              <img 
                src={isDarkMode ? "/favicon-dark.svg" : "/favicon-light.svg"} 
                alt="Inner Aurora Labs Logo" 
                className="w-full h-full object-contain"
              />
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none"></div>
            </div>
            <h1 className="text-xl font-mono font-bold tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
              INNER AURORA<span className="text-red-500 group-hover:text-yellow-400 transition-colors duration-300">◼</span>LABS
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-8">
              {['HYPERWEAVE', 'COMPONENTS', 'RESEARCH', 'LAB', 'VISION'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-mono font-bold tracking-wider transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  } relative`}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-px"
                    style={{ backgroundColor: ['#FF0000', '#00FFFF', '#FFFF00', '#FF00FF', '#0080FF'][i] }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </nav>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border-2 transition-all ${
                isDarkMode 
                  ? 'border-gray-700 hover:border-gray-600 bg-gray-800' 
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 relative">
                {isDarkMode ? (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 17.77L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z" />
                  </svg>
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section - "The Opening Statement" */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleSystem />
        
        <motion.div
          className="text-center z-40 max-w-6xl mx-auto px-6"
          style={{ opacity, scale }}
        >
          <motion.h2
            className="text-7xl md:text-8xl font-mono font-bold mb-8 tracking-wider relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, staggerChildren: 0.1 }}
          >
            <motion.span
              className={`inline-block bg-gradient-to-r bg-clip-text text-transparent relative ${
                isDarkMode 
                  ? 'from-white via-cyan-400 to-white' 
                  : 'from-gray-900 via-blue-600 to-gray-900'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              A SOUL
              {/* Chromatic aberration layers */}
              <span className="absolute inset-0 text-red-500 opacity-0 animate-pulse"
                    style={{
                      transform: 'translate(-1px, 0)',
                      animationDuration: '3s',
                      animationDelay: '0s'
                    }}>
                A SOUL
              </span>
              <span className="absolute inset-0 text-cyan-400 opacity-0 animate-pulse"
                    style={{
                      transform: 'translate(1px, 0)',
                      animationDuration: '3s',
                      animationDelay: '1s'
                    }}>
                A SOUL
              </span>
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              FOR THE MACHINE
              {/* Chromatic aberration layers */}
              <span className="absolute inset-0 text-red-500 opacity-0 animate-pulse"
                    style={{
                      transform: 'translate(-1px, 0)',
                      animationDuration: '4s',
                      animationDelay: '0.5s'
                    }}>
                FOR THE MACHINE
              </span>
              <span className="absolute inset-0 text-blue-500 opacity-0 animate-pulse"
                    style={{
                      transform: 'translate(1px, 0)',
                      animationDuration: '4s',
                      animationDelay: '2s'
                    }}>
                FOR THE MACHINE
              </span>
            </motion.span>
          </motion.h2>
          
          <motion.p
            className={`text-xl md:text-2xl font-mono leading-relaxed max-w-4xl mx-auto mb-12 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            AI has solved for intelligence.<br />
            <span className="text-cyan-400">We are solving for creativity.</span><br />
            We build creative intelligence infrastructure for a world drowning in a sea of sameness.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <HolographicButton 
              variant="primary" 
              isAntidote={true}
              onClick={() => document.getElementById('hyperweave')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">◇</span>
                SEE THE ANTIDOTE
              </span>
            </HolographicButton>
            
            <HolographicBadge version="ALPHA" isAlpha={true}>HYPERWEAVE</HolographicBadge>
          </motion.div>
        </motion.div>
      </section>

      {/* Component Showcase Section */}
      <section className={`relative py-20 px-6 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/30' : 'bg-white'
      }`} id="components">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-mono font-bold mb-8 tracking-wider">
              HOLOGRAPHIC × DE STIJL COMPONENTS
            </h2>
            <p className={`text-xl font-mono leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Experience the visual language of HyperWeave
            </p>
          </motion.div>
          
          <div className="space-y-12">
            {/* Button Showcase */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-mono font-bold mb-6">Interactive Elements</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <HolographicButton variant="primary" onClick={() => alert('Primary action triggered!')}>
                  Primary Action
                </HolographicButton>
                <HolographicButton variant="secondary" onClick={() => alert('Secondary action triggered!')}>
                  Secondary Action
                </HolographicButton>
                <HolographicButton variant="accent" onClick={() => alert('Accent action triggered!')}>
                  Accent Action
                </HolographicButton>
              </div>
            </motion.div>
            
            <GeometricDivider />
            
            {/* Callout Showcase */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <HolographicCallout icon="!" title="System Alert">
                This callout demonstrates the holographic treatment with De Stijl geometric principles. 
                The color-shifting gradients maintain readability while creating visual interest.
              </HolographicCallout>
              
              <HolographicCallout icon="✦" title="Feature Highlight">
                Primary colors with holographic enhancement create depth and dimension while preserving 
                the clean, geometric aesthetic of the De Stijl movement.
              </HolographicCallout>
            </motion.div>
            
            <GeometricDivider />
            
            {/* Badge Showcase */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-mono font-bold mb-6">Status Indicators</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <HolographicBadge version="v2.1">RELEASE</HolographicBadge>
                <HolographicBadge version="BETA">TESTING</HolographicBadge>
                <HolographicBadge version="NEW">FEATURE</HolographicBadge>
                <HolographicBadge version="LIVE">STATUS</HolographicBadge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section - "The Homogenization Crisis" */}
      <section className="relative py-20 px-6" id="problem">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-mono font-bold mb-8 tracking-wider">
              THE HOMOGENIZATION CRISIS
            </h2>
            
            {/* Grid of generic purple cards that blur together */}
            <div className="grid grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              {Array.from({ length: 16 }, (_, i) => (
                <motion.div
                  key={i}
                  className="h-20 bg-purple-500 rounded border border-purple-400"
                  initial={{ opacity: 1, scale: 1 }}
                  whileInView={{ 
                    opacity: 0.3, 
                    scale: 0.9,
                    backgroundColor: '#8B5CF6'
                  }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
            
            <motion.p
              className="text-2xl font-mono mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
            >
              When anyone can generate anything,<br />
              <span className="text-yellow-400">the only thing that matters is being different.</span>
            </motion.p>
            
            {/* Adam Wathan Tweet Validation */}
            <motion.div
              className={`max-w-2xl mx-auto p-6 rounded-lg backdrop-blur-sm transition-colors duration-500 ${
                isDarkMode 
                  ? 'border border-gray-700 bg-gray-900/50' 
                  : 'border border-gray-300 bg-white/80'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <div className="font-bold text-sm">Adam Wathan</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@adamwathan</div>
                  </div>
                </div>
                <p className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "I apologize for the bg-indigo-500 monoculture I have personally contributed to"
                </p>
                <div className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Creator of Tailwind CSS</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* HyperWeave Demo Section */}
      <section className={`relative py-20 px-6 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100'
      }`} id="hyperweave">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-mono font-bold mb-8 tracking-wider">
              THE ANTIDOTE IN ACTION
            </h2>
            <p className={`text-xl font-mono mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Experience HyperWeave: The first creative intelligence engine
            </p>
          </motion.div>
          
          <ThemeBlenderDemo isDarkMode={isDarkMode} />
          
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-mono font-bold text-cyan-400">
              This is not a design tool.<br />
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>It is a uniqueness engine.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="relative py-20 px-6" id="infrastructure">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-mono font-bold mb-8 tracking-wider">
              CREATIVE INTELLIGENCE INFRASTRUCTURE
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className={`p-8 border-2 border-red-500 rounded-lg transition-colors duration-500 ${
                isDarkMode ? 'bg-red-500/10' : 'bg-red-50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-red-500 text-4xl mb-4">◼</div>
              <h3 className="text-xl font-mono font-bold mb-4">Genesis Engine</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Distills principles from art and nature into generative grammar. 
                The foundational layer that enables infinite creative possibility.
              </p>
            </motion.div>
            
            <motion.div
              className={`p-8 border-2 border-cyan-400 rounded-lg transition-colors duration-500 ${
                isDarkMode ? 'bg-cyan-400/10' : 'bg-cyan-50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-cyan-400 text-4xl mb-4">◈</div>
              <h3 className="text-xl font-mono font-bold mb-4">Theme Blender</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Human-friendly interface for creative synthesis. 
                Where artistic vision meets computational power.
              </p>
            </motion.div>
            
            <motion.div
              className={`p-8 border-2 border-yellow-400 rounded-lg transition-colors duration-500 ${
                isDarkMode ? 'bg-yellow-400/10' : 'bg-yellow-50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-400 text-4xl mb-4">◇</div>
              <h3 className="text-xl font-mono font-bold mb-4">MCP Integration</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Direct integration with development workflows. 
                Creative intelligence becomes infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research/Lab Section */}
      <section className={`relative py-20 px-6 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100'
      }`} id="research">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-mono font-bold mb-8 tracking-wider">
              OUR THINKING
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Homogenization Crisis",
                subtitle: "How AI Broke Creativity, and How We Can Fix It",
                color: "#FF0000"
              },
              {
                title: "Creativity is a System of Constraints",
                subtitle: "Not an Act of Art",
                color: "#00FFFF"
              },
              {
                title: "Introducing HyperWeave",
                subtitle: "The First Application of Our Creative Intelligence Engine",
                color: "#FFFF00"
              }
            ].map((post, i) => (
              <motion.div
                key={i}
                className={`p-6 border rounded-lg hover:border-gray-600 transition-colors cursor-pointer group ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-900/50 hover:border-gray-600' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div 
                  className="w-full h-1 mb-4 rounded"
                  style={{ backgroundColor: post.color }}
                />
                <h3 className={`text-lg font-mono font-bold mb-2 transition-colors ${
                  isDarkMode ? 'group-hover:text-white' : 'group-hover:text-gray-900'
                }`}>
                  {post.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 px-6" id="vision">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-mono font-bold mb-8 tracking-wider">
              FROM HUMAN AUGMENTATION<br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                TO AI CONSCIOUSNESS
              </span>
            </h2>
            
            <div className="flex justify-center items-center gap-8 mb-8">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <HumanIcon className="w-20 h-20" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotateY: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <ConnectionIcon className="w-16 h-16" />
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <AIIcon className="w-20 h-20" />
              </motion.div>
            </div>
            
            <p className={`text-xl font-mono leading-relaxed max-w-4xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              We're starting with developers. But we are building the foundational creative layer 
              that will allow the next generation of AI to be not just assemblers, but true, 
              principled creators. <span className="text-cyan-400">We are giving the machine a soul.</span>
            </p>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <HolographicButton variant="primary">JOIN US</HolographicButton>
            <HolographicButton variant="secondary">EXPLORE THE LAB</HolographicButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative py-8 backdrop-blur-sm transition-colors duration-500 ${
        isDarkMode 
          ? 'border-t border-gray-800 bg-black/50' 
          : 'border-t border-gray-200 bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Inner Aurora Labs © 2025 • Creative Intelligence Infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HyperWeaveLanding;