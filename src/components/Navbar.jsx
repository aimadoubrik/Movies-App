import React from 'react';
import { Link } from 'react-router-dom';
import { Film, BookMarked } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const watchlist = useSelector(state => state.movies.watchlist);

  return (
    <nav className="bg-gray-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-white transition-transform hover:scale-105"
          >
            <Film className="w-6 h-6 text-blue-400" />
            <span>MovieApp</span>
          </Link>
          <Link 
            to="/watchlist" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-white hover:bg-gray-800 transition-colors"
          >
            <BookMarked className="w-5 h-5 text-blue-400" />
            <span>Watchlist</span>
            <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md text-sm">
              {watchlist.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;