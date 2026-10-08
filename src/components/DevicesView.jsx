import React, { useState } from 'react';
import {
  Zap,
  Sun,
  Thermometer,
  Shield,
  Lock,
  Unlock,
  Tv,
  Coffee,
  Sparkles,
  Volume2
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function DevicesView({ devices, setDevices, addToast }) {
  const [selectedRoom, setSelectedRoom] = useState('All');
  const rooms = ['All', 'Living Room', 'Kitchen', 'Hallway', 'Entrance', 'Garden', 'Entire House'];

  const filtered = devices.filter((d) => selectedRoom === 'All' || d.room === selectedRoom);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Master Scene Triggers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="text-amber-400 w-7 h-7" />
            Smart Home & Room Control Center
          </h2>
          <p className="text-sm text-slate-400">
            Interactive lighting, climate, security locks, appliances and scene automations
          </p>
        </div>

        {/* Master Presets */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setDevices((prev) =>
                prev.map((d) => {
                  if (d.type === 'light')
                    return { ...d, state: { ...d.state, on: true, brightness: 100, color: '#f59e0b' } };
                  if (d.type === 'climate') return { ...d, state: { ...d.state, targetTemp: 71, mode: 'auto' } };
                  return d;
                })
              );
              addToast('Scene: "Home Relax" loaded 🛋️', 'success');
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            🛋️ Relax Scene
          </button>
          <button
            onClick={() => {
              setDevices((prev) =>
                prev.map((d) => {
                  if (d.type === 'light')
                    return { ...d, state: { ...d.state, on: true, brightness: 30, color: '#8b5cf6' } };
                  if (d.type === 'tv') return { ...d, state: { ...d.state, on: true, app: 'Netflix' } };
                  return d;
                })
              );
              addToast('Scene: "Movie Night" loaded 🍿', 'success');
            }}
            className="px-3.5 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            🍿 Movie Night
          </button>
          <button
            onClick={() => {
              setDevices((prev) =>
                prev.map((d) => {
                  if (d.type === 'light') return { ...d, state: { ...d.state, on: false } };
                  if (d.type === 'lock') return { ...d, state: { ...d.state, locked: true } };
                  if (d.type === 'security') return { ...d, state: { ...d.state, armed: 'away' } };
                  return d;
                })
              );
              addToast('Scene: "Leaving Home" — All lights OFF & Armed 🚗', 'alert');
            }}
            className="px-3.5 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/50 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            🚗 Leaving Home
          </button>
        </div>
      </div>

      {/* Room Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => {
              setSelectedRoom(room);
              sound.play('click');
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition ${
              selectedRoom === room
                ? 'bg-brand-600 text-white shadow-glow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {room}
          </button>
        ))}
      </div>

      {/* Smart Devices Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((device) => {
          // 1. LIGHT CONTROLLER CARD
          if (device.type === 'light') {
            const isOn = device.state.on;
            return (
              <div key={device.id} className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                          isOn
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <Sun className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{device.name}</h4>
                        <p className="text-xs text-slate-400">{device.room}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setDevices((prev) =>
                          prev.map((d) =>
                            d.id === device.id ? { ...d, state: { ...d.state, on: !d.state.on } } : d
                          )
                        );
                        sound.play('toggle');
                      }}
                      className={`w-14 h-8 rounded-full p-1 transition-colors ${
                        isOn ? 'bg-brand-600' : 'bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                          isOn ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>

                  {/* Brightness Slider */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300 font-medium">
                      <span>Brightness</span>
                      <span className="font-mono text-brand-300">{isOn ? `${device.state.brightness}%` : '0%'}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      disabled={!isOn}
                      value={device.state.brightness}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setDevices((prev) =>
                          prev.map((d) =>
                            d.id === device.id ? { ...d, state: { ...d.state, brightness: val } } : d
                          )
                        );
                      }}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer disabled:opacity-40"
                    />
                  </div>

                  {/* Color Preset Palette */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Color Presets:</span>
                    <div className="flex gap-2">
                      {['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#ffffff'].map((col, idx) => (
                        <button
                          key={idx}
                          disabled={!isOn}
                          onClick={() => {
                            setDevices((prev) =>
                              prev.map((d) =>
                                d.id === device.id ? { ...d, state: { ...d.state, color: col } } : d
                              )
                            );
                            sound.play('click');
                          }}
                          style={{ backgroundColor: col }}
                          className={`w-5 h-5 rounded-full border border-slate-700 hover:scale-125 transition ${
                            device.state.color === col ? 'ring-2 ring-brand-400' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Current Scene:</span>
                  <span className="font-medium text-amber-300">{isOn ? device.state.scene : 'Disabled'}</span>
                </div>
              </div>
            );
          }

          // 2. THERMOSTAT / CLIMATE CARD
          if (device.type === 'climate') {
            const currentTemp = device.state.currentTemp;
            const targetTemp = device.state.targetTemp;
            return (
              <div key={device.id} className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center">
                        <Thermometer className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{device.name}</h4>
                        <p className="text-xs text-slate-400">{device.room}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {device.state.mode.toUpperCase()}
                    </span>
                  </div>

                  {/* Temp Dial Controller */}
                  <div className="my-6 flex items-center justify-center gap-6">
                    <button
                      onClick={() => {
                        setDevices((prev) =>
                          prev.map((d) =>
                            d.id === device.id ? { ...d, state: { ...d.state, targetTemp: d.state.targetTemp - 1 } } : d
                          )
                        );
                        sound.play('click');
                      }}
                      className="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-lg font-bold text-slate-200 transition"
                    >
                      −
                    </button>

                    <div className="text-center">
                      <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                        {targetTemp}°F
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Current Room: <span className="text-cyan-300 font-bold">{currentTemp}°F</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setDevices((prev) =>
                          prev.map((d) =>
                            d.id === device.id ? { ...d, state: { ...d.state, targetTemp: d.state.targetTemp + 1 } } : d
                          )
                        );
                        sound.play('click');
                      }}
                      className="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-lg font-bold text-slate-200 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* HVAC Mode Select */}
                  <div className="grid grid-cols-3 gap-2">
                    {['cool', 'heat', 'eco'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setDevices((prev) =>
                            prev.map((d) => (d.id === device.id ? { ...d, state: { ...d.state, mode } } : d))
                          );
                          sound.play('click');
                        }}
                        className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                          device.state.mode === mode
                            ? 'bg-cyan-600 text-white shadow-glow-sm'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Fan Speed: Auto</span>
                  <span className="text-emerald-400 font-medium">Compressor Ready</span>
                </div>
              </div>
            );
          }

          // 3. SECURITY & DOOR LOCKS
          if (device.type === 'lock' || device.type === 'security') {
            const isLock = device.type === 'lock';
            const active = isLock ? device.state.locked : device.state.armed !== 'off';

            return (
              <div key={device.id} className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          active
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {isLock ? (
                          active ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />
                        ) : (
                          <Shield className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{device.name}</h4>
                        <p className="text-xs text-slate-400">{device.room}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {device.state.battery ? `${device.state.battery}% Batt` : 'AC Power'}
                    </span>
                  </div>

                  <div className="my-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
                    <div className={`text-lg font-bold ${active ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isLock
                        ? active
                          ? 'Secured & Bolted'
                          : 'Unlocked / Open'
                        : `Perimeter System ${active ? 'ARMED' : 'DISARMED'}`}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {isLock ? 'Auto-lock active (30s delay)' : '8 Window & Door sensors active'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (isLock) {
                        const nextLocked = !device.state.locked;
                        setDevices((prev) =>
                          prev.map((d) =>
                            d.id === device.id ? { ...d, state: { ...d.state, locked: nextLocked } } : d
                          )
                        );
                        addToast(
                          `${device.name} is now ${nextLocked ? 'LOCKED 🔒' : 'UNLOCKED 🔓'}`,
                          nextLocked ? 'success' : 'alert'
                        );
                      } else {
                        const nextArmed = device.state.armed === 'off' ? 'home' : 'off';
                        setDevices((prev) =>
                          prev.map((d) =>
                            d.id === device.id ? { ...d, state: { ...d.state, armed: nextArmed } } : d
                          )
                        );
                        addToast(`Security System ${nextArmed.toUpperCase()}`, nextArmed === 'off' ? 'alert' : 'success');
                      }
                    }}
                    className={`w-full py-3 rounded-2xl text-sm font-bold transition shadow-md ${
                      active
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow-sm'
                    }`}
                  >
                    {isLock ? (active ? 'Tap to Unlock' : 'Tap to Lock Now') : active ? 'Disarm Alarm' : 'Arm System Now'}
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Tamper Protection: Active</span>
                  <span className="text-emerald-400">Encrypted AES-256</span>
                </div>
              </div>
            );
          }

          // 4. SMART APPLIANCE / TV / ROBOT VACUUM / ESPRESSO
          return (
            <div key={device.id} className="glass-panel rounded-3xl p-6 shadow-glass flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center">
                      {device.type === 'tv' ? (
                        <Tv className="w-6 h-6" />
                      ) : device.type === 'coffee' ? (
                        <Coffee className="w-6 h-6" />
                      ) : (
                        <Sparkles className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{device.name}</h4>
                      <p className="text-xs text-slate-400">{device.room}</p>
                    </div>
                  </div>
                </div>

                {device.type === 'tv' && (
                  <div className="mt-6 space-y-3">
                    <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-medium">Currently Playing:</span>
                      <span className="text-xs font-bold text-brand-300">Netflix 4K HDR</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setDevices((prev) =>
                            prev.map((d) => (d.id === device.id ? { ...d, state: { ...d.state, on: !d.state.on } } : d))
                          );
                          sound.play('toggle');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold ${
                          device.state.on ? 'bg-slate-800 text-slate-300' : 'bg-brand-600 text-white'
                        }`}
                      >
                        {device.state.on ? 'Turn Off TV' : 'Power On TV'}
                      </button>
                      <button
                        onClick={() => {
                          setDevices((prev) =>
                            prev.map((d) =>
                              d.id === device.id
                                ? { ...d, state: { ...d.state, volume: Math.min(100, d.state.volume + 5) } }
                                : d
                            )
                          );
                          sound.play('click');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                      >
                        Vol + ({device.state.volume})
                      </button>
                    </div>
                  </div>
                )}

                {device.type === 'coffee' && (
                  <div className="mt-6 space-y-3">
                    <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-300">Water Tank:</span>
                      <span className="text-xs font-mono text-cyan-400 font-bold">{device.state.waterLevel}% Full</span>
                    </div>
                    <button
                      onClick={() => {
                        addToast('☕ Fresh Double Espresso is brewing!', 'success');
                      }}
                      className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-glow-sm transition"
                    >
                      Brew Fresh Espresso Now ☕
                    </button>
                  </div>
                )}

                {device.type === 'vacuum' && (
                  <div className="mt-6 space-y-3">
                    <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-300">Robot Status:</span>
                      <span className="text-xs font-bold text-cyan-400 capitalize">{device.state.status}</span>
                    </div>
                    <button
                      onClick={() => {
                        const next = device.state.status === 'cleaning' ? 'docked' : 'cleaning';
                        setDevices((prev) =>
                          prev.map((d) => (d.id === device.id ? { ...d, state: { ...d.state, status: next } } : d))
                        );
                        addToast(
                          next === 'cleaning'
                            ? 'RoboClean started cleaning session'
                            : 'RoboClean returning to base dock',
                          'info'
                        );
                      }}
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-glow-sm transition"
                    >
                      {device.state.status === 'cleaning' ? 'Return to Dock 🔌' : 'Start Full Clean 🧹'}
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Status: Online</span>
                <span className="text-emerald-400">Zigbee 3.0 Mesh</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
