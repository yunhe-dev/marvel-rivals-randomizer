import { useState, useCallback, useMemo } from 'react';
import {
  characters,
  getRandomCharacter,
  getRandomTeam,
  getRandomTeamBalanced,
  getRandomChallenge,
  getRandomChallenges,
  type Character,
  type ChallengeRule,
} from '@/lib/characters';
import type { Character as CharType } from '@/lib/characters';

type RoleFilter = CharType['role'] | 'all';
type Mode = 'hero' | 'team' | 'challenge' | 'wheel';

const roleColors: Record<string, string> = {
  Vanguard: 'bg-blue-600/20 text-blue-400 border-blue-500/40',
  Duelist: 'bg-red-600/20 text-red-400 border-red-500/40',
  Strategist: 'bg-green-600/20 text-green-400 border-green-500/40',
};

const roleIcons: Record<string, string> = {
  Vanguard: '🛡️',
  Duelist: '⚔️',
  Strategist: '💚',
};

function CharacterCard({ character, large }: { character: Character; large?: boolean }) {
  return (
    <div
      className={`rounded-xl border ${roleColors[character.role]} flex flex-col items-center justify-center p-4 text-center transition-all hover:scale-105 ${large ? 'min-h-[180px]' : 'min-h-[120px]'}`}
    >
      <div className="text-3xl mb-1">{roleIcons[character.role]}</div>
      <div className={`font-bold ${large ? 'text-xl' : 'text-sm'}`}>{character.name}</div>
      <div className="text-xs opacity-70 mt-0.5">{character.role}</div>
    </div>
  );
}

function HeroRandomizer() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [current, setCurrent] = useState<Character | null>(null);
  const [spinning, setSpinning] = useState(false);

  const handleRandomize = useCallback(() => {
    setSpinning(true);
    // Fast cycling animation
    let count = 0;
    const interval = setInterval(() => {
      const filtered = roleFilter === 'all' ? characters : characters.filter((c) => c.role === roleFilter);
      setCurrent(filtered[Math.floor(Math.random() * filtered.length)]);
      count++;
      if (count >= 10) {
        clearInterval(interval);
        setCurrent(getRandomCharacter(roleFilter === 'all' ? undefined : roleFilter));
        setSpinning(false);
      }
    }, 60);
  }, [roleFilter]);

  return (
    <div className="space-y-6">
      {/* Role Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['all', 'Vanguard', 'Duelist', 'Strategist'] as const).map((role) => (
          <button
            key={role}
            onClick={() => {
              setRoleFilter(role);
              setCurrent(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              roleFilter === role
                ? role === 'all'
                  ? 'bg-white/20 border-white/40 text-white'
                  : `${roleColors[role]} border-opacity-100`
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
            }`}
          >
            {role === 'all' ? '🎲 All' : `${roleIcons[role]} ${role}`}
          </button>
        ))}
      </div>

      {/* Result */}
      {current && (
        <div className="max-w-xs mx-auto">
          <CharacterCard character={current} large />
        </div>
      )}

      {!current && !spinning && (
        <div className="text-center text-white/40 py-12">
          <div className="text-5xl mb-4">🎲</div>
          <p>Click "Randomize" to pick a hero</p>
        </div>
      )}

      {spinning && !current && (
        <div className="text-center text-white/40 py-12">
          <div className="text-5xl mb-4 animate-spin">🎰</div>
          <p>Spinning...</p>
        </div>
      )}

      {/* Randomize Button */}
      <div className="text-center">
        <button
          onClick={handleRandomize}
          disabled={spinning}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-50 text-lg shadow-lg"
        >
          {spinning ? '🎰 Spinning...' : '🎲 Randomize'}
        </button>
      </div>
    </div>
  );
}

