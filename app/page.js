'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [name, setName] = useState('')
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const submit = async () => {
    if (!name.trim()) {
      setError('Ton nom est obligatoire 😅')
      return
    }

    const { error } = await supabase.from('ratings').insert({ name, score, comment })
    if (error) {
      setError('Erreur lors de l’envoi')
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <main className="h-screen flex items-center justify-center text-center p-6">
        <div>
          <p className="text-4xl mb-4">🚗✨</p>
          <h1 className="text-xl font-bold">Merci {name} pour la note !</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex flex-col justify-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Note le trajet</h1>

      <input
        type="text"
        placeholder="Ton nom *"
        value={name}
        onChange={e => { setName(e.target.value); setError('') }}
        className="border rounded p-3 mb-4 w-full"
        required
      />

      <div className="flex justify-center gap-2 mb-6">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            onClick={() => setScore(n)}
            className={`text-3xl ${score >= n ? 'opacity-100' : 'opacity-30'}`}
          >
            ⭐
          </button>
        ))}
      </div>

      <textarea
        placeholder="Un commentaire ? (optionnel)"
        className="border rounded p-3 mb-4 w-full"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={submit}
        className="bg-black text-white py-3 rounded text-lg"
      >
        Envoyer
      </button>
    </main>
  )
}
