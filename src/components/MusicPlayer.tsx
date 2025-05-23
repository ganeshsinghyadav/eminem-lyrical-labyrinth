
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { title: "Lose Yourself (Instrumental)", src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
    { title: "The Real Slim Shady (Beat)", src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
    { title: "Rap God (Instrumental)", src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" }
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    setIsPlaying(false);
  };

  return (
    <Card className="fixed bottom-4 right-4 bg-em-gray border-em-red/20 p-4 z-50 max-w-xs">
      <div className="text-white text-sm mb-2 truncate">
        {tracks[currentTrack].title}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          onClick={togglePlay}
          className="bg-em-red hover:bg-em-red/80"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={nextTrack}
          className="border-em-red text-em-red hover:bg-em-red hover:text-white"
        >
          ⏭️
        </Button>
      </div>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onEnded={() => setIsPlaying(false)}
      />
    </Card>
  );
};

export default MusicPlayer;
