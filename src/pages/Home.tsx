import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    "Success is my only motivation, failure is my only opposition.",
    "The truth is you don't know what is going to happen tomorrow.",
    "I say what I want to say and do what I want to do.",
    "You better lose yourself in the music.",
    "I'm not afraid to take a stand."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-em-dark via-em-gray to-em-dark"></div>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white graffiti-text animate-slide-up">
              <span className="text-em-red animate-glow">EMINEM</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mt-4 street-text animate-fade-in">
              THE REAL SLIM SHADY
            </p>
          </div>

          <div className="mb-8 h-24 flex items-center justify-center">
            <blockquote className="text-2xl md:text-3xl text-white italic animate-fade-in font-medium">
              "{quotes[currentQuote]}"
            </blockquote>
          </div>

          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Button asChild size="lg" className="bg-em-red hover:bg-em-red/80 text-white font-bold px-8 py-3 text-lg">
              <Link to="/legacy">Explore the Legacy</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-em-red text-em-red hover:bg-em-red hover:text-white font-bold px-8 py-3 text-lg">
              <Link to="/lyrics">Lyrical Genius</Link>
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-em-red rounded-full animate-bounce opacity-70"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-em-neon rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-20 px-4 bg-em-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12 graffiti-text">
            DIVE INTO THE <span className="text-em-red">MADNESS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-em-dark border-em-red/20 hover:border-em-red transition-all duration-300 group cursor-pointer">
              <Link to="/discography" className="block p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎵</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-em-red transition-colors">Albums</h3>
                  <p className="text-gray-400">From Infinite to Music to Be Murdered By</p>
                </div>
              </Link>
            </Card>

            <Card className="bg-em-dark border-em-red/20 hover:border-em-red transition-all duration-300 group cursor-pointer">
              <Link to="/lyrics" className="block p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-em-red transition-colors">Lyrics</h3>
                  <p className="text-gray-400">Bars that changed the game</p>
                </div>
              </Link>
            </Card>

            <Card className="bg-em-dark border-em-red/20 hover:border-em-red transition-all duration-300 group cursor-pointer">
              <Link to="/easter-eggs" className="block p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🥚</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-em-red transition-colors">Hidden Gems</h3>
                  <p className="text-gray-400">Rare tracks and easter eggs</p>
                </div>
              </Link>
            </Card>

            <Card className="bg-em-dark border-em-red/20 hover:border-em-red transition-all duration-300 group cursor-pointer">
              <Link to="/quiz" className="block p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🧠</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-em-red transition-colors">Fan Quiz</h3>
                  <p className="text-gray-400">Test your Stan knowledge</p>
                </div>
              </Link>
            </Card>

            <Card className="bg-em-dark border-em-red/20 hover:border-em-red transition-all duration-300 group cursor-pointer">
              <Link to="/legacy" className="block p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">👑</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-em-red transition-colors">Legacy</h3>
                  <p className="text-gray-400">The story of a legend</p>
                </div>
              </Link>
            </Card>

            <Card className="bg-em-red/10 border-em-red hover:bg-em-red/20 transition-all duration-300 group cursor-pointer">
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-em-red mb-2">Marshall Matters</h3>
                <p className="text-gray-300">The man behind the mask</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-em-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12 graffiti-text">BY THE NUMBERS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">220M+</div>
              <div className="text-gray-400">Records Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">15</div>
              <div className="text-gray-400">Grammy Awards</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">11</div>
              <div className="text-gray-400">Studio Albums</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-em-red mb-2">1</div>
              <div className="text-gray-400">Academy Award</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
