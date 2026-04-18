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
      <div className="bg-brand-white-glass backdrop-blur-xl p-8 rounded-3xl border border-brand-yellow/30 text-center space-y-4 shadow-xl">
        <div className="text-4xl">🚀</div>
        <h3 className="text-2xl font-bold text-brand-charcoal">¡Estás dentro!</h3>
        <p className="text-brand-charcoal/60 italic font-garamond text-lg">Revisa tu bandeja de entrada. La Lección 1 te está esperando.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-white-glass backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white space-y-4 relative z-10">
      <div className="space-y-2">
        <label className="text-brand-charcoal text-sm font-bold ml-1">Nombre</label>
        <input 
          required
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre" 
          className="w-full px-4 py-3 rounded-xl bg-white/40 border border-brand-charcoal/10 text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-yellow transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label className="text-brand-charcoal text-sm font-bold ml-1">Email</label>
        <input 
          required
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com" 
          className="w-full px-4 py-3 rounded-xl bg-white/40 border border-brand-charcoal/10 text-brand-charcoal placeholder:text-brand-charcoal/30 focus:outline-none focus:border-brand-yellow transition-colors"
        />
      </div>
      
      {status === 'error' && (
        <p className="text-red-500 text-sm font-medium text-center">{errorMessage}</p>
      )}

      <button 
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-yellow text-brand-charcoal font-extrabold rounded-xl hover:bg-brand-gold hover:text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === 'loading' ? 'Inscribiendo...' : 'Inscribirme Gratis'}
      </button>
      
      <p className="text-brand-charcoal/40 text-[10px] text-center pt-2">
        Al inscribirte aceptas recibir lecciones diarias de IA por 7 días. Cero spam.
      </p>
    </form>
  );
}
