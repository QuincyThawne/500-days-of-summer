import { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, Heart, Sun, ArrowUp, ArrowDown } from 'lucide-react';

interface TimelineEntry {
  day: number;
  title: string;
  description: string;
  movie_order: number;
}

const timelineData: TimelineEntry[] = [
  {
    day: 1,
    title: "First Meeting",
    description: "Tom meets Summer at the greeting card company. She's new to the team and catches his attention immediately with her unique perspective on love.",
    movie_order: 5
  },
  {
    day: 3,
    title: "First Impression",
    description: "Tom discusses Summer with his friend from afar. His emotions begin forming quickly as he tries to understand her.",
    movie_order: 6
  },
  {
    day: 4,
    title: "Elevator Bonding",
    description: "Summer hears Tom listening to The Smiths in the elevator. Their shared music taste surprises him and initiates real interest.",
    movie_order: 7
  },
  {
    day: 8,
    title: "Karaoke Night",
    description: "The office karaoke night where Tom starts to see Summer's playful side. She surprises everyone with her song choice.",
    movie_order: 8
  },
  {
    day: 11,
    title: "Sister’s Insight",
    description: "Tom’s sister provides early wisdom, warning him not to idealize Summer just because they share quirky interests.",
    movie_order: 9
  },
  {
    day: 22,
    title: "Mixed Signals",
    description: "Tom tells his friends it’s over with Summer. He's convinced she isn't interested, even though she continues to act warmly.",
    movie_order: 10
  },
  {
    day: 23,
    title: "First Date",
    description: "Their first official date. Tom is nervous but Summer keeps things light and fun, setting the tone for their relationship.",
    movie_order: 15
  },
  {
    day: 27,
    title: "Karaoke Invite",
    description: "The office announces a karaoke night. Tom gets excited, seeing it as a chance to spend more time with Summer.",
    movie_order: 13
  },
  {
    day: 28,
    title: "Mutual Confession",
    description: "During karaoke night, Tom and Summer confess their mutual liking for each other in a light-hearted moment.",
    movie_order: 14
  },
  {
    day: 31,
    title: "IKEA Adventure",
    description: "The famous IKEA scene where they playfully act like a married couple, showcasing their chemistry and compatibility.",
    movie_order: 18
  },
  {
    day: 34,
    title: "First Intimacy",
    description: "Summer tells Tom she’s not looking for anything serious. Despite that, they end up sleeping together, followed by Tom's joyful dance.",
    movie_order: 19
  },
  {
    day: 45,
    title: "Morning After",
    description: "Tom wakes up feeling like he's on top of the world. The animated bluebird and dance sequence reflect his euphoria.",
    movie_order: 22
  },
  {
    day: 87,
    title: "Record Store Flirtation",
    description: "Tom and Summer share more quirky chemistry in a record store. Shower sex follows, deepening their physical connection.",
    movie_order: 23
  },
  {
    day: 95,
    title: "Relationship Deepens",
    description: "Tom and Summer's relationship reaches new depths. They share intimate moments and Tom believes they're building something lasting.",
    movie_order: 25
  },
  {
    day: 109,
    title: "Her Apartment",
    description: "Summer invites Tom to her place for the first time. They share deeper personal stories, solidifying their bond.",
    movie_order: 26
  },
  {
    day: 118,
    title: "Label Anxiety",
    description: "Tom feels unsure about where the relationship stands. He asks Summer about being a couple, but she evades the question.",
    movie_order: 27
  },
  {
    day: 154,
    title: "Sid's Advice",
    description: "Tom's younger sister Sid gives him relationship advice, showing wisdom beyond her years about love and expectations.",
    movie_order: 28
  },
  {
    day: 167,
    title: "Card Writing High",
    description: "Tom is doing great at work, full of creativity and energy — a reflection of his happiness with Summer.",
    movie_order: 29
  },
  {
    day: 185,
    title: "The Fight",
    description: "First major disagreement about the nature of their relationship. Summer maintains her stance about not believing in love.",
    movie_order: 32
  },
  {
    day: 191,
    title: "Art Gallery & Movie Date",
    description: "Tom and Summer have fun at an art exhibit and a vampire movie. It seems like things are back on track.",
    movie_order: 33
  },
  {
    day: 259,
    title: "Summer's Doubts",
    description: "Summer starts pulling away, becoming more distant. Tom notices the change but doesn't understand why.",
    movie_order: 35
  },
  {
    day: 266,
    title: "Morning After the Fight",
    description: "After their argument at the bar, Tom and Summer reconcile. They discuss past relationships and play the penis game, enjoying each other's company once more.",
    movie_order: 36
  },
  {
    day: 282,
    title: "IKEA Revisited – Distant Now",
    description: "Tom and Summer return to IKEA, but she no longer engages with the playful act. Their connection is clearly fading.",
    movie_order: 37
  },
  {
    day: 290,
    title: "The Breakup",
    description: "Summer ends their relationship, leaving Tom devastated and confused. She insists they were never really together.",
    movie_order: 2
  },
  {
    day: 303,
    title: "Work Struggles",
    description: "Post-breakup, Tom finds it hard to cope. He’s lost in thought at work while a new assistant fills Summer’s role.",
    movie_order: 39
  },
  {
    day: 314,
    title: "Sad Movie Alone",
    description: "Tom watches a movie alone, paralleling his loneliness. The scene uses a foreign film to visually express his melancholy.",
    movie_order: 40
  },
  {
    day: 321,
    title: "Workplace Breakdown",
    description: "Tom's manager confronts him about his poor performance. He’s assigned to sympathy cards, reflecting his emotional state.",
    movie_order: 41
  },
  {
    day: 322,
    title: "I Hate Summer",
    description: "Tom's grief turns to frustration. He lists all the things he used to love about Summer and now resents.",
    movie_order: 41.5
  },
  {
    day: 345,
    title: "Depression Phase",
    description: "Tom falls into a deep depression, unable to function properly at work or in life. His friends try to help him move on.",
    movie_order: 3
  },
  {
    day: 376,
    title: "Anger Stage",
    description: "Tom's sadness turns to anger as he begins to question everything about their relationship and Summer's intentions.",
    movie_order: 38
  },
  {
    day: 402,
    title: "Wedding Invite",
    description: "Tom and Summer meet again on a train en route to a wedding. She catches the bouquet and invites him to her party.",
    movie_order: 43
  },
  {
    day: 408,
    title: "Expectations vs. Reality",
    description: "Tom attends Summer’s party with hope, but reality crashes his expectations when he sees she’s engaged.",
    movie_order: 44
  },
  {
    day: 440,
    title: "Rock Bottom Begins",
    description: "Tom wakes up miserable. A montage shows him spiraling – drinking, skipping work, and becoming unrecognizable.",
    movie_order: 46
  },
  {
    day: 442,
    title: "Quits His Job",
    description: "Tom vents during a meeting and quits, condemning the greeting card industry for its inauthenticity.",
    movie_order: 47
  },
  {
    day: 450,
    title: "Self-Reflection",
    description: "Tom begins to understand his role in the relationship's failure and starts to see things from Summer's perspective.",
    movie_order: 45
  },
  {
    day: 456,
    title: "Rebuilding Begins",
    description: "Tom starts to pull himself back together, sketching again and applying for architecture jobs.",
    movie_order: 47.5
  },
  {
    day: 476,
    title: "Career Change",
    description: "Tom decides to pursue his passion for architecture, finally taking steps toward his dreams instead of staying comfortable.",
    movie_order: 48
  },
  {
    day: 488,
    title: "Final Encounter",
    description: "Tom and Summer meet one last time. Summer explains her perspective and wishes him well, providing closure.",
    movie_order: 52
  },
  {
    day: 500,
    title: "New Beginning",
    description: "Tom meets Autumn at a job interview, symbolizing his readiness for a new chapter in life. The cycle begins anew.",
    movie_order: 1
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'canonical' | 'movie'>('canonical');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [intervalStart, setIntervalStart] = useState<number>(1);
  const [intervalEnd, setIntervalEnd] = useState<number>(500);
  const [useInterval, setUseInterval] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(prev => prev >= 500 ? 1 : prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let filtered = timelineData.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.day.toString().includes(searchTerm);
      const matchesInterval = !useInterval || (entry.day >= intervalStart && entry.day <= intervalEnd);
      return matchesSearch && matchesInterval;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'canonical') {
        comparison = a.day - b.day;
      } else if (sortBy === 'movie') {
        comparison = a.movie_order - b.movie_order;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [searchTerm, sortBy, sortOrder, intervalStart, intervalEnd, useInterval]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Animated Summer Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg" 
          alt="Summer background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating Summer Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Sun className="absolute top-20 right-20 text-yellow-300 w-12 h-12 animate-pulse" />
        <div className="absolute top-32 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 right-32 w-3 h-3 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            500 Days of Summer
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            A journey through love, loss, and self-discovery. Explore the timeline of Tom and Summer's relationship.
          </p>
          
          {/* Day Counter */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4">
              <Calendar className="text-white w-8 h-8" />
              <div>
                <p className="text-white/80 text-sm">Current Day</p>
                <p className="text-4xl font-bold text-white">{currentDay}</p>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentDay / 500) * 100}%` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search days, events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Order Type */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'canonical' | 'movie')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="canonical">Canonical Order</option>
              <option value="movie">Movie Order</option>
            </select>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>

            {/* Interval Toggle */}
            <button
              onClick={() => setUseInterval(!useInterval)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                useInterval 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {useInterval ? 'Using Interval' : 'Use Interval'}
            </button>
          </div>
          
          {/* Interval Controls */}
          {useInterval && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={intervalStart}
                  onChange={(e) => setIntervalStart(Math.max(1, Math.min(500, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={intervalEnd}
                  onChange={(e) => setIntervalEnd(Math.max(1, Math.min(500, parseInt(e.target.value) || 500)))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  Range: {intervalEnd - intervalStart + 1} days
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAndSortedData.length} out of {timelineData.length} days
          </div>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedData.map((entry, index) => (
            <div
              key={entry.day}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {entry.day}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{entry.title}</h3>
                    <span className="text-sm text-gray-500">
                      {sortBy === 'movie' ? `Scene ${entry.movie_order}` : `Day ${entry.day}`}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{entry.description}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Day {entry.day} of 500</span>
                  </div>
                  {sortBy === 'movie' && (
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Movie Scene {entry.movie_order}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-white/80 mb-2">
              "Most days of the year are unremarkable. They begin and they end with no lasting memory made in between."
            </p>
            <p className="text-white/60 text-sm">
              Explore the remarkable days that made this story unforgettable.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;