
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EasterEgg {
  id: string;
  title: string;
  type: 'diss' | 'freestyle' | 'underground' | 'feature' | 'skit';
  year: number;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  details: string;
  trivia: string[];
}

const EasterEggs = () => {
  const [selectedEgg, setSelectedEgg] = useState<EasterEgg | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const easterEggs: EasterEgg[] = [
    {
      id: '1',
      title: 'Nail in the Coffin',
      type: 'diss',
      year: 2002,
      description: 'The devastating response to Benzino that ended careers.',
      rarity: 'legendary',
      details: 'This track was Eminem\'s nuclear response to Benzino and The Source magazine. The wordplay and aggression on this track is unmatched.',
      trivia: [
        'Recorded in one take',
        'Features one of Em\'s fastest flows',
        'Benzino never recovered from this',
        'Contains 47 different rhyme schemes'
      ]
    },
    {
      id: '2',
      title: 'The Wash (Freestyle)',
      type: 'freestyle',
      year: 2001,
      description: 'Unreleased freestyle over "The Wash" beat.',
      rarity: 'rare',
      details: 'A bonus track that showcases Eminem\'s ability to freestyle over any beat. Pure technical skill on display.',
      trivia: [
        'Never officially released',
        'Features complex internal rhymes',
        'Referenced in later songs',
        'Fan favorite at concerts'
      ]
    },
    {
      id: '3',
      title: 'Difficult',
      type: 'underground',
      year: 2009,
      description: 'Emotional tribute to his childhood friend Proof.',
      rarity: 'legendary',
      details: 'One of the most emotional tracks Eminem ever recorded. Raw pain and vulnerability rarely heard in hip-hop.',
      trivia: [
        'Leaked online before official release',
        'Made fans cry worldwide',
        'Features live vocals',
        'Written in one night'
      ]
    },
    {
      id: '4',
      title: 'Forever (Verse)',
      type: 'feature',
      year: 2009,
      description: 'The verse that broke the internet.',
      rarity: 'legendary',
      details: 'Drake\'s song became Eminem\'s moment. This verse redefined what a guest feature could be.',
      trivia: [
        'Fastest rap verse of 2009',
        'Spawned countless reaction videos',
        'Featured 78 different rhymes',
        'Drake said it was intimidating'
      ]
    },
    {
      id: '5',
      title: 'Ken Kaniff Skit',
      type: 'skit',
      year: 2000,
      description: 'The most outrageous skit in hip-hop history.',
      rarity: 'common',
      details: 'Eminem\'s alter ego Ken Kaniff became a running joke that fans still reference today.',
      trivia: [
        'Voiced by Eminem himself',
        'Became internet meme before memes',
        'Referenced in multiple albums',
        'Inspired countless parodies'
      ]
    },
    {
      id: '6',
      title: 'Any Man (Remix)',
      type: 'underground',
      year: 1998,
      description: 'Pre-fame Em destroying the underground scene.',
      rarity: 'rare',
      details: 'Before the world knew Eminem, this track was circulating in Detroit\'s underground scene.',
      trivia: [
        'Recorded on 4-track equipment',
        'Caught Dr. Dre\'s attention',
        'Features early Slim Shady persona',
        'Only 500 copies existed'
      ]
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'rare': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'diss': return '⚔️';
      case 'freestyle': return '🎤';
      case 'underground': return '🔥';
      case 'feature': return '🤝';
      case 'skit': return '🎭';
      default: return '🎵';
    }
  };

  const filteredEggs = activeTab === 'all' 
    ? easterEggs 
    : easterEggs.filter(egg => egg.type === activeTab);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white graffiti-text mb-4">
            <span className="text-em-red">EASTER EGGS</span>
          </h1>
          <p className="text-xl text-gray-400">Hidden gems from the vault</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-6 bg-em-gray">
            <TabsTrigger value="all" className="data-[state=active]:bg-em-red">All</TabsTrigger>
            <TabsTrigger value="diss" className="data-[state=active]:bg-em-red">Disses</TabsTrigger>
            <TabsTrigger value="freestyle" className="data-[state=active]:bg-em-red">Freestyles</TabsTrigger>
            <TabsTrigger value="underground" className="data-[state=active]:bg-em-red">Underground</TabsTrigger>
            <TabsTrigger value="feature" className="data-[state=active]:bg-em-red">Features</TabsTrigger>
            <TabsTrigger value="skit" className="data-[state=active]:bg-em-red">Skits</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEggs.map((egg) => (
                <Card 
                  key={egg.id}
                  className="bg-em-gray border-em-red/20 hover:border-em-red transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => setSelectedEgg(egg)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{getTypeIcon(egg.type)}</div>
                      <Badge className={`border ${getRarityColor(egg.rarity)}`}>
                        {egg.rarity}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-em-red transition-colors mb-2">
                      {egg.title}
                    </h3>
                    
                    <p className="text-em-red font-semibold mb-2">{egg.year}</p>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {egg.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="border-em-red/50 text-em-red">
                        {egg.type}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-em-red hover:bg-em-red/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEgg(egg);
                        }}
                      >
                        Unlock
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Easter Egg Details Modal */}
        {selectedEgg && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <Card className="bg-em-gray border-em-red max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">{getTypeIcon(selectedEgg.type)}</div>
                    <div>
                      <h2 className="text-3xl font-bold text-white graffiti-text">
                        {selectedEgg.title}
                      </h2>
                      <p className="text-em-red text-xl font-semibold">{selectedEgg.year}</p>
                      <Badge className={`border mt-2 ${getRarityColor(selectedEgg.rarity)}`}>
                        {selectedEgg.rarity} {selectedEgg.type}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedEgg(null)}
                    className="text-white hover:text-em-red text-2xl"
                  >
                    ✕
                  </Button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 text-lg mb-6">{selectedEgg.description}</p>
                  
                  <div className="bg-em-dark p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">Details:</h3>
                    <p className="text-gray-300">{selectedEgg.details}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Trivia & Facts:</h3>
                    <div className="space-y-3">
                      {selectedEgg.trivia.map((fact, index) => (
                        <div 
                          key={index}
                          className="bg-em-dark p-4 rounded border-l-4 border-em-red"
                        >
                          <span className="text-gray-300">💡 {fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center space-x-4">
                  <Button className="bg-em-red hover:bg-em-red/80">
                    Listen Now
                  </Button>
                  <Button variant="outline" className="border-em-red text-em-red hover:bg-em-red hover:text-white">
                    Share Discovery
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-em-gray p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-white graffiti-text mb-8">
            COLLECTION STATS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-em-red mb-2">
                {easterEggs.filter(e => e.rarity === 'legendary').length}
              </div>
              <div className="text-gray-400">Legendary</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {easterEggs.filter(e => e.rarity === 'rare').length}
              </div>
              <div className="text-gray-400">Rare</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-400 mb-2">
                {easterEggs.filter(e => e.rarity === 'common').length}
              </div>
              <div className="text-gray-400">Common</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-em-red mb-2">{easterEggs.length}</div>
              <div className="text-gray-400">Total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEggs;
