
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: number;
  title: string;
  duration: string;
  features?: string[];
  spotifyId?: string;
}

interface AlbumData {
  id: string;
  title: string;
  year: number;
  cover: string;
  description: string;
  tracks: Track[];
  genre: string;
  rating: number;
  highlights: string[];
  spotifyId: string;
}

const AlbumDetail = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const albumsData: Record<string, AlbumData> = {
    'slim-shady-lp': {
      id: 'slim-shady-lp',
      title: 'The Slim Shady LP',
      year: 1999,
      cover: 'https://i.scdn.co/image/ab67616d0000b273226c4dd760c7186c3e79da0e',
      description: 'The album that introduced the world to Slim Shady with dark humor and controversial lyrics.',
      tracks: [
        { id: 1, title: 'Public Service Announcement', duration: '0:20' },
        { id: 2, title: 'My Name Is', duration: '4:28', spotifyId: '5XLr4zPRvCi83NoCIgz4um' },
        { id: 3, title: 'Guilty Conscience', duration: '3:19', features: ['Dr. Dre'] },
        { id: 4, title: 'Brain Damage', duration: '3:46' },
        { id: 5, title: '97 Bonnie & Clyde', duration: '5:17' }
      ],
      genre: 'Hip Hop',
      rating: 9.2,
      highlights: ['My Name Is', 'Guilty Conscience', 'Role Model'],
      spotifyId: '3HNnxK7NgLXbDoxRZxNWiR'
    },
    'marshall-mathers-lp': {
      id: 'marshall-mathers-lp',
      title: 'The Marshall Mathers LP',
      year: 2000,
      cover: 'https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4',
      description: 'Raw, controversial, and absolutely groundbreaking. The album that made Eminem a household name.',
      tracks: [
        { id: 1, title: 'The Real Slim Shady', duration: '4:44', spotifyId: '3yfqSUWxFvZELEM4PmlwIR' },
        { id: 2, title: 'The Way I Am', duration: '4:50', spotifyId: '6z4LYYyc5l8hiLGTc6MJVS' },
        { id: 3, title: 'Stan', duration: '6:44', features: ['Dido'], spotifyId: '3UmaczJpikHgJFyBTAJVoz' },
        { id: 4, title: 'Bitch Please II', duration: '4:48', features: ['Dr. Dre', 'Snoop Dogg'] },
        { id: 5, title: 'Marshall Mathers', duration: '5:21' }
      ],
      genre: 'Hip Hop',
      rating: 9.8,
      highlights: ['The Real Slim Shady', 'The Way I Am', 'Stan'],
      spotifyId: '6t7956yu5zYf5A829XRiHC'
    },
    'eminem-show': {
      id: 'eminem-show',
      title: 'The Eminem Show',
      year: 2002,
      cover: 'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',
      description: 'The most complete Eminem album showcasing all his skills, from humor to serious social commentary.',
      tracks: [
        { id: 1, title: 'Without Me', duration: '4:50', spotifyId: '7EXGAGgUXtLCaJZOJAgisQ' },
        { id: 2, title: 'Lose Yourself', duration: '5:26', spotifyId: '5Z01UMMf7V1o0MzF86s6WJ' },
        { id: 3, title: 'Cleanin Out My Closet', duration: '4:57', spotifyId: '6lKHl6rqk0YhkcR4QI6K5K' },
        { id: 4, title: 'White America', duration: '5:24' },
        { id: 5, title: 'Sing For The Moment', duration: '5:39' }
      ],
      genre: 'Hip Hop',
      rating: 9.5,
      highlights: ['Without Me', 'Lose Yourself', 'Cleanin Out My Closet'],
      spotifyId: '2cWBwpqMsDJC1ZUwz813lo'
    }
  };

  const album = albumId ? albumsData[albumId] : null;

  if (!album) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark flex items-center justify-center">
        <Card className="bg-em-gray border-em-red p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Album Not Found</h1>
          <p className="text-gray-400 mb-6">The album you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/discography')} className="bg-em-red hover:bg-em-red/80">
            Back to Discography
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-em-dark">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => navigate('/discography')}
          variant="outline"
          className="mb-8 border-em-red text-em-red hover:bg-em-red hover:text-white"
        >
          ← Back to Discography
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Album Info */}
          <div>
            <div className="text-center mb-8">
              <div className="w-80 h-80 mx-auto mb-6 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={album.cover} 
                  alt={album.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl font-bold text-white graffiti-text mb-2">
                {album.title}
              </h1>
              <p className="text-2xl text-em-red font-semibold mb-4">{album.year}</p>
              <div className="flex justify-center space-x-4 mb-4">
                <Badge variant="secondary" className="bg-em-red/20 text-em-red">
                  {album.genre}
                </Badge>
                <Badge variant="outline" className="border-em-red text-em-red">
                  {album.rating}/10
                </Badge>
              </div>
            </div>
            
            <Card className="bg-em-gray border-em-red/20 p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-3">About This Album</h3>
              <p className="text-gray-300 mb-4">{album.description}</p>
              
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white mb-2">Highlights:</h4>
                <div className="flex flex-wrap gap-2">
                  {album.highlights.map((track, index) => (
                    <Badge key={index} className="bg-em-red/10 text-em-red border border-em-red/20">
                      {track}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Button 
                className="w-full bg-em-red hover:bg-em-red/80"
                onClick={() => window.open(`https://open.spotify.com/album/${album.spotifyId}`, '_blank')}
              >
                🎵 Listen on Spotify
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-em-red text-em-red hover:bg-em-red hover:text-white"
                onClick={() => window.open(`https://music.apple.com/search?term=${encodeURIComponent(album.title + ' Eminem')}`, '_blank')}
              >
                🍎 Apple Music
              </Button>
            </div>
          </div>

          {/* Tracklist */}
          <div>
            <Card className="bg-em-gray border-em-red/20 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 graffiti-text">TRACKLIST</h3>
              <div className="space-y-3">
                {album.tracks.map((track) => (
                  <div 
                    key={track.id}
                    className="flex items-center justify-between p-3 bg-em-dark rounded border border-em-red/10 hover:border-em-red/30 transition-colors cursor-pointer group"
                    onClick={() => track.spotifyId && window.open(`https://open.spotify.com/track/${track.spotifyId}`, '_blank')}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-em-red font-bold w-6">{track.id}</span>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-em-red transition-colors">
                          {track.title}
                        </h4>
                        {track.features && (
                          <p className="text-gray-400 text-sm">
                            feat. {track.features.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400 text-sm">{track.duration}</span>
                      {track.spotifyId && (
                        <Button size="sm" variant="ghost" className="text-em-red hover:bg-em-red/20">
                          ▶️
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Spotify Embed */}
        <Card className="bg-em-gray border-em-red/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Listen Now</h3>
          <div className="bg-em-dark rounded-lg p-4">
            <iframe 
              src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator&theme=0`}
              width="100%" 
              height="380" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlbumDetail;
