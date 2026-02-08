'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const submit = async () => {
    await supabase.from('ratings').insert({ score, comment })
    setSent(true)
  }

  if (sent) {
    return (
      <main className="h-screen flex items-center justify-center text-center p-6">
        <div>
          <p className="text-4xl mb-4">🚗✨</p>
          <h1 className="text-xl font-bold">Merci pour la note !</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen flex flex-col justify-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Note le trajet
      </h1>

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

      <button
        onClick={submit}
        className="bg-black text-white py-3 rounded text-lg"
      >
        Envoyer
      </button>
    </main>
  )
}
