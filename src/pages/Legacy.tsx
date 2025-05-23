import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'music' | 'personal' | 'controversy' | 'achievement' | 'business';
  impact: 'low' | 'medium' | 'high' | 'legendary';
  details: string;
  image?: string;
}

const Legacy = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      year: 1972,
      title: 'Marshall Bruce Mathers III is Born',
      description: 'Born in St. Joseph, Missouri, to Debbie Mathers.',
      category: 'personal',
      impact: 'high',
      details: 'Born on October 17, 1972, Marshall would face a turbulent childhood moving between Missouri and Detroit. His father abandoned the family when he was young, leaving his mother to raise him alone.',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      year: 1996,
      title: 'Infinite Album Release',
      description: 'Self-funded debut album with only 1,000 copies sold.',
      category: 'music',
      impact: 'medium',
      details: 'Though commercially unsuccessful, Infinite showcased Eminem\'s technical skills and laid the groundwork for his future success. The album\'s failure motivated him to develop the Slim Shady persona.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3',
      year: 1997,
      title: 'Slim Shady EP',
      description: 'The birth of the Slim Shady alter ego.',
      category: 'music',
      impact: 'legendary',
      details: 'This EP caught the attention of Interscope Records and Dr. Dre. The darker, more controversial persona would become Eminem\'s ticket to mainstream success.',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '4',
      year: 1999,
      title: 'The Slim Shady LP',
      description: 'Major label debut goes triple platinum.',
      category: 'music',
      impact: 'legendary',
      details: 'Featuring hits like "My Name Is" and "Guilty Conscience," this album established Eminem as a force in hip-hop and sparked massive controversy for its content.',
      image: 'https://i.scdn.co/image/ab67616d0000b273226c4dd760c7186c3e79da0e'
    },
    {
      id: '5',
      year: 2000,
      title: 'The Marshall Mathers LP',
      description: 'Fastest-selling rap album in history at the time.',
      category: 'music',
      impact: 'legendary',
      details: 'Sold 1.76 million copies in its first week. Contains classics like "The Real Slim Shady" and "Stan." The album cemented Eminem\'s status as rap\'s biggest star.',
      image: 'https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4'
    },
    {
      id: '6',
      year: 2001,
      title: 'Grammy Controversy',
      description: 'Performs with Elton John amid LGBTQ+ criticism.',
      category: 'controversy',
      impact: 'high',
      details: 'Despite protests and boycotts over his lyrics, Eminem performed "Stan" with Elton John at the Grammy Awards, showcasing a more complex side of his artistry.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '7',
      year: 2002,
      title: '8 Mile Film Release',
      description: 'Stars in semi-autobiographical film.',
      category: 'achievement',
      impact: 'legendary',
      details: 'The film grossed over $240 million worldwide and earned Eminem an Academy Award for "Lose Yourself" - the first rap song to win an Oscar.',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '8',
      year: 2006,
      title: 'Proof\'s Death',
      description: 'Best friend and D12 member killed in Detroit.',
      category: 'personal',
      impact: 'legendary',
      details: 'The death of his childhood friend DeShaun Holton (Proof) devastated Eminem and led to depression, drug addiction, and a hiatus from music.',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '9',
      year: 2009,
      title: 'Relapse & Recovery',
      description: 'Returns from hiatus with renewed focus.',
      category: 'music',
      impact: 'high',
      details: 'After battling addiction and depression, Eminem returned with "Relapse" and then "Recovery," showing his evolution as both an artist and person.',
      image: 'https://i.scdn.co/image/ab67616d0000b2738e6a8d1e1db8fdc71b1e9f3b'
    },
    {
      id: '10',
      year: 2013,
      title: 'Rap God',
      description: 'Sets Guinness World Record for most words in a song.',
      category: 'achievement',
      impact: 'legendary',
      details: 'The song contains 1,560 words in 6 minutes and 4 seconds, with Eminem rapping 97 words in 15 seconds at the song\'s fastest point.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '11',
      year: 2017,
      title: 'BET Hip Hop Awards Cypher',
      description: 'Anti-Trump freestyle "The Storm" goes viral.',
      category: 'controversy',
      impact: 'high',
      details: 'The 4.5-minute freestyle attacking Donald Trump garnered over 60 million views and sparked nationwide political discussion.',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '12',
      year: 2020,
      title: 'Music to Be Murdered By',
      description: 'Surprise album debuts at #1.',
      category: 'music',
      impact: 'high',
      details: 'Released without warning, the album proved Eminem could still dominate charts and culture, featuring collaborations with young artists and addressing current events.',
      image: 'https://i.scdn.co/image/ab67616d0000b2734f24ca7da880d743ee5e97f8'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'music': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'personal': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'controversy': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'achievement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'business': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getImpactSize = (impact: string) => {
    switch (impact) {
      case 'legendary': return 'scale-110';
      case 'high': return 'scale-105';
      case 'medium': return 'scale-100';
      default: return 'scale-95';
    }
  };

  const filteredEvents = filterCategory === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === filterCategory);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white graffiti-text mb-4">
            THE <span className="text-em-red">LEGACY</span>
          </h1>
          <p className="text-xl text-gray-400">From Marshall Mathers to Rap God</p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Filter by Category:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={filterCategory === 'all' ? "default" : "outline"}
              onClick={() => setFilterCategory('all')}
              className={filterCategory === 'all' ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
            >
              All Events
            </Button>
            <Button
              variant={filterCategory === 'music' ? "default" : "outline"}
              onClick={() => setFilterCategory('music')}
              className={filterCategory === 'music' ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
            >
              Music
            </Button>
            <Button
              variant={filterCategory === 'personal' ? "default" : "outline"}
              onClick={() => setFilterCategory('personal')}
              className={filterCategory === 'personal' ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
            >
              Personal
            </Button>
            <Button
              variant={filterCategory === 'controversy' ? "default" : "outline"}
              onClick={() => setFilterCategory('controversy')}
              className={filterCategory === 'controversy' ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
            >
              Controversy
            </Button>
            <Button
              variant={filterCategory === 'achievement' ? "default" : "outline"}
              onClick={() => setFilterCategory('achievement')}
              className={filterCategory === 'achievement' ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
            >
              Achievements
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-em-red opacity-50"></div>
          
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <Card 
                  className={`bg-em-gray border-em-red/20 hover:border-em-red transition-all duration-300 cursor-pointer p-6 transform ${getImpactSize(event.impact)} hover:scale-105`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {event.image && (
                    <div className="w-full h-32 mb-4 rounded overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-em-red mb-1">{event.year}</div>
                    <Badge className={`border ${getCategoryColor(event.category)} text-xs`}>
                      {event.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        event.impact === 'legendary' ? 'border-yellow-500 text-yellow-400' :
                        event.impact === 'high' ? 'border-orange-500 text-orange-400' :
                        event.impact === 'medium' ? 'border-blue-500 text-blue-400' :
                        'border-gray-500 text-gray-400'
                      }`}
                    >
                      {event.impact} impact
                    </Badge>
                    <Button size="sm" className="bg-em-red hover:bg-em-red/80 text-xs">
                      Details
                    </Button>
                  </div>
                </Card>
              </div>
              
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-em-dark ${
                event.impact === 'legendary' ? 'bg-yellow-500' :
                event.impact === 'high' ? 'bg-orange-500' :
                event.impact === 'medium' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <Card className="bg-em-gray border-em-red max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-3xl font-bold text-em-red mb-2">{selectedEvent.year}</div>
                    <h2 className="text-2xl font-bold text-white graffiti-text mb-2">
                      {selectedEvent.title}
                    </h2>
                    <div className="flex space-x-2">
                      <Badge className={`border ${getCategoryColor(selectedEvent.category)}`}>
                        {selectedEvent.category}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={
                          selectedEvent.impact === 'legendary' ? 'border-yellow-500 text-yellow-400' :
                          selectedEvent.impact === 'high' ? 'border-orange-500 text-orange-400' :
                          selectedEvent.impact === 'medium' ? 'border-blue-500 text-blue-400' :
                          'border-gray-500 text-gray-400'
                        }
                      >
                        {selectedEvent.impact} impact
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedEvent(null)}
                    className="text-white hover:text-em-red text-2xl"
                  >
                    ✕
                  </Button>
                </div>

                {selectedEvent.image && (
                  <div className="w-full h-64 mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={selectedEvent.image} 
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-gray-300 text-lg mb-4">{selectedEvent.description}</p>
                  
                  <div className="bg-em-dark p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Full Story:</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedEvent.details}</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-em-red hover:bg-em-red/80">
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Legacy Stats */}
        <div className="mt-20 bg-em-gray p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-white graffiti-text mb-8">
            LEGACY BY THE NUMBERS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">25+</div>
              <div className="text-gray-400">Years in Hip-Hop</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">220M+</div>
              <div className="text-gray-400">Records Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">15</div>
              <div className="text-gray-400">Grammy Awards</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">∞</div>
              <div className="text-gray-400">Cultural Impact</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legacy;
