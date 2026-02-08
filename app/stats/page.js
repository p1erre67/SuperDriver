'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Stats() {
  const [avg, setAvg] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    supabase.from('ratings').select('score').then(res => {
      if (res.data.length) {
        const scores = res.data.map(r => r.score)
        setAvg((scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1))
        setCount(scores.length)
      }
    })
  }, [])

  return (
    <main className="h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Notes 🚗</h1>
        <p>Moyenne : ⭐ {avg}</p>
        <p>Trajets notés : {count}</p>
      </div>
    </main>
  )
}
