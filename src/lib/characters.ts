/**
 * Marvel Rivals character data, challenge rules, and randomizer helpers.
 * Fan-made tool. Not affiliated with Marvel, NetEase Games, or their owners.
 */

export interface Character {
  id: string;
  name: string;
  role: 'Vanguard' | 'Duelist' | 'Strategist';
  style: string;
}

export type ChallengeRule = {
  id: string;
  text: string;
  name: string;
  description: string;
};

export const characters: Character[] = [
  { id: 'black-panther', name: 'Black Panther', role: 'Duelist', style: 'Dive Assassin' },
  { id: 'black-widow', name: 'Black Widow', role: 'Duelist', style: 'Long-range Pick' },
  { id: 'captain-america', name: 'Captain America', role: 'Vanguard', style: 'Frontline Dive' },
  { id: 'cloak-dagger', name: 'Cloak & Dagger', role: 'Strategist', style: 'Hybrid Support' },
  { id: 'doctor-strange', name: 'Doctor Strange', role: 'Vanguard', style: 'Shield Control' },
  { id: 'emma-frost', name: 'Emma Frost', role: 'Vanguard', style: 'Disruptive Tank' },
  { id: 'groot', name: 'Groot', role: 'Vanguard', style: 'Zone Builder' },
  { id: 'hela', name: 'Hela', role: 'Duelist', style: 'Precision Damage' },
  { id: 'hulk', name: 'Hulk', role: 'Vanguard', style: 'Brawler Tank' },
  { id: 'iron-fist', name: 'Iron Fist', role: 'Duelist', style: 'Melee Pressure' },
  { id: 'iron-man', name: 'Iron Man', role: 'Duelist', style: 'Aerial Damage' },
  { id: 'jeff-land-shark', name: 'Jeff the Land Shark', role: 'Strategist', style: 'Rescue Support' },
  { id: 'loki', name: 'Loki', role: 'Strategist', style: 'Trickster Support' },
  { id: 'luna-snow', name: 'Luna Snow', role: 'Strategist', style: 'Burst Healing' },
  { id: 'magik', name: 'Magik', role: 'Duelist', style: 'Portal Bruiser' },
  { id: 'magneto', name: 'Magneto', role: 'Vanguard', style: 'Barrier Tank' },
  { id: 'mantis', name: 'Mantis', role: 'Strategist', style: 'Buff Support' },
  { id: 'moon-knight', name: 'Moon Knight', role: 'Duelist', style: 'Area Damage' },
  { id: 'namor', name: 'Namor', role: 'Duelist', style: 'Turret Control' },
  { id: 'peni-parker', name: 'Peni Parker', role: 'Vanguard', style: 'Trap Defense' },
  { id: 'psylocke', name: 'Psylocke', role: 'Duelist', style: 'Stealth Burst' },
  { id: 'rocket-raccoon', name: 'Rocket Raccoon', role: 'Strategist', style: 'Utility Support' },
  { id: 'rogue', name: 'Rogue', role: 'Duelist', style: 'Power Steal' },
  { id: 'scarlet-witch', name: 'Scarlet Witch', role: 'Duelist', style: 'Chaos Damage' },
  { id: 'spider-man', name: 'Spider-Man', role: 'Duelist', style: 'High Mobility' },
  { id: 'squirrel-girl', name: 'Squirrel Girl', role: 'Duelist', style: 'Area Denial' },
  { id: 'star-lord', name: 'Star-Lord', role: 'Duelist', style: 'Mobile Shooter' },
  { id: 'storm', name: 'Storm', role: 'Duelist', style: 'Team Aura' },
  { id: 'the-punisher', name: 'The Punisher', role: 'Duelist', style: 'Hitscan Damage' },
  { id: 'thor', name: 'Thor', role: 'Vanguard', style: 'Brawl Engage' },
  { id: 'venom', name: 'Venom', role: 'Vanguard', style: 'Dive Tank' },
  { id: 'winter-soldier', name: 'Winter Soldier', role: 'Duelist', style: 'Combo Damage' },
  { id: 'wolverine', name: 'Wolverine', role: 'Duelist', style: 'Tank Shredder' },
];

