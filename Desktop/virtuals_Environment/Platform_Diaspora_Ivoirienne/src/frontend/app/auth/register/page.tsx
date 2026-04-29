'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CONTINENTS = [
  { value: 'AF', label: 'Afrique' },
  { value: 'EU', label: 'Europe' },
  { value: 'NA', label: 'Amérique du Nord' },
  { value: 'SA', label: 'Amérique du Sud' },
  { value: 'AS', label: 'Asie' },
  { value: 'OC', label: 'Océanie' },
  { value: 'ME', label: 'Moyen-Orient' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: '', password: '', password_confirm: '',
    first_name: '', last_name: '',
    country_of_residence: '', city: '', continent: '',
    preferred_language: 'fr',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        const messages = Object.entries(data)
          .map(([k, v]) => `${k}: ${(v as string[]).join(', ')}`)
          .join(' | ')
        throw new Error(messages)
      }
      router.push('/auth/login?registered=1')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-black text-[#F77F00]">PDI</Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">Rejoignez la communauté ivoirienne mondiale</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input type="text" required value={form.first_name} onChange={e => set('first_name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/40 focus:border-[#F77F00]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input type="text" required value={form.last_name} onChange={e => set('last_name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/40 focus:border-[#F77F00]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/40 focus:border-[#F77F00]"
              placeholder="votre@email.com" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Continent</label>
              <select value={form.continent} onChange={e => set('continent', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/40 focus:border-[#F77F00]">
                <option value="">Choisir...</option>
                {CONTINENTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pays de résidence</label>
              <input type="text" value={form.country_of_residence} onChange={e => set('country_of_residence', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/40 focus:border-[#F77F00]"
                placeholder="Ex: France" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input type="password" required value={form.password} onChange={e => set('password', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/40 focus:border-[#F77F00]"
              placeholder="Minimum 8 caractères" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input type="password" required value={form.password_confirm} onChange={e => set('password_confirm', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/40 focus:border-[#F77F00]" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#F77F00] text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:opacity-50">
            {loading ? 'Création du compte...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Déjà membre ?{' '}
          <Link href="/auth/login" className="text-[#F77F00] font-semibold hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
