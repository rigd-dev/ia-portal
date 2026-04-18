'use client';

import { useState } from 'react';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, score: 0, utm_source: 'homepage' }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json();
        setErrorMessage(data.error?.message || 'Error al suscribirse');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Error de conexión');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white/10 p-8 rounded-3xl border border-amber-400/50 text-center space-y-4">
        <div className="text-4xl">🚀</div>
        <h3 className="text-2xl font-bold text-white">¡Estás dentro!</h3>
        <p className="text-neutral-400">Revisa tu bandeja de entrada. La Lección 1 te está esperando.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black p-8 rounded-3xl shadow-2xl border border-white/5 space-y-4">
      <div className="space-y-2">
        <label className="text-white text-sm font-bold ml-1">Nombre</label>
        <input 
          required
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre" 
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-white text-sm font-bold ml-1">Email</label>
        <input 
          required
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com" 
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>
      
      {status === 'error' && (
        <p className="text-red-400 text-sm font-medium text-center">{errorMessage}</p>
      )}

      <button 
        disabled={status === 'loading'}
        className="w-full py-4 bg-amber-400 text-black font-extrabold rounded-xl hover:bg-amber-300 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Inscribiendo...' : 'Inscribirme Gratis'}
      </button>
      
      <p className="text-white/40 text-[10px] text-center pt-2">
        Al inscribirte aceptas recibir lecciones diarias de IA por 7 días. Cero spam.
      </p>
    </form>
  );
}
