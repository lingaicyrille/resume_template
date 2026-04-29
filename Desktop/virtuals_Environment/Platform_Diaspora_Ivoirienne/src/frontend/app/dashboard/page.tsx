'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: number
  full_name: string
  first_name: string
  email: string
  country_of_residence: string
  continent: string
  is_verified: boolean
  trust_score: number
}

const cards = [
  { icon: '👥', title: 'Communauté', desc: 'Rejoignez des groupes et discutez avec la diaspora', href: '#' },
  { icon: '📅', title: 'Événements', desc: 'Découvrez et créez des événements près de chez vous', href: '#' },
  { icon: '💼', title: 'Business', desc: 'Trouvez ou annoncez des services ivoiriens', href: '#' },
  { icon: '📰', title: 'Actualités', desc: "Les dernières nouvelles de Côte d'Ivoire", href: '#' },
  { icon: '✈️', title: 'Immigration', desc: 'Guides et ressources pour votre pays de résidence', href: '#' },
  { icon: '🤝', title: 'Aide & Solidarité', desc: "Demandez ou offrez de l'aide à la communauté", href: '#' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) { router.push('/auth/login'); return }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => {
        if (!r.ok) throw new Error()
        return r.json()
      })
      .then(setUser)
      .catch(() => { localStorage.clear(); router.push('/auth/login') })
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-sm">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="font-black text-[#F77F00] text-xl">PDI</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F77F00] flex items-center justify-center text-white text-sm font-bold">
              {user.first_name[0]}
            </div>
            <span className="text-gray-700 text-sm font-medium">{user.full_name}</span>
            {user.is_verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Vérifié</span>}
          </div>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-red-500 transition">
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Bienvenue, {user.first_name} ! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            {user.country_of_residence
              ? `Connecté depuis ${user.country_of_residence}`
              : 'Votre tableau de bord diaspora'}
            {' · '}Score de confiance : <span className="font-semibold text-[#F77F00]">{user.trust_score}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(card => (
            <a key={card.title} href={card.href}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#F77F00]/30 transition group cursor-pointer">
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#F77F00] transition">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}
