'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users, Calendar, Briefcase, MessageCircle, TrendingUp,
  MapPin, Globe, ArrowRight, Bell, Flame, Star, Clock,
} from 'lucide-react'
import { AppLayout } from '@/components/layout/app-layout'
import { StatCard } from '@/components/ui/stat-card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// ─── Mock data (replaced by real API calls as modules are built) ────────────

const mockActivity = [
  { id: 1, type: 'member', text: 'Kouamé Diallo a rejoint la communauté depuis Toronto', time: 'Il y a 5 min', icon: Users, color: 'bg-blue-50 text-blue-500' },
  { id: 2, type: 'event', text: "Nouvel événement : Soirée culturelle ivoirienne à Paris", time: 'Il y a 18 min', icon: Calendar, color: 'bg-purple-50 text-purple-500' },
  { id: 3, type: 'business', text: "Aya Konaté a référencé son entreprise 'AK Cosmetics'", time: 'Il y a 1h', icon: Briefcase, color: 'bg-ci-orange-light text-ci-orange' },
  { id: 4, type: 'message', text: 'Nouveau message dans le groupe "Ivoiriens à Bruxelles"', time: 'Il y a 2h', icon: MessageCircle, color: 'bg-indigo-50 text-indigo-500' },
  { id: 5, type: 'news', text: "Flash info : Résultats des élections communautaires 2026", time: 'Il y a 3h', icon: Flame, color: 'bg-red-50 text-red-500' },
]

const mockEvents = [
  { id: 1, title: 'Soirée culturelle ivoirienne', location: 'Paris, France', date: '3 Mai 2026', attendees: 47, type: 'Culturel' },
  { id: 2, title: 'Webinaire : Business & diaspora', location: 'En ligne', date: '8 Mai 2026', attendees: 120, type: 'Business' },
  { id: 3, title: 'Journée de la diaspora CI', location: 'Bruxelles, Belgique', date: '15 Mai 2026', attendees: 230, type: 'Communauté' },
]

const mockMembers = [
  { id: 1, name: 'Fatou Diomandé', country: 'France', city: 'Paris', avatar: 'F', score: 92 },
  { id: 2, name: 'Brice Yao', country: 'Canada', city: 'Montréal', avatar: 'B', score: 87 },
  { id: 3, name: 'Hortense Bamba', country: 'Belgique', city: 'Bruxelles', avatar: 'H', score: 84 },
  { id: 4, name: 'Sékou Traoré', country: 'Allemagne', city: 'Berlin', avatar: 'S', score: 79 },
]

const quickLinks = [
  { href: '/community', icon: Users, label: 'Communauté', desc: 'Groupes par région', color: 'text-blue-500', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
  { href: '/events', icon: Calendar, label: 'Événements', desc: 'À venir près de vous', color: 'text-purple-500', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
  { href: '/business', icon: Briefcase, label: 'Business', desc: 'Annuaire ivoirien', color: 'text-ci-orange', bg: 'bg-ci-orange-light', border: 'hover:border-orange-200' },
  { href: '/news', icon: Flame, label: 'Flash Info', desc: 'Actualités du jour', color: 'text-red-500', bg: 'bg-red-50', border: 'hover:border-red-200' },
  { href: '/immigration', icon: Globe, label: 'Immigration', desc: 'Guides par pays', color: 'text-sky-500', bg: 'bg-sky-50', border: 'hover:border-sky-200' },
  { href: '/messaging', icon: MessageCircle, label: 'Messagerie', desc: '3 messages non lus', color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'hover:border-indigo-200' },
]

// ─── Page ────────────────────────────────────────────────

interface UserProfile {
  id: number
  full_name: string
  first_name: string
  email: string
  country_of_residence: string
  continent: string
  city: string
  is_verified: boolean
  trust_score: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) { router.push('/auth/login'); return }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setUser)
      .catch(() => { localStorage.clear(); router.push('/auth/login') })
  }, [router])

  const handleLogout = () => { localStorage.clear(); router.push('/') }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-ci-orange/20 border-t-ci-orange rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <AppLayout title="Tableau de bord" user={user} onLogout={handleLogout}>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* ── Welcome banner ── */}
        <div className="relative bg-gradient-to-br from-[#0D1117] to-[#1a1a2e] rounded-2xl p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-ci-orange/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-ci-orange/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/50 text-sm mb-1">Bienvenue de retour 👋</p>
                <h2 className="text-2xl font-black text-white mb-1">{user.first_name} !</h2>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  {user.city || user.country_of_residence ? (
                    <>
                      <MapPin size={13} />
                      <span>{[user.city, user.country_of_residence].filter(Boolean).join(', ')}</span>
                    </>
                  ) : (
                    <span>Complétez votre profil pour apparaître sur la carte</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {user.is_verified && (
                  <Badge variant="green">✓ Vérifié</Badge>
                )}
                <div className="flex items-center gap-1.5 bg-white/8 px-3 py-1.5 rounded-xl">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-sm font-bold">Score {user.trust_score}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Membres diaspora" value="15 240" change="124 ce mois" positive icon={Users} />
          <StatCard label="Événements à venir" value="34" change="8 près de vous" positive icon={Calendar} iconBg="bg-purple-50" iconColor="text-purple-500" />
          <StatCard label="Businesses actifs" value="1 205" change="32 nouveaux" positive icon={Briefcase} iconBg="bg-ci-green-light" iconColor="text-ci-green" />
          <StatCard label="Messages non lus" value="3" icon={MessageCircle} iconBg="bg-indigo-50" iconColor="text-indigo-500" />
        </div>

        {/* ── Quick access ── */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 text-sm">Accès rapide</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickLinks.map(link => (
              <a key={link.href} href={link.href}
                className={cn(
                  'bg-white rounded-2xl p-4 border border-gray-100 transition-all duration-200 group cursor-pointer',
                  'hover:shadow-card-hover', link.border
                )}>
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', link.bg)}>
                  <link.icon size={18} className={link.color} />
                </div>
                <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{link.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{link.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-5 gap-5">

          {/* Activity feed — 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Bell size={15} className="text-ci-orange" /> Activité récente
              </h3>
              <button className="text-xs text-ci-orange font-semibold hover:underline flex items-center gap-1">
                Tout voir <ArrowRight size={12} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {mockActivity.map(item => (
                <div key={item.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', item.color)}>
                    <item.icon size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — 2 cols */}
          <div className="lg:col-span-2 space-y-5">

            {/* Upcoming events */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Calendar size={15} className="text-purple-500" /> Événements à venir
                </h3>
                <button className="text-xs text-ci-orange font-semibold hover:underline flex items-center gap-1">
                  Voir tout <ArrowRight size={12} />
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {mockEvents.map(ev => (
                  <div key={ev.id} className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 leading-snug truncate">{ev.title}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                          <MapPin size={10} /> {ev.location}
                        </div>
                      </div>
                      <Badge variant={ev.type === 'Business' ? 'orange' : ev.type === 'Communauté' ? 'green' : 'purple'}>
                        {ev.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {ev.date}</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {ev.attendees} inscrits</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Members nearby */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <TrendingUp size={15} className="text-ci-green" /> Membres populaires
                </h3>
                <button className="text-xs text-ci-orange font-semibold hover:underline flex items-center gap-1">
                  Explorer <ArrowRight size={12} />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {mockMembers.map(m => (
                  <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-gradient-ci flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {m.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{m.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={9} /> {m.city}, {m.country}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star size={11} className="fill-amber-400" /> {m.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
