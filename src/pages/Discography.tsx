
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Album {
  id: string;
  title: string;
  year: number;
  cover: string;
  description: string;
  tracks: number;
  genre: string;
  rating: number;
  highlights: string[];
  slug: string;
  spotifyId: string;
}

const Discography = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const albums: Album[] = [
    {
      id: '1',
      title: 'The Slim Shady LP',
      year: 1999,
      cover: 'https://i.scdn.co/image/ab67616d0000b273226c4dd760c7186c3e79da0e',
      description: 'The album that introduced the world to Slim Shady.',
      tracks: 20,
      genre: 'Hip Hop',
      rating: 9.2,
      highlights: ['My Name Is', 'Guilty Conscience', 'Role Model'],
      slug: 'slim-shady-lp',
      spotifyId: '3HNnxK7NgLXbDoxRZxNWiR'
    },
    {
      id: '2',
      title: 'The Marshall Mathers LP',
      year: 2000,
      cover: 'https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4',
      description: 'Raw, controversial, and absolutely groundbreaking.',
      tracks: 18,
      genre: 'Hip Hop',
      rating: 9.8,
      highlights: ['The Real Slim Shady', 'The Way I Am', 'Stan'],
      slug: 'marshall-mathers-lp',
      spotifyId: '6t7956yu5zYf5A829XRiHC'
    },
    {
      id: '3',
      title: 'The Eminem Show',
      year: 2002,
      cover: 'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',
      description: 'The most complete Eminem album showcasing all his skills.',
      tracks: 20,
      genre: 'Hip Hop',
      rating: 9.5,
      highlights: ['Without Me', 'Lose Yourself', 'Cleanin Out My Closet'],
      slug: 'eminem-show',
      spotifyId: '2cWBwpqMsDJC1ZUwz813lo'
    },
    {
      id: '4',
      title: 'Recovery',
      year: 2010,
      cover: 'https://i.scdn.co/image/ab67616d0000b2738e6a8d1e1db8fdc71b1e9f3b',
      description: 'A comeback story of redemption and renewed purpose.',
      tracks: 17,
      genre: 'Hip Hop',
      rating: 8.7,
      highlights: ['Not Afraid', 'Love The Way You Lie', 'Space Bound'],
      slug: 'recovery',
      spotifyId: '6kv7KAL3FgOICtuNSNkMPF'
    },
    {
      id: '5',
      title: 'The Marshall Mathers LP 2',
      year: 2013,
      cover: 'https://i.scdn.co/image/ab67616d0000b273b8c676b4e1e54e64b3a14aef',
      description: 'A sequel that lives up to its legendary predecessor.',
      tracks: 16,
      genre: 'Hip Hop',
      rating: 8.9,
      highlights: ['Rap God', 'The Monster', 'Berzerk'],
      slug: 'marshall-mathers-lp-2',
      spotifyId: '3MMWKnckhGNw0CLKdxaujq'
    },
    {
      id: '6',
      title: 'Music to Be Murdered By',
      year: 2020,
      cover: 'https://i.scdn.co/image/ab67616d0000b2734f24ca7da880d743ee5e97f8',
      description: 'Surprise release showing Em is still the king.',
      tracks: 20,
      genre: 'Hip Hop',
      rating: 8.8,
      highlights: ['Godzilla', 'Darkness', 'Unaccommodating'],
      slug: 'music-to-be-murdered-by',
      spotifyId: '4otkd9As6YaxxEkIjXPiZ6'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white graffiti-text mb-4">
            <span className="text-em-red">DISCOGRAPHY</span>
          </h1>
          <p className="text-xl text-gray-400">The evolution of a rap god</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {albums.map((album) => (
            <Card 
              key={album.id}
              className="bg-em-gray border-em-red/20 hover:border-em-red transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={album.cover} 
                      alt={album.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-em-red transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-em-red font-semibold">{album.year}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Tracks: {album.tracks}</span>
                    <span>Rating: {album.rating}/10</span>
                  </div>
                  <Badge variant="secondary" className="bg-em-red/20 text-em-red">
                    {album.genre}
                  </Badge>
                </div>

                <p className="text-gray-300 mt-4 text-sm line-clamp-2">
                  {album.description}
                </p>

                <div className="mt-4 space-y-2">
                  <Button 
                    asChild
                    className="w-full bg-em-red hover:bg-em-red/80"
                  >
                    <Link to={`/discography/${album.slug}`}>
                      View Full Album
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => setSelectedAlbum(album)}
                    variant="outline" 
                    className="w-full border-em-red text-em-red hover:bg-em-red hover:text-white"
                  >
                    Quick Preview
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Album Details Modal */}
        {selectedAlbum && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <Card className="bg-em-gray border-em-red max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden">
                      <img 
                        src={selectedAlbum.cover} 
                        alt={selectedAlbum.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white graffiti-text">
                        {selectedAlbum.title}
                      </h2>
                      <p className="text-em-red text-xl font-semibold">{selectedAlbum.year}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedAlbum(null)}
                    className="text-white hover:text-em-red"
                  >
                    ✕
                  </Button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 text-lg mb-4">{selectedAlbum.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-gray-400">Tracks:</span>
                      <span className="text-white ml-2 font-semibold">{selectedAlbum.tracks}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Rating:</span>
                      <span className="text-em-red ml-2 font-semibold">{selectedAlbum.rating}/10</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">Key Tracks:</h3>
                    <div className="space-y-2">
                      {selectedAlbum.highlights.map((track, index) => (
                        <div 
                          key={index}
                          className="bg-em-dark p-3 rounded border border-em-red/20 hover:border-em-red transition-colors"
                        >
                          <span className="text-white font-medium">{track}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spotify Embed */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">Listen Now:</h3>
                    <div className="bg-em-dark rounded-lg p-4">
                      <iframe 
                        src={`https://open.spotify.com/embed/album/${selectedAlbum.spotifyId}?utm_source=generator&theme=0`}
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </div>

                <div className="text-center space-x-4">
                  <Button asChild className="bg-em-red hover:bg-em-red/80">
                    <Link to={`/discography/${selectedAlbum.slug}`}>
                      Full Album Details
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-em-red text-em-red hover:bg-em-red hover:text-white"
                    onClick={() => window.open(`https://open.spotify.com/album/${selectedAlbum.spotifyId}`, '_blank')}
                  >
                    Open in Spotify
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Timeline View */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white graffiti-text mb-12">
            THE <span className="text-em-red">TIMELINE</span>
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-em-red"></div>
            
            {albums.map((album, index) => (
              <div 
                key={album.id}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <Card className="bg-em-gray border-em-red/20 p-4 hover:border-em-red transition-colors cursor-pointer">
                    <Link to={`/discography/${album.slug}`} className="block">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 rounded overflow-hidden">
                          <img 
                            src={album.cover} 
                            alt={album.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white hover:text-em-red transition-colors">{album.title}</h3>
                          <p className="text-em-red font-semibold">{album.year}</p>
                          <p className="text-gray-400 text-sm">{album.tracks} tracks</p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-em-red rounded-full border-4 border-em-dark"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discography;