export const challenges: ChallengeRule[] = [
  { id: 'never-pick-hero', name: 'Unfamiliar Territory', text: 'Play a hero you almost never pick and stay positive for the full match.', description: 'Play a hero you almost never pick and stay positive for the full match.' },
  { id: 'protect-support', name: 'Bodyguard Duty', text: 'Protect your Strategist first. Damage only matters after your support lives.', description: 'Protect your Strategist first. Damage only matters after your support lives.' },
  { id: 'no-comfort', name: 'No Comfort Picks', text: 'No comfort picks: reroll if you get your main hero.', description: 'Reroll if you get your main hero — try something new.' },
  { id: 'call-teamup', name: 'Team-Up Captain', text: 'Call one team-up idea before the first fight and commit to it.', description: 'Call one team-up idea before the first fight and commit to it.' },
  { id: 'objective-time', name: 'Point Player', text: 'Play for objective time. Your score is seconds on point, not eliminations.', description: 'Your score is seconds on point, not eliminations.' },
  { id: 'fill-missing', name: 'Flex Player', text: 'Pick a role your stack is missing and make the comp work.', description: 'Pick a role your stack is missing and make the comp work.' },
  { id: 'switch-angle', name: 'Angle Adjuster', text: 'After every lost fight, switch your angle before you switch your hero.', description: 'After every lost fight, switch your angle before you switch your hero.' },
  { id: 'highlight-play', name: 'Highlight Reel', text: 'Make one highlight play and share the result with your squad.', description: 'Make one highlight play and share the result with your squad.' },
  { id: 'lowest-pick', name: 'Underdog', text: 'Pick the hero with the lowest pick rate in the roster this week.', description: 'Pick the hero with the lowest pick rate in the roster this week.' },
  { id: 'swap-on-death', name: 'Hot Potato', text: 'Play with a friend: you swap heroes every time you die.', description: 'Play with a friend: you swap heroes every time you die.' },
  { id: 'stay-together', name: 'Buddy System', text: 'Stay with your designated teammate for every fight. Do not split.', description: 'Stay with your designated teammate for every fight. Do not split.' },
  { id: 'counter-ult', name: 'Discipline Wins', text: 'Let the enemy push first, then counter-ult. Win on discipline, not aggression.', description: 'Let the enemy push first, then counter-ult.' },
  { id: 'only-support', name: 'Support Hunt', text: 'You may only shoot the enemy Strategist. Duelists and Vanguards are off-limits.', description: 'You may only shoot the enemy Strategist.' },
  { id: 'heal-first', name: 'Tank First', text: 'Heal your Vanguard first every single time. No exceptions.', description: 'Heal your Vanguard first every single time. No exceptions.' },
  { id: 'last-pick-fill', name: 'True Flex', text: 'No hovering or pre-locking. Wait for your team to pick, then fill the missing role.', description: 'Wait for your team to pick, then fill the missing role.' },
];

export function getRandomCharacter(filter?: Character['role'] | 'all'): Character {
  const pool = filter && filter !== 'all'
    ? characters.filter((c) => c.role === filter)
    : characters;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomTeam(size: number = 6): Character[] {
  const shuffled = [...characters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(size, characters.length));
}

export function getRandomTeamBalanced(): Character[] {
  const vanguard = characters.filter((c) => c.role === 'Vanguard');
  const duelist = characters.filter((c) => c.role === 'Duelist');
  const strategist = characters.filter((c) => c.role === 'Strategist');
  const shuffled = (arr: Character[]) => [...arr].sort(() => Math.random() - 0.5);
  return [
    ...shuffled(vanguard).slice(0, 2),
    ...shuffled(duelist).slice(0, 2),
    ...shuffled(strategist).slice(0, 2),
  ].sort(() => Math.random() - 0.5);
}

export function getRandomChallenge(): ChallengeRule {
  return challenges[Math.floor(Math.random() * challenges.length)];
}

export function getRandomChallenges(count: number = 3): ChallengeRule[] {
  const shuffled = [...challenges].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