function TeamRandomizer() {
  const [team, setTeam] = useState<Character[]>([]);
  const [balanced, setBalanced] = useState(true);
  const [spinning, setSpinning] = useState(false);

  const handleGenerate = useCallback(() => {
    setSpinning(true);
    setTimeout(() => {
      setTeam(balanced ? getRandomTeamBalanced() : getRandomTeam(6));
      setSpinning(false);
    }, 400);
  }, [balanced]);

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex justify-center gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={balanced}
            onChange={(e) => setBalanced(e.target.checked)}
            className="rounded border-white/20 bg-white/5"
          />
          <span>2-2-2 Balanced</span>
        </label>
      </div>

      {/* Team Grid */}
      {team.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {team.map((char, i) => (
            <CharacterCard key={`${char.id}-${i}`} character={char} />
          ))}
        </div>
      )}

      {team.length === 0 && !spinning && (
        <div className="text-center text-white/40 py-12">
          <div className="text-5xl mb-4">👥</div>
          <p>Click "Generate Team" to create a random team</p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={spinning}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all disabled:opacity-50 text-lg shadow-lg"
        >
          {spinning ? '⏳ Generating...' : '👥 Generate Team'}
        </button>
      </div>
    </div>
  );
}

function ChallengeGenerator() {
  const [challenges, setChallenges] = useState<ChallengeRule[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleGenerate = useCallback(() => {
    setSpinning(true);
    setTimeout(() => {
      setChallenges(showAll ? getRandomChallenges(5) : [getRandomChallenge()]);
      setSpinning(false);
    }, 300);
  }, [showAll]);

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="flex justify-center gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
            className="rounded border-white/20 bg-white/5"
          />
          <span>Generate 5 challenges</span>
        </label>
      </div>

      {/* Challenges */}
      {challenges.length > 0 && (
        <div className="space-y-3 max-w-lg mx-auto">
          {challenges.map((c, i) => (
            <div key={c.id} className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <div className="font-bold">
                    {showAll && challenges.length > 1 && (
                      <span className="text-amber-400 mr-2">#{i + 1}</span>
                    )}
                    {c.name}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{c.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {challenges.length === 0 && !spinning && (
        <div className="text-center text-white/40 py-12">
          <div className="text-5xl mb-4">🔥</div>
          <p>Click "Generate Challenge" to get a fun challenge rule</p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={spinning}
          className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold rounded-xl hover:from-orange-500 hover:to-red-400 transition-all disabled:opacity-50 text-lg shadow-lg"
        >
          {spinning ? '⏳ Generating...' : '🔥 Generate Challenge'}
        </button>
      </div>
    </div>
  );
}

function CharacterGallery() {
  const [role, setRole] = useState<CharType['role'] | 'all'>('all');

  const filtered = useMemo(
    () => (role === 'all' ? characters : characters.filter((c) => c.role === role)),
    [role],
  );

  const grouped = useMemo(() => {
    const g: Record<string, Character[]> = {};
    for (const c of filtered) {
      if (!g[c.role]) g[c.role] = [];
      g[c.role].push(c);
    }
    return g;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['all', 'Vanguard', 'Duelist', 'Strategist'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              role === r
                ? r === 'all'
                  ? 'bg-white/20 border-white/40 text-white'
                  : `${roleColors[r]} border-opacity-100`
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
            }`}
          >
            {r === 'all' ? '🎲 All' : `${roleIcons[r]} ${r}`} ({r === 'all' ? characters.length : filtered.length})
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}

function WheelRandomizer() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Character | null>(null);
  const [mode, setMode] = useState<'hero' | 'role'>('hero');

  const handleSpin = useCallback(() => {
    setSpinning(true);
    setResult(null);
    let count = 0;
    const interval = setInterval(() => {
      const filtered = mode === 'hero' ? characters : characters;
      setResult(filtered[Math.floor(Math.random() * filtered.length)]);
      count++;
      if (count >= 15) {
        clearInterval(interval);
        setResult(
          mode === 'hero'
            ? getRandomCharacter()
            : getRandomCharacter(['Vanguard', 'Duelist', 'Strategist'][Math.floor(Math.random() * 3)] as CharType['role']),
        );
        setSpinning(false);
      }
    }, 80);
  }, [mode]);

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode('hero')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            mode === 'hero' ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-white/60'
          }`}
        >
          🎯 Random Hero
        </button>
        <button
          onClick={() => setMode('role')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            mode === 'role' ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-white/60'
          }`}
        >
          🎲 Random Role
        </button>
      </div>

      {/* Wheel visualization */}
      <div className="flex justify-center">
        <div className={`w-48 h-48 rounded-full border-4 border-white/20 flex items-center justify-center transition-all ${spinning ? 'animate-spin' : ''}`}>
          <div className="text-center">
            {result ? (
              <>
                <div className="text-4xl">{roleIcons[result.role]}</div>
                <div className="font-bold mt-1">{result.name}</div>
                <div className="text-xs opacity-70">{result.role}</div>
              </>
            ) : (
              <>
                <div className="text-4xl">🎯</div>
                <div className="text-xs mt-1 text-white/40">{spinning ? 'Spinning...' : 'Ready'}</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-500 hover:to-teal-400 transition-all disabled:opacity-50 text-lg shadow-lg"
        >
          {spinning ? '🎡 Spinning...' : '🎯 Spin the Wheel'}
        </button>
      </div>
    </div>
  );
}

const tabs: { id: Mode; label: string; icon: string }[] = [
  { id: 'hero', label: 'Random Hero', icon: '🎲' },
  { id: 'team', label: 'Team Generator', icon: '👥' },
  { id: 'challenge', label: 'Challenge', icon: '🔥' },
  { id: 'wheel', label: 'Spin Wheel', icon: '🎡' },
];

export function HomePage() {
  const [activeTab, setActiveTab] = useState<Mode>('hero');

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroRandomizer />;
      case 'team':
        return <TeamRandomizer />;
      case 'challenge':
        return <ChallengeGenerator />;
      case 'wheel':
        return <WheelRandomizer />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Hero Section */}
      <div className="text-center pt-16 pb-8 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Marvel Rivals <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Randomizer</span>
        </h1>
        <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
          Random hero picker, team generator, challenge creator, and character wheel for Marvel Rivals players.
          Fan-made tool — not affiliated with Marvel or NetEase.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto px-4 mb-6">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center text-xs text-amber-400/70">
          ⚠️ This is a fan-made tool. Not affiliated with Marvel, NetEase Games, or their respective owners.
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2 bg-white/5 rounded-2xl p-1.5 border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/15 text-white shadow-lg'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
          {renderContent()}
        </div>

        {/* Character Gallery */}
        <div className="mt-12" id="gallery">
          <h2 className="text-2xl font-bold text-center mb-6">
            🦸 All Characters
          </h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <CharacterGallery />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12" id="faq">
          <h2 className="text-2xl font-bold text-center mb-6">❓ FAQ</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                q: 'What is a Marvel Rivals randomizer?',
                a: 'A fan-made tool that randomly selects a hero, generates a team composition, creates challenge rules, or spins a character wheel for Marvel Rivals players. Great for quick pick games, content creation, or fun challenges with friends.',
              },
              {
                q: 'How does the team randomizer work?',
                a: "You can generate a random 6-player team. Enable '2-2-2 Balanced' to get 2 Vanguards, 2 Duelists, and 2 Strategists for a well-rounded comp.",
              },
              {
                q: 'Can I filter by role?',
                a: "Yes! In the Random Hero mode, you can filter by Vanguard (tank), Duelist (DPS), or Strategist (support) to only randomize within a specific role. The Character Gallery also supports role filtering.",
              },
              {
                q: 'Is this official?',
                a: "No, this is a fan-made tool. We are not affiliated with Marvel, NetEase Games, or any of their partners. All character names and images belong to their respective owners.",
              },
              {
                q: 'How many characters are included?',
                a: `Currently there are ${characters.length} playable characters across Vanguard, Duelist, and Strategist roles, updated with the latest roster.`,
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group"
              >
                <summary className="px-5 py-3.5 font-medium cursor-pointer hover:bg-white/5 transition-colors flex items-center gap-2">
                  <span className="text-lg">{faq.q}</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-white/70 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
        <p>Marvel Rivals Randomizer — Fan-made tool for Marvel Rivals players</p>
        <p className="mt-1">Not affiliated with Marvel or NetEase Games.</p>
      </footer>
    </div>
  );
}
