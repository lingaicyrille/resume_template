import Link from 'next/link'

const features = [
  {
    icon: '🌍',
    title: 'Communauté mondiale',
    description: 'Connectez-vous avec des Ivoiriens sur tous les continents — Europe, Amérique, Asie et partout ailleurs.',
  },
  {
    icon: '🤝',
    title: 'Associations & ONG',
    description: 'Créez et gérez des associations, organisez des événements, mobilisez votre communauté locale.',
  },
  {
    icon: '💼',
    title: 'Business & Commerce',
    description: 'Développez votre activité avec la confiance de la diaspora. Annuaire et marketplace ivoiriens.',
  },
  {
    icon: '📰',
    title: 'Actualités & Flash Info',
    description: "Restez informé des dernières nouvelles de Côte d'Ivoire et de la diaspora mondiale.",
  },
  {
    icon: '✈️',
    title: 'Immigration & Visa',
    description: 'Guides par pays, informations visa, ressources juridiques et conseils pratiques.',
  },
  {
    icon: '🌴',
    title: 'Tourisme Ivoirien',
    description: "Découvrez ou faites découvrir la Côte d'Ivoire — régions, culture et destinations.",
  },
  {
    icon: '💰',
    title: 'Tontine & Épargne',
    description: 'Créez des groupes de tontine numériques et gérez vos projets collectifs en toute confiance.',
  },
  {
    icon: '🎓',
    title: 'Mentorat',
    description: 'Connectez nouveaux arrivants et membres expérimentés pour partager conseils et opportunités.',
  },
  {
    icon: '🆘',
    title: 'Aide & Solidarité',
    description: 'Demandez ou offrez de l\'aide — logement, emploi, paperasse, urgences.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#F77F00]">PDI</span>
            <span className="text-sm text-gray-400 hidden sm:block">Platform Diaspora Ivoirienne</span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-[#F77F00] hover:text-[#F77F00] transition">
              Connexion
            </Link>
            <Link href="/auth/register"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#F77F00] rounded-lg hover:bg-orange-600 transition">
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F77F00] via-orange-500 to-orange-600 text-white py-28 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🇨🇮 La plateforme officielle de la diaspora ivoirienne
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            La diaspora ivoirienne,<br />
            <span className="text-yellow-300">unie dans le monde entier</span>
          </h1>
          <p className="text-xl text-orange-100 mb-10">
            Rejoignez des milliers d'Ivoiriens à travers le monde. Créez des liens,
            développez des activités et restez connectés à votre culture.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/register"
              className="px-8 py-4 bg-white text-[#F77F00] font-bold text-lg rounded-xl hover:bg-orange-50 transition shadow-lg">
              Rejoindre la communauté
            </Link>
            <Link href="/auth/login"
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition">
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-black text-center mb-4 text-gray-900">
          Tout ce dont vous avez besoin
        </h2>
        <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
          Une plateforme complète pensée pour la diaspora ivoirienne à travers tous les continents.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title}
              className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#F77F00]/30 transition group">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-[#F77F00] transition">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#009A44] text-white py-20 text-center px-6">
        <h2 className="text-3xl font-black mb-4">Prêt à rejoindre la famille ivoirienne ?</h2>
        <p className="text-green-100 mb-8 max-w-md mx-auto">
          Inscription gratuite. Votre communauté vous attend.
        </p>
        <Link href="/auth/register"
          className="inline-block px-10 py-4 bg-white text-[#009A44] font-bold text-lg rounded-xl hover:bg-green-50 transition shadow-lg">
          Créer mon compte gratuitement
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-8 text-center text-sm">
        <p>© 2026 Platform Diaspora Ivoirienne — Fait avec amour pour la Côte d'Ivoire 🇨🇮</p>
      </footer>

    </main>
  )
}
