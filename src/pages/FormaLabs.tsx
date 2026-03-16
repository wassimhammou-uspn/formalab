import React, { useEffect, useState } from 'react';
import { Activity, Equipment } from '../types/formalabs';
import { ActivityCard } from '../components/ActivityCard';
import { EquipmentCard } from '../components/EquipmentCard';
import { Header } from '../components/Header';
import { fetchActivities, fetchEquipments, fetchLabs, LabSummary } from '../services/api';
import { ArrowRightIcon, FlaskConicalIcon } from 'lucide-react';

interface FormaLabsProps {
  onNavigateToLab: (labId: number) => void;
}

const SECTIONS = [
  { id: 'hero',        label: 'ACCUEIL'     },
  { id: 'activities',  label: 'ACTIVITÉS'   },
  { id: 'equipments',  label: 'ÉQUIPEMENTS' },
  { id: 'labs',        label: 'NOS LABS'    },
];

// ── Composant état vide / erreur ─────────────────────────────
function LoadingGrid({ cols = 3, rows = 1 }: { cols?: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div key={i} className="border border-dashed border-wireframe-border bg-white h-40 animate-pulse rounded" />
      ))}
    </>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="col-span-full p-6 border border-red-200 bg-red-50 rounded text-sm text-red-700 font-mono">
      ⚠ {message}
    </div>
  );
}

// ── Composant principal ──────────────────────────────────────
export function FormaLabs({ onNavigateToLab }: FormaLabsProps) {
  const [activities,  setActivities ] = useState<Activity[]>([]);
  const [equipments,  setEquipments ] = useState<Equipment[]>([]);
  const [labs,        setLabs       ] = useState<LabSummary[]>([]);
  const [loading,     setLoading    ] = useState(true);
  const [error,       setError      ] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [acts, equips, labList] = await Promise.all([
          fetchActivities(),
          fetchEquipments(),
          fetchLabs(),
        ]);
        setActivities(acts);
        setEquipments(equips);
        setLabs(labList);
      } catch (err: any) {
        setError(
          'Impossible de charger les données. Vérifiez que le backend est démarré sur le port 3001.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-wireframe-bg pb-20">
      <Header sections={SECTIONS} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="hero" className="relative bg-white border-b border-wireframe-border scroll-mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left */}
            <div className="py-20 px-6 lg:pr-12 relative z-10">
              <div className="inline-block px-3 py-1 mb-6 border border-uspn-blue/30 rounded-full text-xs font-mono text-uspn-navy bg-uspn-blue/5">
                UNIVERSITÉ FORMALABS
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-uspn-navy mb-6 tracking-tight">
                FormaLabs
              </h1>
              <p className="text-xl md:text-2xl text-wireframe-text max-w-xl font-light mb-8">
                Plateforme d'innovation et de création pour la vie étudiante. Un
                espace ouvert pour expérimenter, construire et collaborer.
              </p>
              <div className="flex gap-4 flex-wrap">
                {labs.length > 0 ? (
                  <button
                    onClick={() => onNavigateToLab(labs[0].id)}
                    className="px-6 py-3 bg-uspn-navy text-white font-medium rounded-md hover:bg-uspn-blue transition-colors"
                  >
                    Visiter {labs[0].name}
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-6 py-3 bg-uspn-navy/40 text-white font-medium rounded-md cursor-not-allowed"
                  >
                    Chargement…
                  </button>
                )}
                <button className="px-6 py-3 border border-uspn-navy/30 text-uspn-navy font-medium rounded-md hover:bg-uspn-navy/5 transition-colors">
                  En savoir plus
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-64 lg:h-auto">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${(import.meta as any).env.BASE_URL}images/crig.png)` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                }}
              />
              <div className="absolute inset-0 border-l-2 border-dashed border-wireframe-border/30 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-16">

        {/* ── Activités ──────────────────────────────────────── */}
        <section id="activities" className="mb-24 scroll-mt-24">
          <div className="flex items-end justify-between mb-10 border-b border-uspn-blue/20 pb-4">
            <h2 className="text-3xl font-bold text-uspn-navy">Nos Activités</h2>
            <span className="font-mono text-uspn-gray hidden md:block">01 — DOMAINES D'ACTION</span>
          </div>

          {error ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ErrorBanner message={error} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading
                ? <LoadingGrid cols={2} rows={3} />
                : activities.map(activity => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
            </div>
          )}
        </section>

        {/* ── Équipements ────────────────────────────────────── */}
        <section id="equipments" className="mb-24 scroll-mt-24">
          <div className="flex items-end justify-between mb-10 border-b border-uspn-blue/20 pb-4">
            <h2 className="text-3xl font-bold text-uspn-navy">Équipements Disponibles</h2>
            <span className="font-mono text-uspn-gray hidden md:block">02 — RESSOURCES TECHNIQUES</span>
          </div>

          {error ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ErrorBanner message={error} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? <LoadingGrid cols={3} rows={2} />
                : equipments.map(equipment => (
                    <EquipmentCard key={equipment.id} equipment={equipment} />
                  ))}
            </div>
          )}
        </section>

        {/* ── Nos Labs ───────────────────────────────────────── */}
        <section id="labs" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-10 border-b border-uspn-blue/20 pb-4">
            <h2 className="text-3xl font-bold text-uspn-navy">Nos Labs</h2>
            <span className="font-mono text-uspn-gray hidden md:block">03 — ESPACES DE CRÉATION</span>
          </div>

          {error ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ErrorBanner message={error} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? <LoadingGrid cols={3} rows={2} />
                : labs.map(lab => (
                    <div
                      key={lab.id}
                      onClick={() => onNavigateToLab(lab.id)}
                      className="p-6 border border-wireframe-border bg-white hover:border-uspn-blue/40 hover:bg-uspn-blue/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-uspn-blue/10 rounded-md">
                          <FlaskConicalIcon className="w-5 h-5 text-uspn-navy" />
                        </div>
                        <span className="text-xs font-mono text-uspn-gray border border-wireframe-border px-2 py-1 rounded">
                          {lab.room}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-uspn-navy mb-1">{lab.name}</h3>
                      <p className="text-xs font-mono text-uspn-blue mb-3">{lab.category}</p>
                      <p className="text-sm text-wireframe-text line-clamp-3 mb-4">{lab.mission}</p>
                      <div className="flex items-center text-xs font-mono text-uspn-gray group-hover:text-uspn-navy transition-colors">
                        <span>EXPLORER</span>
                        <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}