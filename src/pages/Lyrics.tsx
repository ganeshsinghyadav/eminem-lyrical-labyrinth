
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LyricLine {
  text: string;
  isPunchline: boolean;
  theme?: string;
}

interface Song {
  id: string;
  title: string;
  album: string;
  year: number;
  lyrics: LyricLine[];
  themes: string[];
  spotifyId: string;
}

const Lyrics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showPunchlines, setShowPunchlines] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const songs: Song[] = [
    {
      id: '1',
      title: 'Lose Yourself',
      album: '8 Mile Soundtrack',
      year: 2002,
      themes: ['motivation', 'struggle', 'determination'],
      spotifyId: '5Z01UMMf7V1o0MzF86s6WJ',
      lyrics: [
        { text: "Look, if you had one shot, or one opportunity", isPunchline: false, theme: 'motivation' },
        { text: "To seize everything you ever wanted in one moment", isPunchline: false, theme: 'motivation' },
        { text: "Would you capture it or just let it slip?", isPunchline: true, theme: 'motivation' },
        { text: "His palms are sweaty, knees weak, arms are heavy", isPunchline: false, theme: 'struggle' },
        { text: "There's vomit on his sweater already, mom's spaghetti", isPunchline: true, theme: 'struggle' },
        { text: "He's nervous, but on the surface he looks calm and ready", isPunchline: false, theme: 'determination' }
      ]
    },
    {
      id: '2',
      title: 'The Real Slim Shady',
      album: 'The Marshall Mathers LP',
      year: 2000,
      themes: ['controversy', 'humor', 'fame'],
      spotifyId: '3yfqSUWxFvZELEM4PmlwIR',
      lyrics: [
        { text: "Will the real Slim Shady please stand up?", isPunchline: true, theme: 'fame' },
        { text: "I repeat, will the real Slim Shady please stand up?", isPunchline: false, theme: 'fame' },
        { text: "We're gonna have a problem here", isPunchline: false, theme: 'controversy' },
        { text: "Y'all act like you never seen a white person before", isPunchline: true, theme: 'controversy' }
      ]
    },
    {
      id: '3',
      title: 'Without Me',
      album: 'The Eminem Show',
      year: 2002,
      themes: ['humor', 'fame', 'controversy'],
      spotifyId: '7EXGAGgUXtLCaJZOJAgisQ',
      lyrics: [
        { text: "Guess who's back, back again", isPunchline: false, theme: 'fame' },
        { text: "Shady's back, tell a friend", isPunchline: true, theme: 'fame' },
        { text: "Now this looks like a job for me", isPunchline: true, theme: 'humor' },
        { text: "So everybody, just follow me", isPunchline: false, theme: 'fame' }
      ]
    },
    {
      id: '4',
      title: 'Stan',
      album: 'The Marshall Mathers LP',
      year: 2000,
      themes: ['obsession', 'mental health', 'fame'],
      spotifyId: '3UmaczJpikHgJFyBTAJVoz',
      lyrics: [
        { text: "Dear Slim, I wrote you but still ain't calling", isPunchline: false, theme: 'obsession' },
        { text: "I left my cell, my pager, and my home phone at the bottom", isPunchline: false, theme: 'obsession' },
        { text: "I sent two letters back in autumn, you must not-a got 'em", isPunchline: false, theme: 'obsession' },
        { text: "There probably was a problem at the post office or something", isPunchline: false, theme: 'obsession' }
      ]
    },
    {
      id: '5',
      title: 'Not Afraid',
      album: 'Recovery',
      year: 2010,
      themes: ['recovery', 'determination', 'motivation'],
      spotifyId: '2iuZHL9vk9eC3DQEKMjfGO',
      lyrics: [
        { text: "I'm not afraid to take a stand", isPunchline: true, theme: 'determination' },
        { text: "Everybody come take my hand", isPunchline: false, theme: 'motivation' },
        { text: "We'll walk this road together, through the storm", isPunchline: false, theme: 'recovery' },
        { text: "Whatever weather, cold or warm", isPunchline: false, theme: 'determination' }
      ]
    }
  ];

  const allThemes = ['motivation', 'struggle', 'determination', 'controversy', 'humor', 'fame', 'obsession', 'mental health', 'recovery'];

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.lyrics.some(line => line.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFilteredLyrics = (lyrics: LyricLine[]) => {
    if (selectedTheme) {
      return lyrics.filter(line => line.theme === selectedTheme);
    }
    return lyrics;
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white graffiti-text mb-4">
            <span className="text-em-red">LYRICS</span> EXPLORER
          </h1>
          <p className="text-xl text-gray-400">Dive into the lyrical genius</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search for songs, albums, or lyrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-em-gray border-em-red/20 text-white placeholder-gray-400 text-lg py-6"
          />
        </div>

        {/* Theme Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Filter by Theme:</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTheme === null ? "default" : "outline"}
              onClick={() => setSelectedTheme(null)}
              className={selectedTheme === null ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
            >
              All Themes
            </Button>
            {allThemes.map(theme => (
              <Button
                key={theme}
                variant={selectedTheme === theme ? "default" : "outline"}
                onClick={() => setSelectedTheme(theme)}
                className={selectedTheme === theme ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
              >
                {theme}
              </Button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 flex justify-center">
          <Button
            onClick={() => setShowPunchlines(!showPunchlines)}
            variant={showPunchlines ? "default" : "outline"}
            className={showPunchlines ? "bg-em-red" : "border-em-red text-em-red hover:bg-em-red hover:text-white"}
          >
            {showPunchlines ? "Hide" : "Highlight"} Punchlines
          </Button>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredSongs.map((song) => (
            <Card 
              key={song.id}
              className="bg-em-gray border-em-red/20 hover:border-em-red transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedSong(song)}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-em-red transition-colors mb-2">
                  {song.title}
                </h3>
                <p className="text-gray-400 mb-2">{song.album} ({song.year})</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {song.themes.map(theme => (
                    <Badge 
                      key={theme}
                      variant="secondary" 
                      className="bg-em-red/20 text-em-red text-xs"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-em-red hover:bg-em-red/80 mb-2">
                  View Lyrics
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-em-red text-em-red hover:bg-em-red hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://open.spotify.com/track/${song.spotifyId}`, '_blank');
                  }}
                >
                  🎵 Listen on Spotify
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Lyrics Modal */}
        {selectedSong && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <Card className="bg-em-gray border-em-red max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white graffiti-text">
                      {selectedSong.title}
                    </h2>
                    <p className="text-em-red text-xl">{selectedSong.album} ({selectedSong.year})</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedSong(null)}
                    className="text-white hover:text-em-red text-2xl"
                  >
                    ✕
                  </Button>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSong.themes.map(theme => (
                      <Badge 
                        key={theme}
                        variant="secondary" 
                        className="bg-em-red/20 text-em-red"
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-em-dark p-6 rounded-lg mb-6">
                  <div className="space-y-3">
                    {getFilteredLyrics(selectedSong.lyrics).map((line, index) => (
                      <div 
                        key={index}
                        className={`text-lg leading-relaxed transition-all duration-300 ${
                          showPunchlines && line.isPunchline 
                            ? 'text-em-red font-bold text-xl animate-pulse' 
                            : 'text-gray-300'
                        } ${
                          selectedTheme && line.theme === selectedTheme 
                            ? 'bg-em-red/10 p-2 rounded border-l-4 border-em-red' 
                            : ''
                        }`}
                      >
                        {line.text}
                        {line.theme && (
                          <Badge 
                            variant="outline" 
                            className="ml-2 text-xs border-em-red/50 text-em-red/70"
                          >
                            {line.theme}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center space-x-4">
                  <Button 
                    className="bg-em-red hover:bg-em-red/80"
                    onClick={() => window.open(`https://open.spotify.com/track/${selectedSong.spotifyId}`, '_blank')}
                  >
                    🎵 Listen on Spotify
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-em-red text-em-red hover:bg-em-red hover:text-white"
                  >
                    Share Lyrics
                  </Button>
                </div>

                {/* Spotify Embed */}
                <div className="mt-6">
                  <div className="bg-em-dark rounded-lg p-4">
                    <iframe 
                      src={`https://open.spotify.com/embed/track/${selectedSong.spotifyId}?utm_source=generator&theme=0`}
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* No Results */}
        {filteredSongs.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No lyrics found for "{searchTerm}"</p>
            <p className="text-gray-500 mt-2">Try different keywords or browse all songs</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lyrics;
